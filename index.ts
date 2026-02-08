import Server from "./server/config.ts";
import router from "./src/routes/index.routes.ts";

const server = new Server();

// agregar las rutas
server.app.use("/api", router);

server.listen();
