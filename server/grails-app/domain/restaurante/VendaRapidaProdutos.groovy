package restaurante

class VendaRapidaProdutos {

    String observacao
    String quantidade

    static belongsTo = [cardapio: Cardapio, vendaRapida: VendaRapida]

    static constraints = {
        observacao nullable: true, blank: true
    }
}
