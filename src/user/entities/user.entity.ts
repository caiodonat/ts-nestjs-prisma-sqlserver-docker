import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserType } from '../dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

export type UserModel = User;

/**
 * @author @cdonat-ist
 */
@Injectable()
export class UserEntity {
	constructor(private prisma: PrismaService) {}

	async createUser(newUserData: CreateUserType): Promise<UserModel> {
		let newUser: UserModel;

		try {
			newUser = await this.prisma.user.create({
				data: newUserData,
			});
		} catch (error) {
			throw {
				message: error,
				status: 400,
			};
		}
		console.log(newUser);
		return newUser;
	}

	async readAllUser(): Promise<UserModel[]> {
		let users: UserModel[];
		try {
			users = await this.prisma.user.findMany();
		} catch (error) {
			throw {
				message: error,
				status: 400,
			};
		}

		return users;
	}
}
