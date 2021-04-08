package restaurante

class FuncionariosController {

    FuncionariosService funcionariosService

    def index() {
        params.putAll(request.JSON as Map)

        respond funcionariosService.list(params.field, params.value)
    }

    def save() {
        params.putAll(request.JSON as Map)

        respond funcionariosService.save(params.entity)
    }

    def update() {
        params.putAll(request.JSON as Map)

        respond funcionariosService.update(params.entity)
    }

    def delete() {
        params.putAll(request.JSON as Map)

        respond funcionariosService.delete(params.id)
    }
}
