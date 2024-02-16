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
	Stock       uint
	Active      bool
	Sizes       []Size `gorm:"many2many:product_sizes;"`
}

func createProduct(db *gorm.DB, product *Product) error {
	// var existingSize Size
	// checkNameSize := db.Where("name = ?", size.Name).First(&existingSize)

	// if checkNameSize.RowsAffected > 0 {
	// 	db.Table("product_sizes").Create(map[string]interface{}{
	// 		"product_id": product.ID,
	// 		"size_id":    size.ID,
	// 	})
	// } else if checkNameSize.Error != nil && !errors.Is(checkNameSize.Error, gorm.ErrRecordNotFound) {
	// 	return checkNameSize.Error
	// }

	result := db.Create(product)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func getProducts(db *gorm.DB) []Product {
	var products []Product
	result := db.Order("Id desc").Preload("Sizes.SizeName").Find(&products)
	if result.Error != nil {
		log.Fatalf("Error finding products: %v", result.Error)
	}
	return products
}

func getProduct(db *gorm.DB, id int) *Product {
	var product Product
	result := db.Preload("Sizes.SizeName").First(&product, id)
	if result.Error != nil {
		log.Fatalf("Error finding book: %v", result.Error)
	}
	return &product
}

func updateProduct(db *gorm.DB, product *Product) error {
	// upadet product
	result := db.Model(&product).Updates(product)

	if result.Error != nil {
		return result.Error
	}

	var oldProduct Product
	db.First(&oldProduct, product.ID)
	if product.Img == "" {
		deleteFile("uploads/images/products" + oldProduct.Img)
		result_Img := db.Model(&Product{}).Where("id = ?", product.ID).Update("Img", product.Img)
		if result_Img.Error != nil {
			return result_Img.Error
		}
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
