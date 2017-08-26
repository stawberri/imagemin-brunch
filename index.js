const fs = require('fs')
const imagemin = require('imagemin')
const loggy = require('loggy')
const plur = require('plur')
const prettyBytes = require('pretty-bytes')

const imageminPattern = /\.(gif|jpg|jpeg|jpe|jif|jfif|jfi|png|svg|svgz)$/
const imageminPlugins = {
  'imagemin-gifsicle': true,
  'imagemin-jpegtran': true,
  'imagemin-optipng': true,
  'imagemin-svgo': true
}

exports = module.exports = class {
  constructor(config) {
    this.config = config.plugins.imagemin || {}

    if(new Object(this.config.plugins) !== this.config.plugins)
      this.config.plugins = {}
    this.config.plugins = Object.assign(
      {}, imageminPlugins, this.config.plugins
    )
    this.plugins = []
    let pluginLoads = 0
    for(let plugin in this.config.plugins) {
      let options = this.config.plugins[plugin]
      if(!options) continue
      else pluginLoads++
      try {
        if(new Object(options) === options)
          this.plugins.push(require(plugin)(options))
        else
          this.plugins.push(require(plugin)())
      } catch(err) {
        loggy.warn(`Loading of ${plugin} failed due to`, err.message)
      }
    }
    if(!this.plugins.length && pluginLoads)
      throw new Error('No imagemin plugins loaded')

    if(!('pattern' in this.config)) this.config.pattern = imageminPattern
    this.config.pattern = new RegExp(this.config.pattern)
  }

  onCompile(err, assets) {
    let startTime = Date.now()
    let promises = []
    let oldBytes = 0
    let newBytes = 0

    for(let asset of assets) {
      if(!this.config.pattern.test(asset.destinationPath)) continue

      promises.push(new Promise((res, rej) => {
        let data = Buffer.from(asset.compiled)
        oldBytes += data.length

        imagemin.buffer(data, {plugins: this.plugins}).then(buffer => {
          newBytes += buffer.length

          fs.writeFile(asset.destinationPath, buffer, err => {
            if(err) rej(err)
            else res()
          })
        })
      }))
    }

    Promise.all(promises).then(() => {
      let elapsed = ((Date.now() - startTime)/1000).toFixed(1)
      let saved = prettyBytes(oldBytes - newBytes)

      loggy.info(`minified ${promises.length} ${plur('image', promises.length)} to save ${saved} in ${elapsed} sec`)
    }).catch(err => {
      loggy.error('Image minification failed due to', err.message)
    })
  }

  optimize() {}
}

exports.prototype.brunchPlugin = true
