const { server, port } = require("./src/main");

server.listen(port, () => {
  console.log(`🚀 Server is up: port ${port}`);
  console.log(`Try: http://localhost:${port}/example/a`);
});
