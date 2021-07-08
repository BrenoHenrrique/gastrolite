package restaurante

class VendaRapida {

    Long idVenda
    String nome
    Date data

    static hasMany = [vendaRapidaProdutos: VendaRapidaProdutos]

    static constraints = {
        nome nullable: true
        vendaRapidaProdutos nullable: true
        data defaultValue: new Date()
    }
}
