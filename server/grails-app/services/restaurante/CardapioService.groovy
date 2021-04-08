package restaurante

import grails.gorm.transactions.Transactional

@Transactional
class CardapioService {

    MensagemService mensagemService

    Map list(field, value) {
        Map model = [:]
        ArrayList<Cardapio> entities = Cardapio.list()
        model.put("columns", ["id Produto", "nome", "preço"])
        ArrayList<Cardapio> filtro = []

        if (field) {
            if (field == "id Produto") {
                entities.each {entity ->
                    if (entity.idProduto == value) {
                        filtro.add(entity)
                    }
                }
            } else if (field == "nome") {
                entities.each {entity ->
                    if (entity.nome.toUpperCase().indexOf(value.toUpperCase()) > -1) {
                        filtro.add(entity)
                    }
                }
            } else if (field == "preço") {
                entities.each {entity ->
                    if (entity.preco.toString().trim().indexOf(value) > -1) {
                        filtro.add(entity)
                    }
                }
            }

            model.put("entities", filtro.size() ? filtro.sort { entity -> entity.nome.toUpperCase() } : entities)
            return model
        }

        model.put("entities", entities.sort{entity -> entity.nome.toUpperCase()})
        return model
    }

    Map save(paramaters) {
        Map model = [:]
        Cardapio cardapio = Cardapio.findByIdProduto(paramaters.idProduto)

        if (cardapio == null) {
            try {
                Cardapio entity = new Cardapio()
                entity.idProduto = paramaters.idProduto
                entity.nome = paramaters.nome
                entity.preco = paramaters.preco.toString().trim()
                entity.save(flush: true, failOnError: true)
                model.put("status", "success")
                model.put("message", mensagemService.getMensagem("default.success.save"))
            } catch(Exception e) {
                println(e)
                model.put("status", "error")
                model.put("message", mensagemService.getMensagem("default.error"))
                return model
            }
            return model
        }

        model.put("status", "error")
        model.put("message", mensagemService.getMensagem("cardapio.error.save"))
        return model
    }

    Map update(paramaters) {
        Map model = [:]
        Cardapio cardapio
        cardapio = Cardapio.get(paramaters.id)

        if (cardapio) {
            try {
                cardapio.idProduto = paramaters.idProduto
                cardapio.nome = paramaters.nome
                cardapio.preco = paramaters.preco.toString().trim()
                cardapio.save(flush: true, failOnError: true)
                model.put("status", "success")
                model.put("message", mensagemService.getMensagem("default.success.update"))
                return model
            } catch(Exception e) {
                println(e)
                model.put("status", "error")
                model.put("message", mensagemService.getMensagem("default.error"))
                return model
            }
        } else {
            model.put("status", "error")
            model.put("message", mensagemService.getMensagem("default.error"))
            return model
        }
    }

    Map delete(id) {
        Map model = [:]

        Cardapio cardapio = Cardapio.get(id)

        if (cardapio) {
            try {
                cardapio.delete(flush: true, failOnError: true)
                model.put("status", "success")
                model.put("message", mensagemService.getMensagem("default.success.delete"))
                return model
            } catch(Exception e) {
                println(e)
                model.put("status", "error")
                model.put("message", mensagemService.getMensagem("default.error"))
                return model
            }
        }

        model.put("status", "error")
        model.put("message", mensagemService.getMensagem("default.error"))
        return model
    }
}
