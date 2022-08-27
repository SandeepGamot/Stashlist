import config from 'config';
import mongoose from 'mongoose';
import log from './logger';

export default async function connectToDB() {
  try {
    const dbUri = config.get<string>('dbUri');
    log.info(`connecting to db...`);
    const dbConnection = await mongoose.connect(dbUri);
    dbConnection.connection.on('SIGINT', () => {
      log.info('closing db conn');
      dbConnection.connection.close();
    });
    log.info(`db conn success`);
  } catch (error) {
    log.info(`db conn failed`);
    process.exit(1);
  }
}
