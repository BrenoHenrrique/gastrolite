package restaurante

import dtos.EntregaItensDTO
import grails.gorm.transactions.Transactional

@Transactional
class EntregaService {

    MensagemService mensagemService

    Map list(id) {
        Map model = [:]

        Entrega entrega = Entrega.findByIdEntrega(id)
        ArrayList<EntregaProdutos> entregaProdutos = EntregaProdutos.findAllByEntrega(entrega)

        ArrayList<EntregaItensDTO> result = []
        ArrayList<Integer> quantidades = []
        ArrayList listaCardapio = []

        entregaProdutos.each { item ->
            listaCardapio.add(item.cardapio)
            quantidades.add(item.quantidade)
        }

        listaCardapio.eachWithIndex { item, index ->
            result.add(new EntregaItensDTO([
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

        Entrega last = Entrega.last()

        if (last) {
            Long idEntrega = last.idEntrega + 1
            model.put("id", idEntrega)
        } else {
            model.put("id", 1)
        }

        Entrega entrega = new Entrega()
        entrega.idEntrega = model.get("id")
        entrega.save()

        return model
    }

    Map save(paramaters) {
        Map model = [:]
        Cardapio cardapio = Cardapio.findByIdProduto(paramaters.idProduto)
        Entrega entrega = Entrega.findByIdEntrega(paramaters.idVenda)

        if (entrega) {
            EntregaProdutos entregaProdutos = new EntregaProdutos()
            entregaProdutos.cardapio = cardapio
            entregaProdutos.entrega = entrega
            entregaProdutos.quantidade = paramaters.quantidade
            entregaProdutos.save(flush: true)
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
        Entrega venda = Entrega.findByIdEntrega(idSale)
        Cardapio cardapio = Cardapio.findByIdProduto(idProduto)
        EntregaProdutos item = EntregaProdutos.findByEntregaAndCardapio(venda, cardapio)

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
