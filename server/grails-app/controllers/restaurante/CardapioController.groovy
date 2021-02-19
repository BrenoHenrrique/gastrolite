package restaurante

class CardapioController {

    CardapioService cardapioService

    def index() {
        params.putAll(request.JSON as Map)

        respond cardapioService.list(params.field, params.value)
    }

    def save() {
        params.putAll(request.JSON as Map)

        respond cardapioService.save(params.entity)
    }

    def update() {
        params.putAll(request.JSON as Map)

        respond cardapioService.update(params.entity)
    }

    def delete() {
        params.putAll(request.JSON as Map)

        respond cardapioService.delete(params.id)
    }
}
