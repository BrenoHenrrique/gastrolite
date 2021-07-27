package restaurante

import grails.gorm.transactions.Transactional

@Transactional
class InsumosService {

    MensagemService mensagemService

    Map list(field, value) {
        Map model = [:]
        model.put("unidades", ["Caixa", "Pacote", "Frasco", "Refil", "g", "Kg", "mL", "L"])
        model.put("columns", ["nome", "unidade", "valor und.", "quantidade", "valor total"])

        List<Insumo> entities = Insumo.list()
        List<Insumo> filtro = []

        if (field) {
            if (field == "nome") {
                entities.each {entity ->
                    if (entity.nome.toUpperCase().indexOf(value.toUpperCase()) > -1) {
                        filtro.add(entity)
                    }
                }
            }

            model.put("entities", filtro.size() ? filtro.sort {it.nome} : entities)
            return model
        }

        model.put("entities", entities.sort{it.nome})
        return model
    }

    Map listDownStock(field, value) {
        Map model = [:]
        model.put("columns", ["nome", "valor und.", "qtd. baixa", "valor total", "data"])

        List<BaixaEstoque> entities = BaixaEstoque.list()
        List<BaixaEstoque> filtro = []

        if (field) {
            if (field == "nome") {
                entities.each {entity ->
                    if (entity.nome.toUpperCase().indexOf(value.toUpperCase()) > -1) {
                        filtro.add(entity)
                    }
                }
            } else if (field == "data") {
                entities.each { entity ->
                    if (entity.data <= value) {
                        filtro.add(entity)
                    }
                }
            }

            model.put("entities", filtro.size() ? filtro.sort {it.nome} : entities)
            return model
        }

        model.put("entities", entities.sort{it.nome})
        return model
    }

    Map save(paramaters) {
        Map model = [:]
        Insumo insumo = Insumo.findByNome(paramaters.nome)

        if (insumo == null) {
            try {
                Insumo entity = new Insumo()
                entity.nome = paramaters.nome
                entity.unidade = paramaters.unidade
                entity.valorUnidade = paramaters.valorUnidade
                entity.quantidade = paramaters.quantidade
                entity.valorTotal = paramaters.valorTotal
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
        model.put("message", mensagemService.getMensagem("insumo.error.save"))
        return model
    }

    Map update(paramaters) {
        Map model = [:]
        Insumo insumo = Insumo.get(paramaters.id)

        if (insumo) {
            try {
                insumo.nome = paramaters.nome
                insumo.unidade = paramaters.unidade
                insumo.valorUnidade = paramaters.valorUnidade
                insumo.quantidade = paramaters.quantidade
                insumo.valorTotal = paramaters.valorTotal
                insumo.save(flush: true, failOnError: true)

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
        Insumo insumo = Insumo.get(id)

        if (insumo) {
            try {
                insumo.delete(flush: true, failOnError: true)
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

    Map downStock(paramaters) {
        Map model = [:]
        BaixaEstoque novaBaixa = new BaixaEstoque()

        try {
            Insumo insumo = Insumo.get(paramaters.id)
            insumo.quantidade = insumo.quantidade - paramaters.quantidade
            insumo.save(flush: true, failOnError: true)

            novaBaixa.insumo = insumo
            novaBaixa.quantidade = paramaters.quantidade
            novaBaixa.valor = paramaters.valor
            novaBaixa.data = new Date()
            novaBaixa.save(flush: true, failOnError: true)

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
}
