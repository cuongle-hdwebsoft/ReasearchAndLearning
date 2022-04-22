// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  devServer: {
    host: "localhost",
    proxy: "http://localhost:8080",
  },
  publicPath: "/Vue_Learning",
};
