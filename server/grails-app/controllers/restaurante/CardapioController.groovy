package restaurante

class CardapioController {
	
    def index() {
        Map model = [:]

        ArrayList<Cardapio> entities = Cardapio.list()

        model.put("columns", ["id", "nome", "preço"])
        model.put("entities", entities.sort{entity -> entity.nome})

        respond model
    }
}
