import app from "./app/app.js";
import config from "./config/config.js";
import process from "process";
import gracefulShutdown from "./app/gracefully.js"

  console.log("You are in the developing environment");
  const serverApp = app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);

   
  });
  
  
   // The SIGINT signal is sent to a process by its controlling terminal when a user wishes to interrupt the process.
   process.on("SIGINT", gracefulShutdown(serverApp));

   // The SIGTERM signal is sent to a process to request its termination.
   process.on("SIGTERM", gracefulShutdown(serverApp));

