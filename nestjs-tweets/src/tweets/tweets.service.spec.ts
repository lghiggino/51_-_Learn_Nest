import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Tweet, TweetSchema } from './entities/tweet.entity';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;
  let module: TestingModule;

  beforeEach(async () => {
    const host = 'localhost';
    const uri = `mongodb://root:root@${host}:27017/tweets_test?authSource=admin`;
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
      ],
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a tweet', async () => {
    const tweet = await service.create({
      content: 'Test tweet',
      screen_name: 'Leonardo',
    });

    expect(tweet.content).toBe('Test tweet');
    expect(tweet.screen_name).toBe('Leonardo');

    const tweetCreated = await service['tweetModel'].findById(tweet._id);
    expect(tweetCreated.content).toBe('Test tweet');
    expect(tweetCreated.screen_name).toBe('Leonardo');
  });
});
