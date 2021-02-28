package restaurante

import grails.gorm.transactions.Transactional
import org.springframework.scheduling.annotation.Async

@Transactional
class VendaRapidaService {

    Map list(id) {
        Map model = [:]

        VendaRapida venda = VendaRapida.findAllByIdVenda(id)
        model.put("itens", venda.produtos)

        return model
    }

    Map create() {
        Map model = [:]

        VendaRapida last = VendaRapida.last()

        if (last) {
            Long idVenda = last.idVenda + 1
            model.put("id", idVenda)
            return model
        } else {
            model.put("id", 1)
            return model
        }
    }

    String save(paramaters) {
        nova(paramaters)

        Cardapio cardapio = Cardapio.findByIdProduto(paramaters.idProduto)
        VendaRapida venda = VendaRapida.findByIdVenda(paramaters.idVenda)

        if (cardapio) {
            venda.addToProdutos(cardapio)
            venda.save(flush: true)

            return "salvo com sucesso"
        }

        return "Erro ao salvar"
    }

    @Async
    void nova(paramaters) {
        VendaRapida venda = VendaRapida.findByIdVenda(paramaters.idVenda)

        if (!venda) {
            VendaRapida nova = new VendaRapida()
            nova.idVenda = paramaters.idVenda
            nova.quantidade = paramaters.quantidade
            nova.save(flush: true, failOnError: true)
        }
    }
}
