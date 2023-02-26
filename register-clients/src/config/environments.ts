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
    s3: {
      bucket: process.env.AWS_S3_BUCKET_NAME,
    },
  },
  app: {
    recovery: {
      password: process.env.RECOVERY_PASSWORD_URL,
    },
    account: {
      patient: {
        enable: process.env.ENABLE_PATIENT_REGISTER_HREF,
        disable: process.env.DISABLE_PATIENT_REGISTER_HREF,
      },
      doctor: {
        enable: process.env.ENABLE_DOCTOR_REGISTER_HREF,
        disable: process.env.DISABLE_DOCTOR_REGISTER_HREF,
      },
    },
  },
});
