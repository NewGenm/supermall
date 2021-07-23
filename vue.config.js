const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
        .set("@", resolve("src"))
        .set("assets", resolve("src/assets"))
        .set("components", resolve("src/components"))
        .set("views", resolve("src/views"))
        .set("network", resolve("src/network"))
        .set("common", resolve("src/common"))
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 'C:\\Users\\Administrator\\Desktop\\source\\Vue\\Vuejs\\supermall\\src\\assets\\css\\css.less'
        path.resolve(__dirname, './src/assets/css/css.less')
      ],
    },
  },
}
