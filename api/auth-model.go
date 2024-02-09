package main

import (
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func login(db *gorm.DB, user *User) (*User, string, error) {
	currentUser := new(User)
	result := db.Where("username = ?", user.Username).First(currentUser)

	if result.Error != nil {
		return currentUser, "", result.Error
	}

	err := bcrypt.CompareHashAndPassword([]byte(currentUser.Password), []byte(user.Password))

	if err != nil {
		return currentUser, "", err
	}

	// Create JWT token
	jwtSecretKey := "devSecretKey"
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	t, err := token.SignedString([]byte(jwtSecretKey))
	if err != nil {
		return currentUser, "", err
	}

	return currentUser, t, nil
}
