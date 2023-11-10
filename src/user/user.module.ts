import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
	imports: [DatabaseModule, JwtModule.register({
		secret: process.env.JWT_SECRET,
		signOptions: { expiresIn: '1d' }
	})],
	controllers: [UserController],
	providers: [UserService, UserRepository, DatabaseService],
})
export class UserModule { }
