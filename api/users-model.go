package main

import (
	"errors"
	"fmt"
	"log"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	FirstName string
	LastName  string
	Img       string
	Email     string
	Username  string
	Password  string
	RoleID    uint `gorm:"default:3"`
	Role      Role
	Active    bool
}

func getUsers(db *gorm.DB, keywords string) []User {
	var users []User
	query := db.Order("Id desc")

	if keywords != "" {
		query = query.Where(
			"first_name ILIKE ? OR last_name ILIKE ? OR username ILIKE ?", "%"+keywords+"%", "%"+keywords+"%", "%"+keywords+"%")
	}

	result := query.Preload("Role").Find(&users)

	if result.Error != nil {
		log.Fatalf("Error finding user: %v", result.Error)
	}
	return users
}

func getUser(db *gorm.DB, id int) *User {
	var user User
	result := db.First(&user, id)
	if result.Error != nil {
		log.Fatalf("Error finding user: %v", result.Error)
	}
	return &user
}

func createUser(db *gorm.DB, user *User) error {
	var existingUser User
	fmt.Println("---------------------------")
	fmt.Println(user)
	fmt.Println("---------------------------")
	fmt.Println(user.Active)
	fmt.Println("---------------------------")
	result := db.Where("username = ?", user.Username).First(&existingUser)

	if result.RowsAffected > 0 {
		return errors.New("Username already taken")
	} else if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return result.Error
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	user.Password = string(hashedPassword)

	result = db.Create(user)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func updateUser(db *gorm.DB, user *User) error {
	result := db.Model(&user).Updates(user)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func deleteUser(db *gorm.DB, id int) error {
	var user User
	result := db.Delete(&user, id)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func getUnitUsers(db *gorm.DB) int64 {
	var count int64
	db.Model(&User{}).Count(&count)
	return count
}
