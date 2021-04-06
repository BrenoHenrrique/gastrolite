package restaurante

import dtos.VendaRapidaItensDTO
import grails.gorm.transactions.Transactional

@Transactional
class VendaRapidaService {

    MensagemService mensagemService

    Map list(id) {
        Map model = [:]

        VendaRapida vendaRapida = VendaRapida.findByIdVenda(id)
        ArrayList<VendaRapidaProdutos> vendaProdutos = VendaRapidaProdutos.findAllByVendaRapida(vendaRapida)

        ArrayList<Integer> quantidades = []
        ArrayList listaCardapio = []
        ArrayList<VendaRapidaItensDTO> result = []

        vendaProdutos.each { item ->
            listaCardapio.add(item.cardapio)
            quantidades.add(item.quantidade)
        }

        listaCardapio.eachWithIndex { item, index ->
            result.add(new VendaRapidaItensDTO([
                    idProduto : item.idProduto as Long,
                    nome      : item.nome,
                    quantidade: quantidades[index] as Integer,
                    preco     : item.preco as BigDecimal
            ]))
        }

        model.put("entities", result)

        return model
    }

    Map create() {
        Map model = [:]

        VendaRapida last = VendaRapida.last()

        if (last) {
            Long idVenda = last.idVenda + 1
            model.put("id", idVenda)
        } else {
            model.put("id", 1)
        }

        VendaRapida venda = new VendaRapida()
        venda.idVenda = model.get("id")
        venda.save()

        return model
    }

    Map save(paramaters) {
        Map model = [:]
        Cardapio cardapio = Cardapio.findByIdProduto(paramaters.idProduto)
        VendaRapida venda = VendaRapida.findByIdVenda(paramaters.idVenda)

        if (venda && paramaters.cliente) {
            venda.nome = paramaters.cliente
            venda.save(flush: true)
        }

        if (venda) {
            VendaRapidaProdutos vendaProdutos = new VendaRapidaProdutos()
            vendaProdutos.cardapio = cardapio
            vendaProdutos.vendaRapida = venda
            vendaProdutos.quantidade = paramaters.quantidade
            vendaProdutos.save(flush: true)
            model.put("status", "success")
            model.put("message", mensagemService.getMensagem("default.success.save"))
            return model
        }

        model.put("status", "error")
        model.put("message", mensagemService.getMensagem("default.error"))
        return model
    }

    Map delete(Long idSale, Long idProduto) {
        Map model = [:]
        VendaRapida venda = VendaRapida.findByIdVenda(idSale)
        Cardapio cardapio = Cardapio.findByIdProduto(idProduto)
        VendaRapidaProdutos item = VendaRapidaProdutos.findByVendaRapidaAndCardapio(venda, cardapio)

        if (item) {
            item.delete(flush: true)
            item.save()
            model.put("status", "success")
            model.put("message", mensagemService.getMensagem("default.success.delete"))
            return model
        }

        model.put("status", "error")
        model.put("message", mensagemService.getMensagem("default.error"))
        return model
    }
}
