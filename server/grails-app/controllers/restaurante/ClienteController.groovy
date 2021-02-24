package restaurante

class ClienteController {

    ClienteService clienteService

    def index() {
        params.putAll(request.JSON as Map)

        respond clienteService.list(params.field, params.value)
    }

    def save() {
        params.putAll(request.JSON as Map)

        respond clienteService.save(params.entity)
    }

    def update() {
        params.putAll(request.JSON as Map)

        respond clienteService.update(params.entity)
    }

    def delete() {
        params.putAll(request.JSON as Map)

        respond clienteService.delete(params.id)
    }
}
