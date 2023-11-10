import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
// import { AppModule } from './../src/app.module';
import { UserDb } from 'src/user/user.entity';
import { UserModule } from '../src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';

describe('AppController (e2e)', () => {
	const rndInt = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
	let app: INestApplication;

	//

	beforeAll(async () => {
	  const moduleRef = await Test.createTestingModule({
		imports: [UserModule],
		providers: [UserService, UserRepository]
	  })
		.compile();
  
	  app = moduleRef.createNestApplication();
	  await app.init();
	});
	//
	// beforeEach(async () => {
	// 	const moduleFixture: TestingModule = await Test.createTestingModule({
	// 		imports: [AppModule],
	// 	}).compile();

	// 	app = moduleFixture.createNestApplication();
	// 	await app.init();
	// });

	// it('GET /', () => {
	// 	return request(app.getHttpServer())
	// 		.get('/')
	// 		.expect(200)
	// 		.expect('Hello World!');
	// });

	describe('/users', () => {
		let user: UserDb;
		it('POST /users', async () => {
			const res = await request(app.getHttpServer())
				.post('/users')
				.send({
					"firstName": "caio",
					"lastName": "donat",
					"email": `cdonat.dev${rndInt}${rndInt}@gmail.com`,
					"password": "12qwaszx",
					"phone": `5519112233${rndInt}${rndInt}`
				})
				.expect(201);

			user = res.body;
		});
		
		it('GET /users/{id}', async () => {
			const res = await request(app.getHttpServer())
				.get(`/users/${user.id}`)
				.expect(200);

			return res;
		});
	});
});
