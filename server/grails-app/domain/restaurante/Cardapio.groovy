package restaurante

class Cardapio {

    String idProduto
    String nome
    String preco

    static constraints = {
        idProduto unique: true
    }
}
