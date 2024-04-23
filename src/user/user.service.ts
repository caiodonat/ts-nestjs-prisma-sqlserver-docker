import { Injectable } from '@nestjs/common';
import * as Bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserSchema, CreateUserType } from './dto/create-user.dto';
import { UpdateUserSchema, UpdateUserType } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserSchema, UserDb, UserType } from './user.entity';
import { AppException } from '../app.exception';

@Injectable()
export class UserService {

	private readonly _validator = UserSchema;

	constructor(
		private readonly _repository: UserRepository,
		private readonly _jwtService: JwtService,
	) {
	}

	async create(newUser: CreateUserType): Promise<UserDb> {
		try {
			const createValidator = CreateUserSchema;

			const userDTO = await createValidator.parseAsync(newUser);

			userDTO.password = await Bcrypt.hash(userDTO.password, 10);

			return await this._repository.create(newUser)
		} catch (error) {
			throw error;
		}
	}

	async findAll(): Promise<UserDb[]> {
		try {
			return await this._repository.selectAll();
		} catch (error) {
			throw error;
		}
	}

	async findOne(userId: UserType['id']): Promise<UserDb> {
		try {
			// Validando apenas uma propriedade + convertendo em número
			const userIdDTO = await this._validator.shape
				.id.parseAsync(userId);

			return await this._repository.selectById(userIdDTO?.valueOf());
		} catch (error) {
			throw error;
		}
	}

	async login(email: UserType['email'], password: UserType['password'])/* : Promise<UserDb> */ {
		try {
			const validatedEmail = await this._validator.shape
				.email.parseAsync(email);

			const targetUser = await this._repository.selectByEmail(validatedEmail);

			if (!Bcrypt.compareSync(password, targetUser.password)) {
				throw new AppException(401, ["Senha invalida"]);
			}
			
			// @todo Migrar para função separada
			return await this._jwtService.signAsync({ userId: targetUser.id });
		} catch (error) {
			throw error;
		}
	}

	async update(
		userId: UserType['id'],
		newUserData: UpdateUserType
	) {
		const userIdDTO = await this._validator.shape
			.id.parseAsync(userId);

		const updateDTO = await UpdateUserSchema.parseAsync(newUserData);

		// updateDTO.password = await Bcrypt.hash(updateDTO.password, 10);

		await this._repository.updateById(userIdDTO?.valueOf(), updateDTO);
	}

	async deleteById(
		userId: UserType['id']
	) {
		const userIdDTO = await this._validator.shape
			.id.parseAsync(userId);

		await this._repository.deleteById(userIdDTO?.valueOf());
	}
}
