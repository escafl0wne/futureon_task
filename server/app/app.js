import express from "express";
import cors from "cors";
import field_controller from "../modules/field_controller.js";
import config from "../config/config.js";
import morgan from "morgan";
import { notFoundError, serverError } from "../utils/errorsHandler.js";
import process from "process";


//check the environment
if (config.NODE_ENV !== "development") {
    console.error("This is not a development environment");
    process.exit();
}
  const app = express();

  //middlewares
  app.use(morgan("dev")); // add some measuring metada to the log

  //json parsing
  app.use(express.json());

  //cors middleware
  app.use(cors({ origin: "http://localhost:3000" }));

  // adding controllers to the server
  app.use("/api/v1/field", field_controller);

  //handle common errors
  app.use(notFoundError);
  app.use(serverError);

 
  app.get('/health-check', (req, res) => {
    config.ONLINE ? res.send('OK') : res.status(503).send('Server shutting down');
  });
  
  

export default app;
