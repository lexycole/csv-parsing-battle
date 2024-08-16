/**
 * @description Read CSV file of 1000000 rows using and compute the sum of the values in the column.
 */

/*
../sales_data.csv:
transaction_id,product_id,quantity,price,timestamp
1,1794,6,20.37,2024-08-21 11:27:46
2,1235,9,66.96,2024-08-17 00:52:22
3,1855,9,88.76,2024-08-22 11:22:57
4,1028,1,64.58,2024-08-20 23:54:57
... (1000000 rows)


TODO:
1. Read the CSV file
2. Calculate the total sales amount. (quantity * price)
3. Identify the product_id with the highest sales amount.
*/

// import fs module
import { readFileSync } from "fs"
import { hrtime } from "process"

const NS_PER_SEC = 1e9
const start = hrtime()

// read the CSV file
/** @type {string} data */
const data = readFileSync("../generate-csv/sales_data.csv", "utf8").slice(51) // remove the header row

// split the data into rows
/** @type {string[]} rows */
const rows = data.split("\n")

if (rows[rows.length - 1] === "") rows.pop()

// initialize the total sales amount
/** @type {number} totalSalesAmount */
let totalSalesAmount = 0

// initialize the highest sales amount
/** @type {number} highestSalesAmount */
let highestSalesAmount = 0

// initialize the product_id with the highest sales amount
/** @type {number} productWithHighestSalesAmount */
let productWithHighestSalesAmount = null

/**
 * @type {Object.<string, number>}
 */
const productAndSalesAmount = {}

// iterate through the rows
for (const element of rows) {
    // split the row into columns
    /** @type {string[]} columns */
    const columns = element.split(",")

    // calculate the sales amount
    /** @type {number} salesAmount */
    const salesAmount = parseInt(columns[2]) * parseFloat(columns[3])

    // add the sales amount to the total sales amount
    totalSalesAmount += salesAmount

    // check if the product_id is already in the productAndSalesAmount object
    if (productAndSalesAmount[columns[1]]) {
        // add the sales amount to the existing sales amount
        productAndSalesAmount[columns[1]] += salesAmount
    } else {
        // add the product_id to the productAndSalesAmount object
        productAndSalesAmount[columns[1]] = salesAmount
    }
}

// iterate through the productAndSalesAmount object
for (const key in productAndSalesAmount) {
    // check if the sales amount is higher than the highest sales amount
    if (productAndSalesAmount[key] > highestSalesAmount) {
        // update the highest sales amount
        highestSalesAmount = productAndSalesAmount[key]
        // update the product_id with the highest sales amount
        productWithHighestSalesAmount = key
    }
}

const end = hrtime(start)

// log the statistics
console.log("Nodejs Execution Time:", end[0] + (end[1] / NS_PER_SEC))
console.log("Total Sales: $", totalSalesAmount)
console.log(`Top Product: ${productWithHighestSalesAmount} with sales $${highestSalesAmount}`)