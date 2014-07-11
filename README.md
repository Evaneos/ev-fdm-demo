EV-FDM DEMO
===========

## Getting started

- Install Jekyll gem:

```
$ gem install jekyll
```

- Retrieve dependencies:

```
$ npm install
$ bower install
```

- Start grunt with default task and in watch mode:

```
$ grunt default watch
```

- Start jekyll

```
jekyll serve --watch
```

## Folder structure

Each demo has its own separated application. All the application folder can be found in `docs/_demos`.

## Usefull links

- [EVFDM demo website](http://evfdmdemo.dev.evaneos.com)
- [EVFDM source code](https://github.com/evaneos/ev-fdm)
- [Jekyll documentation](http://jekyllrb.com/)

## Deploy

Use fabric with the following command:

```
fab deploy:branch=master
```
