package restaurante

class EntregaProdutos {

    String observacao
    String quantidade

    static belongsTo = [entrega: Entrega, cliente: Cliente, cardapio: Cardapio]

    static constraints = {
        observacao nullable: true, blank: true
        cliente nullable: true, blank: true
    }
}
