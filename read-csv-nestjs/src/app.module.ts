import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsvService } from './csv/csv.service';
import { CsvController } from './csv/csv.controller';

@Module({
  imports: [],
  controllers: [AppController, CsvController],
  providers: [AppService, CsvService],
})
export class AppModule {}
