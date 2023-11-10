import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	Res
} from '@nestjs/common';
import {
	ApiTags,
	ApiBody,
	ApiCreatedResponse,
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiNoContentResponse
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto, UpdateUserType } from './dto/update-user.dto';
import { UserDto } from './user.entity';
import { CreateUserDto, CreateUserType } from './dto/create-user.dto';
import { Response } from 'express';
import { AppFilter } from '../app.filter';
import { LoginUserDto, LoginUserType } from './dto/login-user.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
	constructor(
		private readonly _service: UserService
	) { }

	@Post()
	@ApiBody({ type: CreateUserDto })
	@ApiCreatedResponse({ type: UserDto })
	@ApiBadRequestResponse({ type: CreateUserDto })
	async post(
		@Body() createUserDto: CreateUserType,
		@Res() res: Response
	) {
		try {
			const newUser = await this._service.create(createUserDto);

			res.status(201)
				.send(newUser);

		} catch (error) {
			const errorFilter = new AppFilter(error);
			res.status(errorFilter.statusCode)
				.send(errorFilter.helpMessage);
		}
	}

	@Get('/all')
	@ApiOkResponse({ type: [UserDto] })
	async getAll(
		@Res() res: Response
	) {
		try {
			const allUsers = await this._service.findAll();

			return res.status(200)
				.send(allUsers);
		} catch (error) {
			const errorFilter = new AppFilter(error);
			res.status(errorFilter.statusCode)
				.send(errorFilter.helpMessage);
		}
	}

	@Post('/login')
	@ApiBody({ type: LoginUserDto })
	async login(
		@Body() userCredentials: LoginUserType,
		@Res() res: Response
	) {
		try {
			const jwt = await this._service.login(
				userCredentials.email, userCredentials.password
			);

			return res.status(200)
				.send(jwt);
		} catch (error) {
			const errorFilter = new AppFilter(error);
			res.status(errorFilter.statusCode)
				.send(errorFilter.helpMessage);
		}
	}

	@Get(':id')
	@ApiOkResponse({ type: UserDto })
	// @ApiBadRequestResponse({ type:  })
	async getById(
		@Param('id') userId: number,
		@Res() res: Response
	) {
		try {
			const newUser = await this._service.findOne(userId);

			res.status(200)
				.send(newUser);
		} catch (error) {
			const errorFilter = new AppFilter(error);
			res.status(errorFilter.statusCode)
				.send(errorFilter.helpMessage);
		}

	}

	@Put(':id')
	@ApiBody({ type: UpdateUserDto })
	@ApiOkResponse({ type: UserDto })
	// @ApiBadRequestResponse({ type:  })
	async put(
		@Param('id') userId: number,
		@Body() newUserData: UpdateUserType,
		@Res() res: Response
	) {
		try {
			const updatedUser = await this._service.update(userId, newUserData);

			res.status(200)
				.send(updatedUser);
		} catch (error) {
			const errorFilter = new AppFilter(error);
			res.status(errorFilter.statusCode)
				.send(errorFilter.helpMessage);
		}
	}

	@Delete(':id')
	@ApiNoContentResponse({ description: "Successfully deleted" })
	async deleteById(
		@Param('id') userId: number,
		@Res() res: Response
	) {
		try {
			await this._service.deleteById(userId);

			return res.status(204);
		} catch (error) {
			const errorFilter = new AppFilter(error);
			return res.status(errorFilter.statusCode)
				.send(errorFilter.helpMessage);
		}
	}
}
