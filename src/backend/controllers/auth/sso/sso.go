package sso

import (
	"github.com/Qihoo360/wayne/src/backend/controllers/auth"
	"github.com/Qihoo360/wayne/src/backend/models"
)

type SSoAuth struct{}


func init() {
	auth.Register(models.AuthTypeSso, &SSoAuth{})
}

func (*SSoAuth) Authenticate(m models.AuthModel) (*models.User, error) {
	username := m.Username
	user, _ := models.UserModel.GetUserByName(username)

	return user, nil
}
