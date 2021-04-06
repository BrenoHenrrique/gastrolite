package restaurante

class VendaRapidaController {

    VendaRapidaService vendaRapidaService

    def list() {
        params.putAll(request.JSON as Map)

        respond vendaRapidaService.list(params.entity)
    }

    def create() {
        params.putAll(request.JSON as Map)

        respond vendaRapidaService.create()
    }

    def save() {
        params.putAll(request.JSON as Map)

        respond vendaRapidaService.save(params.entity)
    }

    def delete() {
        params.putAll(request.JSON as Map)
        def paramaters = params.entity

        respond vendaRapidaService.delete(paramaters.idSale, paramaters.idProduto)
    }
}
