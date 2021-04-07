package restaurante

class LocaisController {

    LocaisService locaisService

    def index() {
        params.putAll(request.JSON as Map)

        respond locaisService.list(params.field, params.value)
    }

    def save() {
        params.putAll(request.JSON as Map)

        respond locaisService.save(params.entity)
    }

    def update() {
        params.putAll(request.JSON as Map)

        respond locaisService.update(params.entity)
    }

    def delete() {
        params.putAll(request.JSON as Map)

        respond locaisService.delete(params.id)
    }
}
