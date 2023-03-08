import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TweetController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  test('POST /tweets', async () => {
    const res = await request(app.getHttpServer())
      .post('/tweets')
      .send({ content: 'Hello World e2e', screen_name: 'Leonardo' });

    expect(res.statusCode).toEqual(201);
    expect(res.body._id).toBeDefined();
    expect(res.body).toMatchObject({
      content: 'Hello World e2e',
      screen_name: 'Leonardo',
    });
  });
});
