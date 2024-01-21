package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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

	db.AutoMigrate(&Product{})
	fmt.Println("Database migration completed!")

	// Setup Fiber
	app := fiber.New()

	// Use CORS middleware with default configuration
	app.Use(cors.New())

	// CRUD routes
	// select all
	app.Get("/products", func(c *fiber.Ctx) error {
		return c.JSON(getProducts(db))
	})

	// select id
	app.Get("/product/:id", func(c *fiber.Ctx) error {
		id, err := strconv.Atoi(c.Params("id"))
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		product := getProduct(db, id)
		return c.JSON(product)
	})

	// create
	app.Post("/product", func(c *fiber.Ctx) error {
		product := new(Product)
		err := c.BodyParser(product)
		file, err := c.FormFile("Img")

		if file != nil {

			if err != nil {
				return c.SendStatus(fiber.StatusBadRequest)
			}

			err = c.SaveFile(file, "uploads/images/"+file.Filename)

			if err != nil {
				return c.SendStatus(fiber.StatusInternalServerError)
			}
			product.Img = file.Filename
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

	// update
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
		product.ID = uint(id)
		err3 := updateProduct(db, product)
		if err3 != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		return c.JSON(fiber.Map{
			"message": "success",
		})
	})

	// delete
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

	app.Post("/upload", func(c *fiber.Ctx) error {
		file, err := c.FormFile("file")

		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}

		err = c.SaveFile(file, "uploads/images/"+file.Filename)

		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.JSON(fiber.Map{
			"message": "File uploaded successfully",
		})
	})

	app.Listen(":8080")

}
