module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    devServer: {
      port: '8081',
      open: true,
      proxy: {
        '/api': {
          target: 'http://49.158.32.227:3000',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': '/api'
          },
          'secure': false
        }
      }
    }
  }
}
