package restaurante

class Entrega {

    Long idEntrega
    Date data

    static hasMany = [entregaProdutos: EntregaProdutos]

    static constraints = {
        entregaProdutos nullable: true
        data defaultValue: new Date()
    }
}
