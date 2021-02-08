package restaurante

class LoginController {

    LoginService loginService

    def validate() {
        Map model = [:]
        params.putAll(request.JSON as Map)

        model.put("entityInstance", loginService.validate(params.entity.nome, params.entity.senha))

        respond model
    }
}
