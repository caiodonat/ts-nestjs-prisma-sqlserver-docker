import { Injectable } from '@nestjs/common';

import { CreateUserSchema, CreateUserType } from './dto/create-user.dto';
// import { ReadUserType } from './dto/read-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity, UserModel } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(private entity: UserEntity) {}

	async create(newUserData: CreateUserType): Promise<UserModel> {
		// let newUser: UserModel;
		const userContract = CreateUserSchema.safeParse(newUserData);

		if (!userContract.success) {
			throw {
				message: userContract.error.errors /* .map((e) => e.message) */,
				status: 400,
			};
		}
		console.log(userContract.data);
		return await this.entity.createUser(userContract.data);
	}

	async findAll(): Promise<UserModel[]> {
		return await this.entity.readAllUser();
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	update(id: number) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
