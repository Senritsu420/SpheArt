package main

import (
	"backend/database"
	"backend/domain/model"
	"fmt"
)

func main() {
	// DBのインスタンスアドレスを取得
	dbConn := database.NewDB()
	defer fmt.Println("Successfully Migrated")
	defer database.CloseDB(dbConn)
	dbConn.AutoMigrate(&model.Article{})
}