package restaurante

class PagamentoController {

    PagamentoService pagamentoService

    def index() { }

    def save() {
        params.putAll(request.JSON as Map)
        def paramaters = params.entity

        respond pagamentoService.save(paramaters.idVenda, paramaters.tipo, paramaters?.tipoPagamento, paramaters?.taxa, paramaters?.pago)
    }
}
