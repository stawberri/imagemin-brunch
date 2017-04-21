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


## Supported formats
This plugin detects images via file extensions, and supports the following:

`.gif` `.jpg` `.jpeg` `.jpe` `.jif` `.jfif` `.jfi` `.png` `.svg` `.svgz`

The actual minification process is performed by the following [imagemin plugins](https://www.npmjs.com/browse/keyword/imageminplugin):

* [imagemin-gifsicle](https://www.npmjs.com/package/imagemin-gifsicle)
* [imagemin-jpegtran](https://www.npmjs.com/package/imagemin-jpegtran)
* [imagemin-optipng](https://www.npmjs.com/package/imagemin-optipng)
* [imagemin-svgo](https://www.npmjs.com/package/imagemin-svgo)

The plugins have their own configuration options, but imagemin-brunch currently just uses their defaults. I may expose their configuration objects and come up with a way for you to install and use your own plugins in the future.


## Make sure you're in production mode
Minifying images takes forever, so I made this plugin an optimizer. By default, this plugin will run whenever brunch is in production mode. Any of these commands should work to minify your images:

```
$ brunch b -p
$ brunch build -p
$ brunch b --production
$ brunch build --production
```

If you are using the default skeleton, `npm run build` should also work.
