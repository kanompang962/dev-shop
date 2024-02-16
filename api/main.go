package main

import (
	// "errors"
	"encoding/json"
	"fmt"

	// "go/token"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/google/uuid"

	// "golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

const (
	host     = "localhost"   // or the Docker service name if running in another container
	port     = 5432          // default PostgreSQL port
	user     = "devuser"     // as defined in docker-compose.yml
	password = "devpassword" // as defined in docker-compose.yml
	dbname   = "devdatabase" // as defined in docker-compose.yml
)

func logRequest(c *fiber.Ctx) error {
	fmt.Printf("Received request: %s %s\n", c.Method(), c.Path())
	return c.Next()
}

func myHandler(c *fiber.Ctx) error {
	return c.SendString("Hello, this is your main handler!")
}

func main() {
	// Configure your PostgreSQL database details here
	dsn := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold: time.Second, // Slow SQL threshold
			LogLevel:      logger.Info, // Log level
			Colorful:      true,        // Enable color
		},
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})

	if err != nil {
		panic("failed to connect to database")
	}

	db.AutoMigrate(
		&Product{},
		&Size{},
		&SizeName{},
		&User{},
		&Role{},
	)
	fmt.Println("Database migration completed!")

	// Setup Fiber
	app := fiber.New()

	app.Static("/uploads", "./uploads")

	// Use CORS middleware with default configuration
	app.Use(cors.New())

	//:::::::::::::::::::::: Auth ::::::::::::::::::::::\\

	// app.Post("/login", func(c *fiber.Ctx) error {
	// 	user := new(User)
	// 	err := c.BodyParser(user)
	// 	if err != nil {
	// 		return c.SendStatus(fiber.StatusBadRequest)
	// 	}

	// 	var existingUser User
	// 	result := db.Where("username = ?", user.Username).First(&existingUser)

	// 	if result.Error != nil {
	// 		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
	// 			// User not found
	// 			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
	// 				"message": "Invalid credentials",
	// 			})
	// 		}

	// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
	// 			"message": result.Error.Error(),
	// 		})
	// 	}

	// 	err2 := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(user.Password))
	// 	if err2 != nil {
	// 		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
	// 			"message": "Invalid credentials",
	// 		})
	// 	}

	// 	return c.JSON(fiber.Map{
	// 		"message": "Login successful",
	// 		"user":    existingUser,
	// 	})
	// })

	app.Post("/login", func(c *fiber.Ctx) error {
		user := new(User)
		err := c.BodyParser(user)

		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		currentUser, token, err := login(db, user)

		if err != nil {
			return c.SendStatus(fiber.StatusUnauthorized)
		}

		return c.JSON(fiber.Map{
			"message": "success",
			"data":    currentUser,
			"token":   token,
		})
	})

	app.Post("/register", func(c *fiber.Ctx) error {
		user := new(User)
		err := c.BodyParser(user)
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		err2 := createUser(db, user)
		if err2 != nil {
			if err2.Error() == "Username already taken" {
				return c.Status(fiber.StatusConflict).JSON(fiber.Map{
					"message": "Username already taken",
				})
			}
			return c.SendStatus(fiber.StatusBadRequest)
		}

		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	//:::::::::::::::::::::: User ::::::::::::::::::::::\\
	app.Get("/users", func(c *fiber.Ctx) error {
		keywords := c.Query("keywords")
		return c.JSON(getUsers(db, keywords))
	})

	app.Get("/user/:id", func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		user := getUser(db, id)
		return c.JSON(user)
	})

	app.Post("/user", func(c *fiber.Ctx) error {
		user := new(User)
		err := c.BodyParser(user)
		file, err := c.FormFile("Img")

		if file != nil {
			if err != nil {
				return c.SendStatus(fiber.StatusBadRequest)
			}
			// Generate a random filename
			randomFilename := generateRandomFilename(file.Filename)
			// Save the file with the random filename
			err = c.SaveFile(file, "uploads/images/profiles/"+randomFilename)

			if err != nil {
				return c.SendStatus(fiber.StatusInternalServerError)
			}
			user.Img = "/" + randomFilename
		}

		if err != nil {
			user.Img = ""
		}

		err2 := createUser(db, user)
		if err2 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	app.Put("/user/:id", func(c *fiber.Ctx) error {
		id, err1 := strconv.Atoi(c.Params("id"))
		if err1 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		user := new(User)
		err2 := c.BodyParser(user)
		if err2 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		file, err := c.FormFile("Img")
		if file != nil {
			if err != nil {
				return c.SendStatus(fiber.StatusBadRequest)
			}
			randomFilename := generateRandomFilename(file.Filename)
			err = c.SaveFile(file, "uploads/images/profiles/"+randomFilename)

			if err != nil {
				return c.SendStatus(fiber.StatusInternalServerError)
			}
			user.Img = "/" + randomFilename
		}

		if err != nil && user.Img == "" {
			user.Img = ""
		}

		user.ID = uint(id)
		err3 := updateUser(db, user)
		if err3 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	app.Delete("/user/:id", func(c *fiber.Ctx) error {
		id, err1 := strconv.Atoi(c.Params("id"))
		if err1 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		err3 := deleteUser(db, id)
		if err3 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	//:::::::::::::::::::::: Product ::::::::::::::::::::::\\
	app.Get("/products", func(c *fiber.Ctx) error {
		return c.JSON(getProducts(db))
	})

	app.Get("/product/:id", func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		product := getProduct(db, id)
		return c.JSON(product)
	})

	app.Post("/product", func(c *fiber.Ctx) error {
		product := new(Product)
		err := c.BodyParser(product)

		var sizes []Size
		if c.FormValue("Sizes") != "" {
			if err := json.Unmarshal([]byte(c.FormValue("Sizes")), &sizes); err != nil {
				return err
			}
			// กำหนดค่าข้อมูล Sizes ให้กับ product
			product.Sizes = sizes
		}

		file, err := c.FormFile("Img")
		if file != nil {

			if err != nil {
				return c.SendStatus(fiber.StatusBadRequest)
			}

			// Generate a random filename
			randomFilename := generateRandomFilename(file.Filename)
			// Save the file with the random filename
			err = c.SaveFile(file, "uploads/images/products/"+randomFilename)

			if err != nil {
				return c.SendStatus(fiber.StatusInternalServerError)
			}
			product.Img = "/" + randomFilename
		}

		if err != nil {
			product.Img = ""
		}

		err2 := createProduct(db, product)
		if err2 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	app.Put("/product/:id", func(c *fiber.Ctx) error {
		id, err1 := strconv.Atoi(c.Params("id"))
		if err1 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		product := new(Product)
		err2 := c.BodyParser(product)
		if err2 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		var sizes []Size
		if c.FormValue("Sizes") != "" {
			if err := json.Unmarshal([]byte(c.FormValue("Sizes")), &sizes); err != nil {
				return err
			}
			// กำหนดค่าข้อมูล Sizes ให้กับ product
			product.Sizes = sizes
			for _, size := range sizes {
				err := updateSize(db, &size)
				if err != nil {
					return c.SendStatus(fiber.StatusBadRequest)
				}
			}
		}

		file, err := c.FormFile("Img")
		if file != nil {
			if err != nil {
				return c.SendStatus(fiber.StatusBadRequest)
			}
			randomFilename := generateRandomFilename(file.Filename)
			err = c.SaveFile(file, "uploads/images/products/"+randomFilename)

			if err != nil {
				return c.SendStatus(fiber.StatusInternalServerError)
			}
			product.Img = "/" + randomFilename
		}

		if err != nil && product.Img == "" {
			product.Img = ""
		}

		product.ID = uint(id)
		err3 := updateProduct(db, product)
		if err3 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	app.Delete("/product/:id", func(c *fiber.Ctx) error {
		id, err1 := strconv.Atoi(c.Params("id"))
		if err1 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		err3 := deleteProduct(db, id)
		if err3 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	//:::::::::::::::::::::: Role ::::::::::::::::::::::\\
	app.Put("/size/:id", func(c *fiber.Ctx) error {
		id, err1 := strconv.Atoi(c.Params("id"))
		if err1 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		size := new(Size)
		err2 := c.BodyParser(size)
		if err2 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		size.ID = uint(id)
		err3 := updateSize(db, size)
		if err3 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	//:::::::::::::::::::::: Role ::::::::::::::::::::::\\
	app.Get("/roles", func(c *fiber.Ctx) error {
		keywords := c.Query("keywords")
		return c.JSON(getRoles(db, keywords))
	})

	app.Post("/role", func(c *fiber.Ctx) error {
		role := new(Role)
		err := c.BodyParser(role)
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		err2 := createRole(db, role)
		if err2 != nil {
			if err2.Error() == "Name already taken" {
				return c.Status(fiber.StatusConflict).JSON(fiber.Map{
					"message": "Name already taken",
				})
			}
			return c.SendStatus(fiber.StatusBadRequest)
		}

		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	//:::::::::::::::::::::: Size ::::::::::::::::::::::\\
	app.Get("/sizes", func(c *fiber.Ctx) error {
		return c.JSON(getSizes(db))
	})

	app.Get("/sizes_name", func(c *fiber.Ctx) error {
		return c.JSON(getSizesName(db))
	})

	app.Post("/size", func(c *fiber.Ctx) error {
		size := new(Size)
		err := c.BodyParser(size)
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		err2 := createSize(db, size)
		if err2 != nil {
			if err2.Error() == "Name already taken" {
				return c.Status(fiber.StatusConflict).JSON(fiber.Map{
					"message": "Name already taken",
				})
			}
			return c.SendStatus(fiber.StatusBadRequest)
		}

		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	app.Post("/size_name", func(c *fiber.Ctx) error {
		sizeName := new(SizeName)
		err := c.BodyParser(sizeName)
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		err2 := createSizeName(db, sizeName)
		if err2 != nil {
			if err2.Error() == "Name already taken" {
				return c.Status(fiber.StatusConflict).JSON(fiber.Map{
					"message": "Name already taken",
				})
			}
			return c.SendStatus(fiber.StatusBadRequest)
		}

		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	app.Put("/size/:id", func(c *fiber.Ctx) error {
		id, err1 := strconv.Atoi(c.Params("id"))
		if err1 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		size := new(Size)
		err2 := c.BodyParser(size)
		if err2 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		size.ID = uint(id)
		err3 := updateSize(db, size)
		if err3 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	//:::::::::::::::::::::: Utility ::::::::::::::::::::::\\
	app.Get("/unit", func(c *fiber.Ctx) error {
		countUser := getUnitUsers(db)
		countProduct := getUnitProducts(db)

		return c.JSON(fiber.Map{
			"message": "success",
			"data": fiber.Map{
				"user":    countUser,
				"product": countProduct,
			},
		})
	})

	app.Listen(":8080")

}

func generateRandomFilename(originalFilename string) string {
	// Use a combination of timestamp and UUID to generate a unique filename
	randomString := uuid.New().String()
	return randomString + "_" + originalFilename
}
