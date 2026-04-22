import * as winston from 'winston';
import { WinstonModuleOptions } from 'nest-winston';

export const loggerConfig: WinstonModuleOptions = {
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, context, trace, ...meta }) => {
      const contextStr = context ? `[${context}] ` : '';
      const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
      const traceStr = trace ? `\nStack: ${trace}` : '';
      
      return `${timestamp} [${level.toUpperCase()}] ${contextStr}${message}${metaStr}${traceStr}`;
    }),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, context, trace, ...meta }) => {
          const contextStr = context ? `[${context}] ` : '';
          const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
          const traceStr = trace ? `\nStack: ${trace}` : '';
          
          return `${timestamp} ${level} ${contextStr}${message}${metaStr}${traceStr}`;
        }),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' }),
    new winston.transports.Console(),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' }),
    new winston.transports.Console(),
  ],
};