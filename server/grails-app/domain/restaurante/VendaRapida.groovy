package restaurante

class VendaRapida {

    Long idVenda
    String nome

    static hasMany = [produtos: Cardapio]

    static mapping = {

    }

    static constraints = {
        nome nullable: true
        produtos nullable: true
    }
}
