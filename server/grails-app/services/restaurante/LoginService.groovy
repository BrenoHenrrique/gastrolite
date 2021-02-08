package restaurante

import grails.gorm.transactions.Transactional

@Transactional
class LoginService {

    Login validate(nome, senha) {
        return Login.findByNomeAndSenha(nome, senha)
    }
}
