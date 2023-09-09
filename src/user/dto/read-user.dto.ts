import { ApiProperty, PartialType } from '@nestjs/swagger';
import { z } from 'zod';
import { CreateUserSchema, CreateUserSwagger } from './create-user.dto';

export class ReadUserSwagger extends PartialType(CreateUserSwagger) {
	@ApiProperty({
		// name: "Id",
		title: 'ID',
		description: 'Auto increment',
		type: Number,
		default: 1,
	})
	id: number = 0;
}

export const ReadUserSchema = z
	.object({
		id: z.number().optional(),
	})
	.merge(CreateUserSchema);

export type ReadUserType = z.infer<typeof ReadUserSchema>;
