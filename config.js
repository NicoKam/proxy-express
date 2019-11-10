module.exports = {
  /* 根目录 */
  serverRoot: "root",
  /* 端口 */
  port: 8193,
  proxy: {
    "/api": {
      /* 重定向地址 */
      target: "http://nicokam.work:3000",
      // changeOrigin: true,
    },
  },
  /* 子目录项目 */
  // app: [],
};
