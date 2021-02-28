package restaurante

class VendaRapida {

    Long idVenda
    String nome

    static hasMany = [vendaRapidaProdutos: VendaRapidaProdutos]

    static constraints = {
        nome nullable: true
        vendaRapidaProdutos nullable: true
    }
}
