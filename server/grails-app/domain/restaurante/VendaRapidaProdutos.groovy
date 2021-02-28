package restaurante

class VendaRapidaProdutos {

    String quantidade

    static belongsTo = [cardapio: Cardapio, vendaRapida: VendaRapida]

    static constraints = {}
}
