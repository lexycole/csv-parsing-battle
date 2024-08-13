package main

import (
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
	"time"
)

func main() {
	start := time.Now()

	file, err := os.Open("../generate-csv/sales_data.csv")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer file.Close()

	reader := csv.NewReader(file)
	_, _ = reader.Read() // Skip header

	totalSales := 0.0
	productSales := make(map[string]float64)

	var topProduct string
	var topSales float64

	for {
		line, err := reader.Read()
		if err != nil {
			break
		}

		productID := line[1]
		quantity, _ := strconv.Atoi(line[2])
		price, _ := strconv.ParseFloat(line[3], 64)
		total := float64(quantity) * price

		totalSales += total
		productSales[productID] += total

		// Update topProduct and topSales in the same loop
		if productSales[productID] > topSales {
			topProduct = productID
			topSales = productSales[productID]
		}
	}

	elapsed := time.Since(start)
	fmt.Printf("Golang Execution time: %s\n", elapsed)
	fmt.Printf("Total Sales: $%.2f\n", totalSales)
	fmt.Printf("Top Product: %s with sales $%.2f\n", topProduct, topSales)
}
