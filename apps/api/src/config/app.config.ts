// App-level config: port, global prefix, environment, CORS settings.

export default () => ({
  port: Number(process.env.PORT) || 3000,
  globalPrefix: process.env.API_PREFIX || 'api',
  environment: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
});
