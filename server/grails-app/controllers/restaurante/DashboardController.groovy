package restaurante

class DashboardController {

    DashboardService dashboardService

    def list() {
        Map model = [:]

        List<Pagamento> pagamentosHoje = dashboardService.getVendasHoje()
        BigDecimal totalHoje = pagamentosHoje.sum{it.total}

        model.put("totalHoje", totalHoje)

        respond model
    }

    def entitiesToday() {
        Map model = [:]

        List<Pagamento> pagamentosHoje = dashboardService.getVendasHoje()

        model.put("pagamentosHoje", pagamentosHoje)
        model.put("header", ["PAGO", "TAXA", "TROCO", "TOTAL", "TIPO", "DATA"])

        respond model
    }
}
