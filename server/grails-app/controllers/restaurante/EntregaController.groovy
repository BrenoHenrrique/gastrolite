package restaurante

class EntregaController {

    EntregaService entregaService

    def list() {
        params.putAll(request.JSON as Map)

        respond entregaService.list(params.entity)
    }

    def create() {
        params.putAll(request.JSON as Map)

        respond entregaService.create()
    }

    def save() {
        params.putAll(request.JSON as Map)

        respond entregaService.save(params.entity)
    }

    def delete() {
        params.putAll(request.JSON as Map)
        def paramaters = params.entity

        respond entregaService.delete(paramaters.idSale, paramaters.idProduto)
    }
}
