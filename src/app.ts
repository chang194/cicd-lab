import Fastify, { FastifyServerOptions } from 'fastify';

export function buildApp(options: FastifyServerOptions = {}) {
  const app = Fastify({
    logger: options.logger ?? true,
    ...options
  });

  app.get('/', async () => {
    return {
      message: 'CI/CD Lab Fastify app is running',
      version: getVersionInfo(process.env.APP_VERSION || 'dev') // string 傳給 number 參數 → 型別錯誤
    };
  });

  app.get('/health', async () => {
    return {
      status: 'ok'
    };
  });

  return app;
}

// 修正：將參數型別改為 string
function getVersionInfo(version: string): string {
  return `App version: ${version}`;
}
