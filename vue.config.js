const { resolve } = require('path')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const optipng = require('imagemin-optipng')
const pngquant = require('imagemin-pngquant')
const mozjpeg = require('imagemin-mozjpeg')
const gifsicle = require('imagemin-gifsicle')
const sass = require('sass')
const sizeOf = require('image-size')

module.exports = {
  pluginOptions: {
    svgSprite: {
      dir: 'src/assets/sprite',
      test: /\.(svg)(\?.*)?$/,
      loaderOptions: {
        extract: true,
        spriteFilename: 'sprite.svg'
      },
      pluginOptions: {
        plainSprite: true
      }
    },
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        resolve(__dirname, 'src/assets/css/_setting.scss'),
        resolve(__dirname, 'src/assets/css/_function.scss'),
        resolve(__dirname, 'src/assets/css/_easing.scss'),
        resolve(__dirname, 'src/assets/css/mixins/_layout.scss'),
        resolve(__dirname, 'src/assets/css/mixins/_media-screen.scss'),
        resolve(__dirname, 'src/assets/css/mixins/_object.scss'),
        resolve(__dirname, 'src/assets/css/mixins/_size.scss')
      ]
    }
  },
  configureWebpack: {
    plugins: [
      new ImageminPlugin({
        disable: process.env.NODE_ENV !== 'production',
        test: /\.(png|jpe?g|gif|svg)$/i,
        plugins: [
          optipng({
            optimizationLevel: 7 // 0 ~ 7
          }),
          pngquant({
            quality: [0.5, 0.6], // 0 ~ 1
            speed: 1 // 1 ~ 11
          }),
          gifsicle({
            optimizationLevel: 3, // 1 ~ 3
            colors: 128
          }),
          mozjpeg({
            quality: 70 // 0 ~ 100
          })
        ]
      })
    ]
  },
  chainWebpack: config => {
    config.module
      .rule('svg-sprite')
      .use('svgo-loader')
      .loader('svgo-loader')
  },
  css: {
    loaderOptions: {
      sass: {
        functions: {
          'image-data($path)': (imgPath) => {
            const path = imgPath.getValue()
            const { width, height } = sizeOf(path)
            const data = new sass.types.Map(3)
            data.setKey(0, new sass.types.String('name'))
            data.setValue(0, new sass.types.String(path))
            data.setKey(1, new sass.types.String('width'))
            data.setValue(1, new sass.types.Number(width))
            data.setKey(2, new sass.types.String('height'))
            data.setValue(2, new sass.types.Number(height))
            return data
          }
        }
      }
    }
  }
}
