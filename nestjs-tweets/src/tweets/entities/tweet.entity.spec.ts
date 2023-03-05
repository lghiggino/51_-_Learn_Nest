import { Tweet } from './tweet.entity';

describe('Tweet', () => {
  it('should create a tweet', () => {
    const tweet = new Tweet({
      content: 'Hello World',
      screen_name: 'Leonardo',
    });

    expect(tweet.content).toBe('Hello World');
    expect(tweet.screen_name).toBe('Leonardo');
  });
});
