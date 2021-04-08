package restaurante

import grails.gorm.transactions.Transactional

@Transactional
class FuncionariosService {

    MensagemService mensagemService

    Map list(field, value) {
        Map model = [:]
        List<Funcionarios> entities = Funcionarios.list()
        model.put("columns", ["nome", "celular", "endereço", "função"])
        ArrayList<Funcionarios> filtro = []

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
            } else if (field == "função") {
                entities.each {entity ->
                    if (entity.funcao.toUpperCase().indexOf(value.toUpperCase()) > -1) {
                        filtro.add(entity)
                    }
                }
            }

            model.put("entities", filtro.size() > 0 ? filtro.sort { entity -> entity.nome.toUpperCase() } : entities)
            return model
        }

        model.put("entities", entities.sort{entity -> entity.nome.toUpperCase()})
        return model
    }

    Map save(paramaters) {
        Map model = [:]
        Funcionarios funcionario = Funcionarios.findByCelular(paramaters.celular)

        if (funcionario == null) {
            try {
                Funcionarios entity = new Funcionarios()
                entity.nome = paramaters.nome
                entity.celular = paramaters.celular
                entity.endereco = paramaters.endereco
                entity.funcao = paramaters.funcao
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
        Funcionarios funcionario
        funcionario = Funcionarios.get(paramaters.id)

        if (funcionario) {
            try {
                funcionario.nome = paramaters.nome
                funcionario.celular = paramaters.celular
                funcionario.endereco = paramaters.endereco
                funcionario.funcao = paramaters.funcao
                funcionario.save(flush: true, failOnError: true)
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

        Funcionarios funcionario = Funcionarios.get(id)

        if (funcionario) {
            try {
                funcionario.delete(flush: true, failOnError: true)
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
