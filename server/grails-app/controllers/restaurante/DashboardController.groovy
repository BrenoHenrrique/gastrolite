package restaurante

class DashboardController {

    DashboardService dashboardService

    def list() {
        Map model = [:]

        model.put("totalHoje", dashboardService.getVendasHoje().sum{it.total})
        model.put("gastosHoje", dashboardService.getGastosHoje().sum{it.valor})

        respond model
    }

    def entitiesToday() {
        Map model = [:]

        model.put("entities", dashboardService.getVendasHoje())
        model.put("header", ["PAGO", "TAXA", "TROCO", "TOTAL", "TIPO", "DATA"])

        respond model
    }
}
