package restaurante

class Entrega {

    Long idEntrega

    static hasMany = [entregaProdutos: EntregaProdutos]

    static constraints = {
        entregaProdutos nullable: true
    }
}
