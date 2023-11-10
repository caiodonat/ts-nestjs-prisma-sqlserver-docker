import { z } from "zod";
import { ApiExtraModels } from "@nestjs/swagger";
import { createZodDto } from "@anatine/zod-nestjs";
import { User } from '@prisma/client';

export const UserSchema = z.object({

	id: z
		.coerce.number({
			// coerce: true,
			// invalid_type_error: "{#describe} deve ser um número"
		})
		.positive("{#describe} deve ser maior que 0")
		// .optional()
		.describe("Id"),

	roleId: z.number(),

	firstName: z
		.string({
			required_error: "Primeiro nome é obrigatório"
		})
		.min(4)
		.describe("Primeiro nome"),

	lastName: z.string(),

	email: z.string(),

	password: z.string(),

	phone: z.string(),

	recoverCode: z.string().optional(),

	verifiedAt: z.string().datetime().optional(),

	createAt: z.string().datetime().optional(),

	updateAt: z.string().datetime().optional(),

});

export type UserType = z.infer<typeof UserSchema>;

@ApiExtraModels()
export class UserDto extends createZodDto(UserSchema) { }

export type UserDb = User;
