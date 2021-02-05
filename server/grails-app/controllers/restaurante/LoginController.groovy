package restaurante

class LoginController {

    LoginService loginService

    def validate() {
        params.putAll(request.JSON as Map)
    }
}
