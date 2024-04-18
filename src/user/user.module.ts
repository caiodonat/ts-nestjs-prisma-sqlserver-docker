import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

import { DatabaseModule } from '../database/database.module';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
	imports: [DatabaseModule, JwtModule.register({
		secret: process.env.JWT_SECRET,
		signOptions: { expiresIn: '1d' }
	})],
	controllers: [UserController],
	providers: [UserService, UserRepository, JwtService],
	exports: [UserService, UserRepository, JwtService]
})
export class UserModule { }
