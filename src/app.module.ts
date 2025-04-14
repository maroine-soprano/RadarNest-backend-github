import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { mongooseConfig, graphqlConfig } from './config';
import { AccountsModule } from './modules/accounts/accounts.module';
import { jwtConfig } from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI!, mongooseConfig),
    GraphQLModule.forRoot(graphqlConfig),
    UsersModule,
    AccountsModule,
    jwtConfig,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
