module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    devServer: {
      port: process.env.port,
      open: true,
      proxy: {
        '/api': {
          target: 'localhost:3000',
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
