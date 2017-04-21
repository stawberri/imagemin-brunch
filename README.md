# imagemin-brunch
simple image minification for brunch

[![NPM](https://nodei.co/npm/imagemin-brunch.png?mini=true)](https://nodei.co/npm/imagemin-brunch/)

This is a super simple plug-and-play plugin that minifies your images with [imagemin](https://www.npmjs.com/package/imagemin).

```
$ npm install --save-dev imagemin-brunch
$ brunch build --production
18:06:47 - info: compiled 6 files into 2 files, copied 14 in 2.3 sec
18:06:53 - info: minified 9 images to save 334 kB in 5.3 sec
```

There are currently no options you can specify, but I may add some optional ones in the future to give you finer control over how minification happens.

## Make sure you're in production mode
Minifying images takes forever, so I marked this plugin as an optimizer. Your configuration settings decide if it runs or not. If you haven't manually tweaked `optimize` or `plugins.on`, you can ensure that this plugin runs by using the `--production` flag.

If this is confusing, these commands should minify your images on brunch's default settings:

```
$ brunch b -p
$ brunch build -p
$ brunch b --production
$ brunch build --production
```

If you are using the default skeleton, `npm run build` should also work.
