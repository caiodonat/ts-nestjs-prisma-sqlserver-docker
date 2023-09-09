import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreateUserSwagger {
	@ApiProperty({
		required: true,
		title: 'Matricula do usuário',
		type: String,
		default: 'nobody@mail.io',
	})
	registration: string = '';

	@ApiProperty({
		required: false,
		title: 'Nome',
		type: String,
		default: 'Odin',
	})
	name: string = '';
}

// const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
// 	return { message: issue.message || '' };
// };
// z.setErrorMap(customErrorMap);

/**
 * @author @cdonat-ist
 * Zod schema to validade request data.
 */
export const CreateUserSchema = z
	.object({
		name: z.string(),
		registration: z.string(),
	})
	.required();

export type CreateUserType = z.infer<typeof CreateUserSchema>;
