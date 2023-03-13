const express = require("express");
const helmet = require("helmet");
const path = require("path");
const http = require("http");

function bootstrapExpress() {
  const hostname = "127.0.0.1";
  const port = 3000;
  let counter = 0;
  const app = express();

  app.all("/*", (req, resp, next) => {
    console.log(req.url);
    next();
  });
  app.use(helmet(), (req, resp, next) => {
    //console.log("helmet");
    next();
  });
  app.get("/healthcheck", (req, res) => {
    res.sendStatus(200);
  });
  app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
  app.use("/public", express.static("public"));
  //either use this or in link tag in in index.html, don't need both
  app.use("/favicon.ico", express.static("public/assets/peps.ico"));

  const options = {
    root: path.join(__dirname, ""),
    headers: {
      "x-timestamp": Date.now(),
      "Content-Type": "text/html",
    },
  };

  app.get("/flex-practice", (req, res) => {
    res.sendFile("public/practice/flex-practice.html", options);
  });
  app.get("/*", function (req, res, next) {
    counter++;
    //res.send("Hello World" + counter);
    // res.render("index", { counter: counter }, (err, html) => {
    //   console.log("rendered stuff");
    // });

    //public/practice/block-inline.html
    if (!!req.query.page) {
      res.sendFile("public/practice/" + req.query.page + ".html", options);
    } else {
      res.sendFile("index.html", options, (err) => {
        if (err) {
          next(err);
        } else {
          console.log("Sent index.html " + counter);
        }
      });
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

  console.log(global);
}

bootstrapExpress();

//create another server on 8080
// function bootstrapHttp() {
//   let counter = 0;
//   const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     counter++;
//     console.log("Servicing request ", counter);
//
//     res.end("Hello World");
//   });
//   server.listen(8080);
//   console.log("http server running on 8080");
// }

// bootstrapHttp();
