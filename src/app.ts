require('dotenv').config();
import config from 'config';
import express, { Request, Response, NextFunction } from 'express';
import Routes from './routes';
import { HttpError } from 'http-errors';
import connectToDB from './utils/dbConnection';
import log from './utils/logger';

const app = express();
app.use(express.json());
app.use(Routes);
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  const { name, status, message, stack, expose } = error;

  log.error(error);

  if (!expose || status >= 500) {
    return res.status(500).json({
      error: 'Something went wrong',
    });
  }
  return res.status(status ?? 500).json({
    status,
    type: name,
    error: message,
  });
});

const port = config.get<number>('port');
const host = config.get<string>('host');

app.listen(port, () => {
  log.info(`running on ${host}:${port}`);
  connectToDB();
});
