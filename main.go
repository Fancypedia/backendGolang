package main

import (
	routes "golangsidang/routes"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}
	router := gin.New()
	router.Use(gin.Logger())

	// Konfigurasi CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"} // Izinkan semua domain
	router.Use(cors.New(config))

	routes.AuthRoutes(router)
	routes.UserRoutes(router)
	routes.GetAlluser(router)
	routes.GetAllProduct(router)
	routes.FaqRoutes(router)

	router.GET("/api-1", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World",
		})
	})

	router.GET("/course", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Course API",
		})
	})

	router.GET("/api-2", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Hello World"})
	})

	router.Run(":" + port)
}
