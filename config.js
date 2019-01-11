module.exports = {
  /* 根目录 */
  serverRoot: "root",
  /* 端口 */
  port: 8000,
  proxy: {
    "/apiAlarm": {
      /* 重定向地址 */
      target: "http://localhost:8081",
      // changeOrigin: true,
    },
  },
  /* 子目录项目 */
  // app: [],
};
