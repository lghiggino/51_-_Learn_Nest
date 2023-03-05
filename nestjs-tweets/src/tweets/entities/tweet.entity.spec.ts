import mongoose from 'mongoose';
import { Tweet, TweetSchema } from './tweet.entity';

describe('Tweets', () => {
  describe('Tweet Class', () => {
    it('should create a tweet', () => {
      const tweet = new Tweet({
        content: 'Hello World',
        screen_name: 'Leonardo',
      });

      expect(tweet.content).toBe('Hello World');
      expect(tweet.screen_name).toBe('Leonardo');
    });
  });

  describe('in Mongo DB', () => {
    let connection: mongoose.Mongoose;
    beforeEach(async () => {
      connection = await mongoose.connect(
        'mongodb://root:root@localhost:27017/tweets_test?authSource=admin',
      );
    });

    afterEach(async () => {
      await connection.disconnect();
    });

    it('should create a tweet document', async () => {
      const TweetModel = connection.model('Tweet', TweetSchema);
      const tweet = new TweetModel({
        content: 'Hello World',
        screen_name: 'Leonardo',
      });

      await tweet.save();
      const savedTweet = await TweetModel.findById(tweet._id);
      expect(savedTweet).toBeDefined();
      expect(savedTweet.content).toBe('Hello World');
      expect(savedTweet.screen_name).toBe('Leonardo');
    });
  });
});
