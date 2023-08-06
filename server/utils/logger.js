import { createLogger, format, transports } from 'winston'
const logger = createLogger({
    transports:[
        new transports.Console(),
        new transports.File({filename:'logWarnings.log',
        level:'warn',}),
        new transports.File({filename:'logErrors.log',
        level:'error',})
    ],
    format:format.combine(
        format.colorize(),
        format.simple(),
        format.metadata(),
       format.timestamp(),
        format.prettyPrint(),
        
     
        
    ),
    statusLevels:true

    

});

export default logger;