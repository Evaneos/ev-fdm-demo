# coding=UTF-8
from fabric.api import task, env, run, hide, cd, settings, local, put, lcd
import time
import string
import re

# How many versions do we keep
env.keep_versions = 5
# Forward ssh keys from deployer (no need to have a deploy key and enforce security for deploying)
env.forward_agent = 'True'

# Repository
env.repository    = 'git@github.com:Evaneos/ev-fdm-demo.git'
env.project = 'evfdmdemo'
env.slackChannel = '#logcode'
env.hosts     = 'evaneos@192.168.1.230'
env.directory = '/home/evaneos/projects/%s' % env.project
env.siteUrl = 'http://%s.dev.evaneos.com' % env.project


@task
def setup():
    run("mkdir -p %s" % env.directory)
    run("mkdir -p %s/versions" % env.directory)
    run("mkdir -p %s/data" % env.directory)
    run("mkdir -p %s/bin" % env.directory)

    run("ssh -oStrictHostKeyChecking=no github.com uptime 2>> /dev/null || echo -n 'Github Added to authorize ssh connections'")
    run("curl -sS https://getcomposer.org/installer | php -- --install-dir=%s/bin" % env.directory);
    run('git clone --mirror %s %s/data/repository' % (env.repository, env.directory))

@task
def deploy(branch='master', dorelease=True, nocheck=True):
    with cd('%s/data/repository' % env.directory):
        run('git remote update')

        hash = run('git rev-parse %s | head -c 8' % (branch))
        version = '%s-%s-%s' % (time.strftime("%Y%m%d%H%M%S"), hash, branch )
        run('mkdir -p %s/versions/%s' % (env.directory, version))

    try:
        dodeploy(version, branch, nocheck)
    except:
        run('rm -rf %s/versions/%s' % (env.directory, version))
        raise
    finally:
        if (dorelease):
            release()
            clean_versions()

def dodeploy(version, branch, nocheck=False):
    installCodeFromRepository(version, branch, nocheck)
    installDependencies('%s/versions/%s' % (env.directory, version), version)

@task
def rollback():
    lastVersion = getLastVersion()
    rollbackVersion = getRollbackVersion()

    run('rm -rf %s/versions/%s' % (env.directory, lastVersion))
    release()

def clean_versions():
    with hide('running', 'stdout'):
        versions     = run('ls -t %s/versions' % env.directory)
        listVersions = versions.split()

    i = 0
    for version in listVersions:
        i = i + 1

        if i > env.keep_versions:
            run('rm -rf %s/versions/%s' % (env.directory, version))

def installCodeFromRepository(version, branch, nocheck=False):
    with cd('%s/data/repository' % env.directory):

        if not nocheck:
            check(branch)

        run('git archive %s | tar -x -C %s/versions/%s' % (branch, env.directory, version))

def installDependencies(directory, version):
    with cd('%s/versions/%s' % (env.directory, version)):
        run('npm install')
        run('bower install')
        run('grunt')

def check(branch):
    with settings(warn_only=False):
        with hide('running', 'stdout'):
            remote_rev = run('git log -n 1 "%s" --pretty=format:"%%H"' % branch, pty=False)
            local_rev  = local('git log -n 1 --pretty=format:"%H"', capture=True)

            remote_rev = re.sub('\s+', '', remote_rev)
            local_rev  = re.sub('\s+', '', local_rev)

            if remote_rev != local_rev:
                raise Exception('Le commit local %s n\'est pas le même que le commit distant %s, deploiement interdit' % (local_rev, remote_rev))

            try:
                if local('git diff --cached --exit-code').return_code != 0 or local('git diff --exit-code').return_code != 0:
                    raise Exception("Des modifications sont en cours sur le repository, faites un stash ou un commit avant de pouvoir deployer")
            except:
                raise Exception("Des modifications sont en cours sur le repository, faites un stash ou un commit avant de pouvoir deployer")
    return True

def getLastVersion():
    with hide('running', 'stdout'):
        versions     = run('ls -t %s/versions' % env.directory)
        listVersions = versions.split()
        return listVersions[0]

def getRollbackVersion():
    with hide('running', 'stdout'):
        versions     = run('ls -t %s/versions' % env.directory)
        listVersions = versions.split()
        return listVersions[1]

def release():
    lastVersion = getLastVersion()

    with settings(warn_only=True):
        run('rm %s/production' % env.directory)

    run('ln -s %s/versions/%s %s/production' % (env.directory, lastVersion, env.directory))
    if env.slackChannel:
        projectName = env.project.title()
        run('curl -X POST --data-urlencode \'payload={"channel": "%s", "username": "%s bot", "text": "%s: New version deployed: %s", "icon_emoji": ":computer:"}\' https://evaneos.slack.com/services/hooks/incoming-webhook?token=4G16wMjFee3ghYq359bG4Lkm' % (env.slackChannel, projectName, env.siteUrl, lastVersion))
