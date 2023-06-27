export default () => ({
  database: {
    uri: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  aws: {
    region: process.env.AWS_REGION,
    accesskey: process.env.AWS_ACCESSKEY,
    secretkey: process.env.AWS_SECRETKEY,
  },
});
