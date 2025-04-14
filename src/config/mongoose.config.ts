import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export const mongooseConfig: MongooseModuleOptions = {
  connectionFactory: (connection: Connection) => {
    connection.on('connected', () => console.log('connected'));
    return connection;
  },
};
