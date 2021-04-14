package restaurante

class Cardapio {

    String idProduto
    String nome
    String preco

    static hasMany = [vendaRapidaProdutos: VendaRapidaProdutos, entregaProdutos: EntregaProdutos]

    static constraints = {
        idProduto unique: true
        vendaRapidaProdutos nullable: true
    }
}
