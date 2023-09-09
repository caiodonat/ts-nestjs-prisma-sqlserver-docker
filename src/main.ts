import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	console.time('Restart');

	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn', 'fatal'],
	});

	const config = new DocumentBuilder()
		.setTitle('Vestimenta Multissensorial (backend)')
		.setDescription('The API description')
		.setVersion('0.0.1')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document, {
		/**
		 * @author @cdonat-ist
		 * Swagger UI dark mode for development environment.
		 * @see {@link https://stackoverflow.com/a/75492773/16245809}
		 */
		customJs: [
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
		],
		customCssUrl: [
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
		],
	});

	await app.listen(3000, () => console.timeEnd('Restart'));
}
bootstrap();
