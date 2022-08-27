import logger from 'pino';

const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorized: true,
    },
  },
  level: 'info',
  base: {
    pid: false,
  },
});

export default log;
