import csv
import time

# Konfigurasi nama file input
input_file = '../generate-csv/sales_data.csv'


def parse_csv(file_path):
    start_time = time.time()

    total_sales = 0
    product_sales = {}

    with open(file_path, mode='r') as file:
        reader = csv.DictReader(file)

        for row in reader:
            product_id = row['product_id']
            quantity = int(row['quantity'])
            price = float(row['price'])
            total = quantity * price
            total_sales += total

            if product_id not in product_sales:
                product_sales[product_id] = 0
            product_sales[product_id] += total

    top_product = max(product_sales, key=product_sales.get)
    execution_time = time.time() - start_time

    return {
        'total_sales': total_sales,
        'top_product': top_product,
        'top_product_sales': product_sales[top_product],
        'execution_time': execution_time,
    }


if __name__ == "__main__":
    result = parse_csv(input_file)
    print(f"Python Execution time: {result['execution_time']:.2f} seconds")
    print(f"Total Sales: ${result['total_sales']:.2f}")
    print(f"Top Product: {result['top_product']} with sales ${
          result['top_product_sales']:.2f}")
