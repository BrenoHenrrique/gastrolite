package restaurante

class BaixaEstoque {

    Insumo insumo
    Long quantidade
    BigDecimal valor
    Date data

    static constraints = {
        data defaultValue: new Date()
    }
}