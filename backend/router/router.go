package router

import (
	handler "backend/interface/handler/echo"
	"os"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func NewRouter(ah handler.ArticleHandler, uh handler.UserHandler, bh handler.BookmarkHandler) *echo.Echo {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", os.Getenv("FE_URL")},
		AllowHeaders: []string{
			echo.HeaderOrigin, echo.HeaderContentType,
			echo.HeaderAccept,
			echo.HeaderAccessControlAllowHeaders,
			echo.HeaderXCSRFToken,
		},
		AllowMethods:     []string{"GET", "PUT", "POST", "DELETE"},
		AllowCredentials: true,
	}))

	e.GET("/api/articles", ah.ArticlesPerPage)
	e.GET("//apiarticles/all", ah.AllArticles)
	e.GET("/api/articles/search", ah.SearchInArticleTitle)
	e.POST("/api/signup", uh.SignUp)
	e.POST("/api/signin", uh.SignIn)
	e.POST("/api/signout", uh.SignOut)
	b := e.Group("/api/bookmark")
	// bookmarkエンドポイントにミドルウェア追加
	b.Use(echojwt.WithConfig(echojwt.Config{
		// jwtを生成した時と同じSECRET_KEYを指定
		SigningKey: []byte(os.Getenv("SECRET")),
		// Clientから送られてくるjwtトークンの置き場所を指定
		TokenLookup: "cookie:token",
	}))
	b.GET("", bh.BookmarkPerPage)
	b.GET("/all", bh.AllBookmark)
	b.POST("/:articleId", bh.PostBookmark)
	return e
}
