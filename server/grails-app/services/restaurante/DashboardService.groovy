package restaurante

import grails.gorm.transactions.Transactional

import java.text.SimpleDateFormat

@Transactional
class DashboardService {

    List getVendasHoje() {
        String pattern = "yyyy-MM-dd HH:mm:ss"
        SimpleDateFormat sdf = new SimpleDateFormat(pattern)

        Long data = new Date().getTime() - 10 * 60 * 60 * 1000
        String inicio = new Date(data).toTimestamp().toString().substring(0, 10) + " 00:00:00"
        String fim = new Date(data).toTimestamp().toString().substring(0, 10) + " 23:59:59"

        List<Pagamento> pagamentos = Pagamento.findAllByDataGreaterThanEqualsAndDataLessThanEquals(
                sdf.parse(inicio),
                sdf.parse(fim)
        )

        return pagamentos
    }
}
