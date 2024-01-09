import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '09374430874',
      database: 'e-kaseb-seminar',
      entities: [],
      synchronize: true,
      autoLoadEntities: true
    }),
    TestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
