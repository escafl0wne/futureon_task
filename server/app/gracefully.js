import process from 'process';
import config from '../config/config.js';
const gracefulShutdown =(server)=> function gracefulShutdownHandler(signal) {
    console.log(`⚠️ Caught ${signal}, gracefully shutting down`);
    config.ONLINE = false;
  
    setTimeout(() => {
      console.log('🤞 Shutting down application');
      // stop the server from accepting new connections
      server.close(function () {
        console.log('👋 All requests stopped, shutting down');
        // once the server is not accepting connections, exit
        process.exit();
      });
    }, 0);
  };

  export default gracefulShutdown;