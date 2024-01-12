import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppTypes, swaggerCreatorOption } from './common/interfaces/app.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const options = new DocumentBuilder()
  //   .setTitle('Your API Title')
  //   .setDescription('Your API description')
  //   .setVersion('1.0')
  //   .addServer('http://localhost:3000/', 'Local environment')
  //   .addServer('https://staging.yourapi.com/', 'Staging')
  //   .addServer('https://production.yourapi.com/', 'Production')
  //   .addTag('Your API Tag')
  //   .build();

  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('docs', app, document);

  documentCreator({
    app,
    appType: AppTypes.user,
    title: `eKasebSeminar ${process.env.EXECUTION} api`,
    desc: 'The eKasebSeminar Api Documents',
    version: '1.15.2',
    path: 'docs'
  });
  await app.listen(3000);
}

function documentCreator({ app, appType, desc, title, version, path }: swaggerCreatorOption) {

  // swagger option
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(desc)
    .setVersion(version);
  // .addSecurityRequirements('sign')
  // .addSecurity('sign', {
  //   type: 'apiKey',
  //   in: 'header',
  //   name: 'sign',
  // });

  // if (appType == AppTypes.admin)
  config.addSecurity('Authorization', {
    type: 'apiKey',
    in: 'header',
    name: 'Authorization',
  }).addSecurityRequirements('Authorization')

  // if (process.env.DEV) {
  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup(path, app, document);
  // }
}

bootstrap();
