package restaurante

import grails.gorm.transactions.Transactional

@Transactional
class LocaisService {

    MensagemService mensagemService

    Map list(field, value) {
        Map model = [:]
        List<Locais> entities = Locais.list()
        model.put("columns", ["nome", "taxa"])
        ArrayList<Locais> filtro = []

        if (field) {
            if (field == "nome") {
                entities.each { entity ->
                    if (entity.nome.toUpperCase().indexOf(value.toUpperCase()) > -1) {
                        filtro.add(entity)
                    }
                }
            } else if (field == "taxa") {
                entities.each { entity ->
                    if (entity.taxa.toString().indexOf(value) > -1) {
                        filtro.add(entity)
                    }
                }
            }
        }

        model.put("entities", filtro.size() ? filtro.sort { entity -> entity.nome.toUpperCase() } : entities)
        return model
    }

    Map save(paramaters) {
        Map model = [:]
        Locais locais = Locais.findByNome(paramaters.nome)

        if (locais == null) {
            try {
                Locais entity = new Locais()
                entity.nome = paramaters.nome
                entity.taxa = paramaters.taxa
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
        model.put("message", mensagemService.getMensagem("cliente.error.save"))
        return model
    }

    Map update(paramaters) {
        Map model = [:]
        Locais locais
        locais = Locais.get(paramaters.id)

        if (locais) {
            try {
                locais.nome = paramaters.nome
                locais.taxa = paramaters.taxa
                locais.save(flush: true, failOnError: true)
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

        Locais locais = Locais.get(id)

        if (locais) {
            try {
                locais.delete(flush: true, failOnError: true)
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
