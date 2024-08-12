<?php
$start_time = microtime(true);

$file = fopen("../generate-csv/sales_data.csv", "r");
$total_sales = 0;
$product_sales = [];

fgetcsv($file); // Skip header
while (($line = fgetcsv($file)) !== false) {
    $product_id = $line[1];
    $quantity = (int)$line[2];
    $price = (float)$line[3];
    $total = $quantity * $price;

    $total_sales += $total;
    if (!isset($product_sales[$product_id])) {
        $product_sales[$product_id] = 0;
    }
    $product_sales[$product_id] += $total;
}
fclose($file);

arsort($product_sales);
$top_product = array_key_first($product_sales);

$end_time = microtime(true);
$execution_time = ($end_time - $start_time);

echo "PHP Execution time: ".$execution_time." seconds\n";
echo "Total Sales: $".$total_sales."\n";
echo "Top Product: ".$top_product." with sales $".$product_sales[$top_product]."\n";

