package main

import (
	"fmt"
	"log"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name        string
	Img         string
	Description string
	Price       uint
	Active      bool
}

func createProduct(db *gorm.DB, product *Product) error {
	result := db.Create(product)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func getProducts(db *gorm.DB) []Product {
	var products []Product
	// result := db.Find(&products)
	result := db.Order("Id desc").Find(&products)
	if result.Error != nil {
		log.Fatalf("Error finding book: %v", result.Error)
	}
	return products
}

func getProduct(db *gorm.DB, id int) *Product {
	var product Product
	result := db.First(&product, id)
	if result.Error != nil {
		log.Fatalf("Error finding book: %v", result.Error)
	}
	return &product
}

func updateProduct(db *gorm.DB, product *Product) error {
	result := db.Model(&product).Updates(product)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func deleteProduct(db *gorm.DB, id int) error {
	var product Product
	result := db.Delete(&product, id)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func deleteProduct_unscope(db *gorm.DB, id uint) {
	var product Product
	result := db.Unscoped().Delete(&product, id)
	if result.Error != nil {
		log.Fatalf("Error deleting book: %v", result.Error)
	}
	fmt.Println("Book deleted successfully")
}

func getUnitProducts(db *gorm.DB) int64 {
	var count int64
	db.Model(&Product{}).Count(&count)
	return count
}
