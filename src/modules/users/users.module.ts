import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../schemas';
import { UsersResolver } from './resolvers/users.resolver';
import { UsersController } from './users.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
