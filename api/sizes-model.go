package main

import (
	"log"

	"gorm.io/gorm"
)

type Size struct {
	gorm.Model
	SizeNameID uint
	SizeName   SizeName
	Product    []Product `gorm:"many2many:product_sizes;"`
	Amount     uint
}

type SizeName struct {
	gorm.Model
	Name string
}

func createSizeName(db *gorm.DB, sizeName *SizeName) error {
	result := db.Create(sizeName)
	if result.Error != nil {
		return result.Error
	}

	return nil
}
func createSize(db *gorm.DB, size *Size) error {
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

	result := db.Create(size)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func getSizes(db *gorm.DB) []Size {
	var size []Size
	// result := db.Find(&products)
	result := db.Preload("SizeName").Find(&size)
	if result.Error != nil {
		log.Fatalf("Error finding book: %v", result.Error)
	}
	return size
}

func getSizesName(db *gorm.DB) []SizeName {
	var sizeName []SizeName
	// result := db.Find(&products)
	result := db.Find(&sizeName)
	if result.Error != nil {
		log.Fatalf("Error finding sizeName: %v", result.Error)
	}
	return sizeName
}

// func getProduct(db *gorm.DB, id int) *Product {
// 	var product Product
// 	result := db.First(&product, id)
// 	if result.Error != nil {
// 		log.Fatalf("Error finding book: %v", result.Error)
// 	}
// 	return &product
// }

func updateSize(db *gorm.DB, size *Size) error {
	result := db.Model(&size).Updates(size)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

// func deleteProduct(db *gorm.DB, id int) error {
// 	var product Product
// 	result := db.Delete(&product, id)
// 	if result.Error != nil {
// 		return result.Error
// 	}

// 	return nil
// }

// func deleteProduct_unscope(db *gorm.DB, id uint) {
// 	var product Product
// 	result := db.Unscoped().Delete(&product, id)
// 	if result.Error != nil {
// 		log.Fatalf("Error deleting book: %v", result.Error)
// 	}
// 	fmt.Println("Book deleted successfully")
// }

// func getUnitProducts(db *gorm.DB) int64 {
// 	var count int64
// 	db.Model(&Product{}).Count(&count)
// 	return count
// }
