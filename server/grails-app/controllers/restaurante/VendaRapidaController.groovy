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
        Map model = [:]

        params.putAll(request.JSON as Map)
        model.put("status", vendaRapidaService.save(params.entity))

        respond model
    }
}
