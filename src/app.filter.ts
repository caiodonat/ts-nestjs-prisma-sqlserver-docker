import { ZodError } from "zod";
import { AppException } from "./app.exception";

export class AppFilter {

	public helpMessage!: string[];
	public statusCode!: number; // extends StatusCode;

	constructor(error: any) {
		console.warn(error.constructor);
		
		switch (error.constructor) {
			case AppException:
				this.handleAppException(error);
				break;

			case ZodError:
				this.handleZodError(error);
				break;

			default:
				this.handleGenericException(error);
				break;
		}
	}

	public handleAppException(error: AppException) {
		this.statusCode = error.statusCode ?? 500;
		this.helpMessage = error.errors;
	}

	public handleZodError(error: ZodError) {
		this.statusCode = 400;

		// @todo Interpolação "manual".
		this.helpMessage = error.errors.map(e => e.message);
	}

	public handleGenericException(error: Error) {
		this.statusCode = 500;
		this.helpMessage = [error.message, "internal server error"];
	}
}
