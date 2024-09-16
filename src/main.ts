import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura el prefijo global para las rutas de la API
  app.setGlobalPrefix('api/v1');

  /* 
  * Habilita CORS (Cross-Origin Resource Sharing) para la aplicación
  * Configuración:
  * - origin: '*' permite solicitudes desde cualquier origen
  * - methods: especifica los métodos HTTP permitidos
  * - allowedHeaders: define las cabeceras permitidas en las solicitudes
  */
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  /*
  * Configura la tubería global de validación de datos
  * - whitelist: elimina las propiedades que no están definidas en el DTO
  * - forbidNonWhitelisted: lanza un error si se envían propiedades no definidas en el DTO
  * - transform: convierte los datos de la solicitud a los tipos definidos en el DTO
  */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
