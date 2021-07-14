package restaurante

import enums.TipoDePagamento
import grails.gorm.transactions.Transactional

@Transactional
class PagamentoService {

    MensagemService mensagemService

    def save(Long idVenda, String tipo, String tipoDePagamento, BigDecimal taxa, BigDecimal pago) {

        Map model = [:]
        def produtos
        BigDecimal total = 0.0
        Entrega entrega = null
        VendaRapida vendaRapida = null
        Pagamento pagamento = new Pagamento()

        if (tipo == "entrega") {
            entrega = Entrega.get(idVenda)
            produtos = EntregaProdutos.findAllByEntrega(entrega)
            produtos.forEach {
                Float preco = Float.parseFloat(it.cardapio.preco)
                Float quantidade = Float.parseFloat(it.quantidade)
                total += preco * quantidade
            }
            pagamento.pago = pago
            pagamento.taxa = taxa
            pagamento.troco = pago - (total + taxa)
            pagamento.total = total + taxa
        } else {
            vendaRapida = VendaRapida.get(idVenda)
            produtos = VendaRapidaProdutos.findAllByVendaRapida(vendaRapida)
            produtos.forEach {
                Float preco = Float.parseFloat(it.cardapio.preco)
                Float quantidade = Float.parseFloat(it.quantidade)
                total += preco * quantidade
            }
            pagamento.pago = total
            pagamento.taxa = 0
            pagamento.troco = 0
            pagamento.total = total
        }

        if (entrega) {
            pagamento.entrega = entrega
        } else {
            pagamento.vendaRapida = vendaRapida
        }
        pagamento.tipoDePagamento = tipoDePagamento ? TipoDePagamento.valueOf(tipoDePagamento) : TipoDePagamento.DINHEIRO
        pagamento.data = new Date()
        pagamento.save(flush: true, failOnError: true)
        if (!pagamento.hasErrors()) {
            model.put("status", "success")
            model.put("message", mensagemService.getMensagem("default.success.save"))
            return model
        }

        model.put("status", "error")
        model.put("message", mensagemService.getMensagem("default.error"))
        return model
    }
}
