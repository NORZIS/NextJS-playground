# Playground

This is my playground for NextJs

Here I learned how to use Next and docker, learned how to work with 


## Requirements

Install `nodejs` and `docker` or `docker-desktop` on your system

**Please check required version of `nodejs` in `/.node-version`.**

For node-version-management on your local machine recommended to use [n](https://github.com/tj/n)

## Run and debug

```bash
# run mongo and mongo-express in docker
docker compose up
# install dependencies
yarn install
# run application
yarn dev
```

To visit `mongo-express` open http://localhost:8081

## VS Code

- please install recommended extensions.

- There is configured tasks for `docker` to run and clean containers.

- Debugger configurations also shared in repo. Be careful when updating it.

## WebStorm

> If you want to use WebStorm please share debugger config in repo.
>
> Also please share links to recommended extensions.
