import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

	/**
	 * @author @cdonat-ist
	 * @todo Criar pagina com dois links: Swagger e Documentação estática
	 *  (Compodoc).
	 */
	getHello(): string {
		const message: string = "Hello World!";
		
		return `${message}`;
	}
}

// return 'Hello World!';