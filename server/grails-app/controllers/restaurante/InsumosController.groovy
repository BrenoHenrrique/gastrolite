package restaurante

class InsumosController {

    InsumosService insumosService

    def index() {
        params.putAll(request.JSON as Map)

        respond insumosService.list(params.field, params.value)
    }

    def save() {
        params.putAll(request.JSON as Map)

        respond insumosService.save(params.entity)
    }

    def update() {
        params.putAll(request.JSON as Map)

        respond insumosService.update(params.entity)
    }

    def delete() {
        params.putAll(request.JSON as Map)

        respond insumosService.delete(params.id)
    }

    def downStock() {
        params.putAll(request.JSON as Map)

        respond insumosService.downStock(params.entity)
    }
}
