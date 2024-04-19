package articles

import (
	"backend/database"
	"backend/infrastrcuture/persistence"
	handler "backend/interface/handler/http"
	"backend/usecase"
	"net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	db := database.NewPostgreSQLDB()
	defer database.CloseDB(db)
	ap := persistence.NewArticlePersistence(db)
	au := usecase.NewArticleUsecase(ap)
	ah := handler.NewArticleHandler(au)
	ah.ArticlesPerPage(w, r)
}
