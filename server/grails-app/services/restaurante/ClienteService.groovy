package restaurante

import grails.gorm.transactions.Transactional

@Transactional
class ClienteService {

    MensagemService mensagemService

    Map list(field, value) {
        Map model = [:]
        List<Cliente> entities = Cliente.list()
        model.put("columns", ["nome", "celular", "endereço", "referência"])
        ArrayList<Cliente> filtro = []

        if (field) {
            if (field == "nome") {
                entities.each {entity ->
                    if (entity.nome.toUpperCase().indexOf(value.toUpperCase()) > -1) {
                        filtro.add(entity)
                    }
                }
            } else if (field == "celular") {
                entities.each {entity ->
                    if (entity.celular.indexOf(value) > -1) {
                        filtro.add(entity)
                    }
                }
            } else if (field == "endereço") {
                entities.each {entity ->
                    if (entity.endereco.toUpperCase().indexOf(value.toUpperCase()) > -1) {
                        filtro.add(entity)
                    }
                }
            } else if (field == "referência") {
                entities.each {entity ->
                    if (entity.referencia.toUpperCase().indexOf(value.toUpperCase()) > -1) {
                        filtro.add(entity)
                    }
                }
            }

            if (filtro.size() > 1) {
                Object item
                if (filtro[0].nome && filtro[0].endereco) {
                    item = filtro[0]
                    filtro.clear()
                    filtro.add(item)
                } else {
                    item = filtro[1]
                    filtro.clear()
                    filtro.add(item)
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
        Cliente cliente = Cliente.findByCelular(paramaters.celular)

        if (cliente == null) {
            try {
                Cliente entity = new Cliente()
                entity.nome = paramaters.nome
                entity.celular = paramaters.celular
                entity.endereco = paramaters.endereco
                entity.referencia = paramaters.referencia
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
        Cliente cliente
        cliente = Cliente.get(paramaters.id)

        if (cliente) {
            try {
                cliente.nome = paramaters.nome
                cliente.celular = paramaters.celular
                cliente.endereco = paramaters.endereco
                cliente.referencia = paramaters.referencia
                cliente.save(flush: true, failOnError: true)
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

        Cliente cliente = Cliente.get(id)

        if (cliente) {
            try {
                cliente.delete(flush: true, failOnError: true)
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
