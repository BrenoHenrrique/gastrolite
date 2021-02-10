package restaurante

import grails.gorm.transactions.Transactional

@Transactional
class LoginService {

    Login validate(nome, senha) {
        Login entity = Login.findByNomeAndSenha(nome, senha)
        return entity
//        if (entity) {
//
//        } else {
//
//        }
    }
}
