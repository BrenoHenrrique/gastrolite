package restaurante

import enums.TipoDePagamento

class Pagamento {

    Entrega entrega
    VendaRapida vendaRapida
    TipoDePagamento tipoDePagamento
    BigDecimal pago
    BigDecimal taxa
    BigDecimal troco
    BigDecimal total
    Date data

    static constraints = {
        entrega nullable: true
        vendaRapida nullable: true
        data defaultValue: new Date()
    }
}
