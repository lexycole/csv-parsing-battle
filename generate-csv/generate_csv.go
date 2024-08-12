package main

import (
	"encoding/csv"
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"time"
)

func main() {
	// Open a file for writing
	file, err := os.Create("sales_data.csv")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	// Write the header
	header := []string{"transaction_id", "product_id", "quantity", "price", "timestamp"}
	writer.Write(header)

	// Generate and write 1 million records
	for i := 1; i <= 1000000; i++ {
		transactionID := strconv.Itoa(i)
		productID := strconv.Itoa(rand.Intn(1000) + 1000) // Product IDs between 1000 and 1999
		quantity := strconv.Itoa(rand.Intn(10) + 1)       // Quantities between 1 and 10
		price := fmt.Sprintf("%.2f", rand.Float64()*100)  // Prices between 0.00 and 99.99
		timestamp := time.Now().Add(time.Duration(rand.Intn(1000000)) * time.Second).Format("2006-01-02 15:04:05")

		record := []string{transactionID, productID, quantity, price, timestamp}
		writer.Write(record)
	}

	fmt.Println("CSV file generated successfully.")
}
