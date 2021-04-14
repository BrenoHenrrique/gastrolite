package restaurante

class Cliente {

    String nome
    String celular
    String endereco
    String referencia

    static hasMany = [entregaProdutos: EntregaProdutos]

    static constraints = {}
}
