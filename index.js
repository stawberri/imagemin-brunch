const fs = require('fs')
const imagemin = require('imagemin')
const loggy = require('loggy')
const plur = require('plur')
const prettyBytes = require('pretty-bytes')

const imageminPattern = /\.(gif|jpg|jpeg|jpe|jif|jfif|jfi|png|svg|svgz)$/
const imageminPlugins = [
  'gifsicle',
  'jpegtran',
  'optipng',
  'svgo'
]
const plugins = []
for(let plugin of imageminPlugins) {
  try {
    plugins.push(require('imagemin-' + plugin)())
  } catch(err) {
    loggy.warn(`Loading of ${plugin} failed due to`, err.message)
  }
}
if(!plugins.length) throw new Error('Loading of all imagemin plugins failed')

exports = module.exports = class {
  constructor(config) {
    this.config = config.plugins.imagemin || {}
  }

  onCompile(err, assets) {
    let startTime = Date.now()
    let promises = []
    let oldBytes = 0
    let newBytes = 0

    for(let asset of assets) {
      if(!imageminPattern.test(asset.destinationPath)) continue;

      promises.push(new Promise((res, rej) => {
        let data = Buffer.from(asset.compiled)
        oldBytes += data.length

        imagemin.buffer(data, {plugins}).then(buffer => {
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
