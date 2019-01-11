const express = require("express");
const path = require("path");
const fs = require("fs");
const config = require("./config");
const proxyMiddleWare = require("http-proxy-middleware");
const app = express();
// const proxyOption = {
//   target: config.target,
//   changeOrigin: true,
//   ws: true,
//   // pathRewrite: { "^/api": "/" },
// };
const root = path.resolve(__dirname, config.serverRoot);
// app.use("/apiAlarm", proxyMiddleWare(proxyOption));
const { proxy = {} } = config;
Object.keys(proxy).forEach((p) => {
  app.use(p, proxyMiddleWare(proxy[p]));
});
app.use(express.static(root));

const addRedirectFile = (p = "") => {
  console.log(`listenning ${"/" +p + "*"}`)
  app.get("/" +p + "*", function (req, res) {
    const file = path.resolve(root,req.path.substr(1));
    if(fs.exists(file))
      res.sendFile(file);
    else
      res.sendFile(path.resolve(root, p, "index.html"));
  });
};

const { app: appList } = config;
if (appList && appList.length > 0) {
  appList.forEach(p => addRedirectFile( p + "/"));
} else {
  addRedirectFile();
}

app.listen(config.port);
console.log("server started at http://127.0.0.1:" + config.port + "/");
