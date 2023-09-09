import { PartialType } from '@nestjs/swagger';
import { CreateUserSwagger } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserSwagger) {}
