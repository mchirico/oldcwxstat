const path = require("path");
const http = require("http");
const express = require("express");

const csrf = require("csurf");
var cookieParser = require("cookie-parser");
var csrfProtection = csrf({ cookie: true });
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const angularDirectoryPath = path.join(__dirname, "../dist");
const jsDirectoryPath = path.join(__dirname, "../public/js");
const chatIndex = path.join(__dirname, "../public/chat/chat.html");

app.use(cookieParser());
app.use(csrfProtection);

app.all("*", function(req, res, next) {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  //res.header("X-CSRF-Token", req.csrfToken()); // set csrf to header
  return next();
});

// FIX-ME: ... remove after testing
app.use(function(err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  // handle CSRF token errors here
  res.status(200);
  res.send("csrf error");
  console.log("CSRF ERROR ");
  console.log(JSON.stringify(req.headers));
});

app.use("/", express.static(angularDirectoryPath));

app.post("/api/login", csrfProtection, function(req, res) {
  // For this example: login is always successful if the request passes the "csrfProtection" middleware
  // Set Access Token. Atuhentication, on this application, works with cookies:
  //  ** MAKE CALLS TO FIREBASE HERE ***
  console.log("called login...");
  res.cookie("AccessToken", "***Auth token value***", {
    httpOnly: true,
    expires: 0
  });
  res.json({ login: "csrf for login worked... You're Good!" });
});
app.get("/api/stats", function(req, res) {
  // Check for auth cookie
  console.log(JSON.stringify(req.headers));
  var token = req.cookies["AccessToken"];

  if (token === "***Auth token value***") {
    console.log("/api/stats  GOOD!!!");
    res.set("Content-Type", "application/json");
    res.json({});
  } else {
    console.log("/api/stats");
    res.status(200).send();
  }
});

app.post("/api/transfer_money", csrfProtection, function(req, res) {
  // Check for auth cookie
  var token = req.cookies["AccessToken"];
  if (token === "***Auth token value***") {
    res.set("Content-Type", "application/json");
    console.log("worked.. money transferred.");
    res.json({ money: "Money sent!!  Read access token" });
  } else {
    res.status(401).send();
  }
});

app.use("/js", express.static(jsDirectoryPath));

app.get("/chat", function(req, res) {
  res.sendFile(chatIndex);
});


let count = 0;
io.on("connection", socket => {
  console.log(`New WebSocket`);
  socket.emit("countUpdated", count);

  socket.on("increment", () => {
    count++;
    socket.emit("countUpdated", count);
  });
});

// mongoose
//     .connect(swapUri(uri, "test", "node_notes"), {
//         useUnifiedTopology: true,
//         useNewUrlParser: true
//     })
//     .then(result => {
//         server.listen(port, () => {
//             console.log(`🚀 Server is up: port ${port}`);
//             console.log(`Try: http://localhost:${port}/example/a`);
//         });
//     })
//     .catch(err => {
//         console.log(err);
//     });

module.exports = {
  app: app,
  server: server,
  port: port
}; // for testing
