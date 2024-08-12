import { Controller, Get } from '@nestjs/common';
import { CsvService } from './csv.service';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Get('parse')
  async parseCsv(): Promise<{
    nestExecutionTime: number;
    totalSales: number;
    topProductSales: number;
  }> {
    return this.csvService.parseCsv();
  }
}
