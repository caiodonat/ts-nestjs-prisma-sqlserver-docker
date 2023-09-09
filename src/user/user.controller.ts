import {
	Controller,
	Get,
	Post,
	Body,
	// Patch,
	Param,
	Delete,
	// Put,
	Res,
	HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserType, CreateUserSwagger } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { ReadUserSwagger } from './dto/read-user.dto';
import { UserModel } from './entities/user.entity';

@ApiTags('User')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiResponse({
		status: 200,
		description: 'The found record',
		type: CreateUserSwagger,
	})
	@ApiBody({
		type: CreateUserSwagger,
	})
	async create(@Res() res: Response, @Body() createUserDto: CreateUserType) {
		let newUser: UserModel;

		try {
			newUser = await this.userService.create(createUserDto);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST).json(error);
			return;
		}
		console.log(newUser);
		res.status(HttpStatus.CREATED).json(newUser).end();
		// return newUser;
	}

	@Get()
	@ApiResponse({
		status: 200,
		description: 'The found record',
		type: [ReadUserSwagger],
	})
	async findAll(): Promise<UserModel[]> {
		return await this.userService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(+id);
	}

	// @Put(':id')
	// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
	// 	return this.userService.update(+id, updateUserDto);
	// }

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
