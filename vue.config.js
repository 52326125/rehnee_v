module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    devServer: {
      port: process.env.port,
      open: true,
      proxy: {
        '/api': {
          target: 'https://rehnee-backend.azurewebsites.net',
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
