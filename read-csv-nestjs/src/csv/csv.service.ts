import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as fastcsv from 'fast-csv';

// path file CSV
const GLOBAL_CSV_PATH = '../generate-csv/sales_data.csv';

@Injectable()
@Injectable()
export class CsvService {
  async parseCsv(): Promise<{
    nestExecutionTime: number;
    totalSales: number;
    topProductSales: number;
  }> {
    return new Promise((resolve, reject) => {
      const startTime = process.hrtime();

      let totalSales = 0;
      const productSales: { [key: string]: number } = {};

      fs.createReadStream(GLOBAL_CSV_PATH)
        .pipe(fastcsv.parse({ headers: true, delimiter: ',' }))
        .on('data', (row) => {
          const productID = row.product_id;
          const quantity = parseInt(row.quantity, 10);
          const price = parseFloat(row.price);
          const total = quantity * price;
          totalSales += total;
          if (!productSales[productID]) {
            productSales[productID] = 0;
          }
          productSales[productID] += total;
        })
        .on('end', () => {
          const topProduct = Object.keys(productSales).reduce((a, b) =>
            productSales[a] > productSales[b] ? a : b,
          );
          const topProductSales = productSales[topProduct] || 0;
          const endTime = process.hrtime(startTime);
          const nestExecutionTime = endTime[0] + endTime[1] / 1e9;

          console.log(`NestJS Execution time: ${nestExecutionTime} seconds`);
          console.log(`Total Sales: $${totalSales}`);
          console.log(
            `Top Product: ${topProduct} with sales $${topProductSales}`,
          );

          resolve({
            nestExecutionTime,
            totalSales,
            topProductSales,
          });
        })
        .on('error', (error) => reject(error));
    });
  }
}
