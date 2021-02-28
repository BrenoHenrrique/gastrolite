package restaurante

class Cardapio {

    String idProduto
    String nome
    String preco

    static hasMany = [vendaRapidaProdutos: VendaRapidaProdutos]

    static constraints = {
        idProduto unique: true
        vendaRapidaProdutos nullable: true
    }
}
