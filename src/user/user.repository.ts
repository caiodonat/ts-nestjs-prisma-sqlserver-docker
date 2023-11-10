import { Injectable } from "@nestjs/common";
import { CreateUserType } from "./dto/create-user.dto";
import { DatabaseService } from "../database/database.service";
import { UserType, UserDb } from "./user.entity";
import { UpdateUserType } from "./dto/update-user.dto";

@Injectable()
export class UserRepository {

	constructor(
		private readonly _prisma: DatabaseService
	) { }

	async create(
		newUser: CreateUserType
	): Promise<UserDb> {
		return await this._prisma.user.create({
			data: newUser
		})
	}

	async selectAll(
	): Promise<UserDb[]> {
		return await this._prisma.user.findMany();
	}

	async selectById(
		userId: UserType['id']
	): Promise<UserDb> {
		return await this._prisma.user.findUniqueOrThrow({
			where: {
				id: userId
			}
		});
	}

	async selectByEmail(
		email: UserType['email']
	): Promise<UserDb> {
		return await this._prisma.user.findUniqueOrThrow({
			where: {
				email: email
			}
		});
	}

	async updateById(
		userId: UserType['id'],
		newUserData: UpdateUserType
	) {
		await this._prisma.user.update({
			where: {
				id: userId
			},
			data: newUserData
		});
	}

	async deleteById(
		userId: UserType['id']
	) {
		await this._prisma.user.delete({
			where: {
				id: userId
			}
		});
	}

}