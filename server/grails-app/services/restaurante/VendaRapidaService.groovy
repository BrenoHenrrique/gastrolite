package restaurante

import grails.gorm.transactions.Transactional

@Transactional
class VendaRapidaService {

    Map list(id) {
        Map model = [:]

        VendaRapida vendaRapida = VendaRapida.findByIdVenda(id)
        ArrayList<VendaRapidaProdutos> vendaProdutos = VendaRapidaProdutos.findAllByVendaRapida(vendaRapida)

        ArrayList quantidades = []
        ArrayList listaCardapio = []
        ArrayList result = []

        vendaProdutos.each { item ->
            listaCardapio.add(item.cardapio)
            quantidades.add(item.quantidade)
        }

        listaCardapio.eachWithIndex { item, index ->
            result.add([
                    idProduto : item.idProduto,
                    nome      : item.nome,
                    quantidade: quantidades[index],
                    preco     : item.preco
            ])
        }

        model.put("itens", result)

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

    String save(paramaters) {
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

            return "salvo com sucesso"
        }

        return "Erro ao salvar"
    }

    String delete(paramaters) {
        VendaRapida venda = VendaRapida.get(paramaters.idSale)
        Cardapio cardapio = Cardapio.findByIdProduto(paramaters.idProduto)
        VendaRapidaProdutos item = VendaRapidaProdutos.findByVendaRapidaAndCardapio(venda, cardapio)

        if (item) {
            item.delete(flush: true)
            item.save()
            return "removido com sucesso"
        }

        return "Erro ao remover item, tente novamente."
    }
}
