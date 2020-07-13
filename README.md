# alt:V Website

## Project setup

```sh
npm install -g @vue/cli
npm install

```

### Compiles and hot-reloads for development

```sh
npm run serve
```

### Compiles and minifies for production

```sh
npm run build
```

### Deploying for Github

If any changes are made. You can redeploy by running the following locally.
That or run the `deploy.sh` if you're on a Linux based machine.

```sh
npm run build

# Copy CNAME to dist directory.

cd dist

git init

git add -A

git commit -m 'deploy'

git push -f git@github.com:altmp/altv-hub-client.git master:gh-pages
```

Don't forget to go into settings and set the domain to https://hub.altv.mp/

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
