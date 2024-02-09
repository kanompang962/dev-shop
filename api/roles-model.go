package main

import (
	"errors"
	"log"

	"gorm.io/gorm"
)

type Role struct {
	gorm.Model
	Name string
}

func getRoles(db *gorm.DB, keywords string) []Role {
	var roles []Role
	query := db.Order("Id asc")

	if keywords != "" {
		query = query.Where(
			"name ILIKE ? ", "%"+keywords+"%")
	}

	result := query.Find(&roles)

	if result.Error != nil {
		log.Fatalf("Error finding user: %v", result.Error)
	}
	return roles
}

func createRole(db *gorm.DB, role *Role) error {
	var existingRole Role
	result := db.Where("name = ?", role.Name).First(&existingRole)

	if result.RowsAffected > 0 {
		return errors.New("Name already taken")
	} else if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return result.Error
	}

	result = db.Create(role)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
