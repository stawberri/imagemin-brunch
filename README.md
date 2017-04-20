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
Minifying images takes forever, so I marked this plugin as an optimizer. This means that it only runs when the optimize configuration setting is on (or you force it to run). If you haven't manually tweaked your plugin settings, this just means that you need to run brunch with the `--production` flag.

If this is confusing, these commands are all be valid ways to ensure your images are minified:

```
$ brunch b -p
$ brunch build -p
$ brunch b --production
$ brunch build --production
```

With the default skeleton, `npm run build` should also work.
