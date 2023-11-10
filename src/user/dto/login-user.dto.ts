import { z } from "zod";
import { createZodDto } from "@anatine/zod-nestjs";
import { UserSchema } from "../user.entity";

export const LoginUserSchema = UserSchema.omit({
    id: true,
    roleId: true,
    firstName: true,
    lastName: true,
    phone: true,
    recoverCode: true,
    verifiedAt: true,
    createAt: true,
    updateAt: true,
});

export type LoginUserType = z.infer<typeof LoginUserSchema>;

export class LoginUserDto extends createZodDto(LoginUserSchema) { }

