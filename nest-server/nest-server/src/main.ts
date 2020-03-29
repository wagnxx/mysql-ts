import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // 全局注册拦截器
   app.useGlobalInterceptors(new TransformInterceptor());
  
  await app.listen(4000);
}
bootstrap();
