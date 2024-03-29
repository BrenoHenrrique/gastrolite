package restaurante

import enums.TipoDePagamento

import java.sql.Date
import java.text.NumberFormat
import java.text.SimpleDateFormat
import javax.print.DocFlavor
import javax.print.DocPrintJob
import javax.print.PrintException
import javax.print.PrintService
import javax.print.PrintServiceLookup
import javax.print.SimpleDoc
import javax.print.attribute.HashPrintRequestAttributeSet
import javax.print.attribute.PrintRequestAttributeSet
import javax.print.attribute.standard.JobName
import javax.print.attribute.standard.MediaSizeName
import javax.print.attribute.standard.OrientationRequested

class ImprimirController {

    DashboardService dashboardService

    def imprimir() {
        params.putAll(request.JSON as Map)

        Map model = [:]
        List arrayParametros = []
        String parametros

        BigDecimal total = 0
        BigDecimal pago = params.pago as BigDecimal
        BigDecimal taxa = params.taxa as BigDecimal

        try {
            VendaRapida venda = VendaRapida.findByIdVenda(params.idVenda)
            Entrega entrega = Entrega.findByIdEntrega(params.idVenda)

            def entidade = params.tipo == "vendaRapida" ? venda : entrega

            if (entidade) {

                def produtos

                if (params.tipo == "vendaRapida") {
                    produtos = VendaRapidaProdutos.findAllByVendaRapida(entidade)
                } else {
                    produtos = EntregaProdutos.findAllByEntrega(entidade)
                }

                if (produtos.size()) {
                    String nomeProduto
                    String quantProd
                    String valorProd

                    produtos.eachWithIndex { Object entry, Integer index ->
                        Cardapio cardapio = Cardapio.get(entry.cardapioId)
                        nomeProduto = cardapio.nome
                        quantProd = entry.quantidade
                        valorProd = cardapio.preco
                        total = total + (Float.parseFloat(entry.quantidade) * Float.parseFloat(cardapio.preco))

                        if (nomeProduto.length() > 26) {
                            nomeProduto = nomeProduto.substring(0, 26)

                            parametros = nomeProduto.toString().toUpperCase() + "  RS" + valorProd + "     " + quantProd + "  " + "\n\r"

                            arrayParametros.add(parametros)

                        } else {
                            nomeProduto = (String.format("%-26s", nomeProduto))
                            nomeProduto = nomeProduto.substring(0, 26)

                            parametros = nomeProduto.toString().toUpperCase() + " RS" + valorProd + "     " + quantProd + "  " + "\n\r"

                            arrayParametros.add(parametros)
                        }
                    }

                    String itens = ""
                    arrayParametros.each { Object entry ->
                        itens = itens + entry.toString().replace("[", "").replace("]", "")
                    }

                    String observacoes = params?.observacoes?.toString()?.toUpperCase()

                    Object objetoCliente = params?.cliente

                    Cliente cliente = Cliente.findByCelular(params.tipo != "vendaRapida" ? objetoCliente?.celular : "")

                    if (!cliente && params.tipo != "vendaRapida") {
                        Cliente.withTransaction {
                            Cliente novoCliente = new Cliente()
                            novoCliente.nome = objetoCliente.nome.toString().toUpperCase()
                            novoCliente.celular = objetoCliente.celular
                            novoCliente.endereco = objetoCliente.endereco.toString().toUpperCase()
                            novoCliente.referencia = objetoCliente.referencia.toString().toUpperCase()
                            novoCliente.save(flush: true)
                        }
                    }

                    String dadosCliente = params.tipo != "vendaRapida" ?
                            "               DADOS DO CLIENTE              \n\r" +
                                    "---------------------------------------------\n\r" +
                                    "      NOME: ${objetoCliente.nome.toString().toUpperCase()}            \n\r" +
                                    "   CELULAR: ${objetoCliente.celular.toString().toUpperCase()}         \n\r" +
                                    "  ENDERECO: ${objetoCliente.endereco.toString().toUpperCase()}        \n\r" +
                                    "REFERENCIA: ${objetoCliente.referencia.toString().toUpperCase()}          "
                            : "CLIENTE: ${params.cliente.toString().toUpperCase()}"

                    String pagamento = params.tipo != "vendaRapida" ?
                            "TIPO PAGAMENTO: ${params.tipoPagamento} \n\r" +
                                    "VALOR PRODUTOS: ${total} \n\r" +
                                    "TAXA ENTREGA: ${taxa} \n\r" +
                                    "RECEBIDO: ${pago} \n\r" +
                                    "TROCO: ${pago - (total + taxa)} \n\r" +
                                    "==============\n\r" +
                                    "TOTAL COMPRA: ${total + taxa} \n\r"
                            : "VALOR TOTAL: " + total

                    String bairro = "BAIRRO: ${params.bairro}"

                    String tipoDeVenda = params.tipo == "entrega" ? bairro : "RETIRADA NA LOJA"

                    String data = new SimpleDateFormat("dd/MM/yyyy").format(new Date(System.currentTimeMillis()))
                    String hora = new SimpleDateFormat("HH:mm").format(new Date(System.currentTimeMillis()))

                    String dadosCupom =
                            "              POPO LANCHES                   \n\r" +
                                    "DATA: ${data} AS ${hora}                     \n\r" +
                                    "ENDERECO:RUA 11 RESIDENCIAL MARACANAU/CAGAADO\n\r" +
                                    "N 28A                                        \n\r" +
                                    "CELULAR: (85) 98726 4195 / (85) 98631 5889   \n\r" +
                                    "---------------------------------------------\n\r" +
                                    "               CUPOM NAO FISCAL              \n\r" +
                                    "---------------------------------------------\n\r" +
                                    "                LISTA DE ITENS               \n\r" +
                                    "---------------------------------------------\n\r" +
                                    "DESCRICAO                  PRECO      QT     \n\r" +
                                    "${itens}                                     \n\r" +
                                    "---------------------------------------------\n\r" +
                                    "OBSERVACOES: ${observacoes ?: ""}            \n\r" +
                                    "---------------------------------------------\n\r" +
                                    "${dadosCliente}                              \n\r" +
                                    "---------------------------------------------\n\r" +
                                    "               DADOS DA VENDA                \n\r" +
                                    "---------------------------------------------\n\r" +
                                    "${tipoDeVenda}                               \n\r" +
                                    "---------------------------------------------\n\r" +
                                    "${pagamento}                                 \n\r" +
                                    "---------------------------------------------\n\r" +
                                    "OBS:SO E FEITA A TROCA COM ESTE CUPOM EM MAOS\n\r" +
                                    "---------------------------------------------\n\r" +
                                    "          OBRIGADO PELA PREFERENCIA!         \n\r" +
                                    "\n\r \n\r \n\r \n\r \n\r \n\r \n\r \n\r \n\r \n\r\f"

                    for (int i = 0; i < 2; i++) {
                        if (params.tipo == "entrega") {
                            impressaoCupom(dadosCupom)
                        } else {
                            impressaoCupom(dadosCupom)
                            break
                        }
                    }
                }
            }
            arrayParametros.clear()
            model.put("status", "success")
            model.put("message", "Impresso com sucesso!")
            respond model
        } catch (Exception ex) {
            ex.printStackTrace()
            model.put("status", "error")
            model.put("message", "Erro ao imprimir tente novamente. Se persistir entre em contato com o administrador.")
            respond model
        }
    }

    def imprimirGanhosHoje() {
        Map model = [:]

        Long incPix = 0
        Long incCartao = 0
        Long incDinheiro = 0
        Long qtdEntregas = 0
        Long qtdVendasRapida = 0
        BigDecimal valorEntregas = 0
        BigDecimal valorVendaRapida = 0
        BigDecimal valorPix = 0
        BigDecimal valorCartao = 0
        BigDecimal valorDinheiro = 0

        try {
            List<Pagamento> pagamentos = dashboardService.getVendasHoje()

            pagamentos.forEach {
                if (it.tipoDePagamento == TipoDePagamento.PIX) {
                    incPix += 1
                    valorPix += it.total
                }
                if (it.tipoDePagamento == TipoDePagamento.CARTAO) {
                    incCartao += 1
                    valorCartao += it.total
                }
                if (it.tipoDePagamento == TipoDePagamento.DINHEIRO) {
                    incDinheiro += 1
                    valorDinheiro += it.total
                }
                if (it.entrega) {
                    qtdEntregas += 1
                    valorEntregas += it.total
                }
                if (it.vendaRapida) {
                    qtdVendasRapida += 1
                    valorVendaRapida += it.total
                }
            }

            Long totalIncVenda = incPix + incCartao + incDinheiro
            BigDecimal totalValorVenda = valorPix + valorCartao + valorDinheiro
            BigDecimal gastosHoje = dashboardService.getGastosHoje().sum{it.valor}

            String data = new SimpleDateFormat("dd/MM/yyyy").format(new Date(System.currentTimeMillis()))
            String hora = new SimpleDateFormat("HH:mm").format(new Date(System.currentTimeMillis()))

            String dadosCupom = "             FECHAMENTO DE CAIXA         \n\r\n\r" +
                    " DATA: $data AS $hora                        \n\r" +
                    "---------------------------------------------\n\r" +
                    "            VENDAS POR PAGAMENTO             \n\r" +
                    "---------------------------------------------\n\r" +
                    " QTD. PIX: $incPix VENDAS                    \n\r" +
                    " VALOR PIX: ${NumberFormat.getCurrencyInstance().format(valorPix)}\n\r" +
                    " QTD. CARTAO: $incCartao VENDAS              \n\r" +
                    " VALOR CARTAO: ${NumberFormat.getCurrencyInstance().format(valorCartao)}\n\r" +
                    " QTD. DINHEIRO: $incDinheiro VENDAS          \n\r" +
                    " VALOR DINHEIRO: ${NumberFormat.getCurrencyInstance().format(valorDinheiro)}\n\r" +
                    " ==============================              \n\r" +
                    " TOTAL QTD. VENDAS: $totalIncVenda     \n\r" +
                    " TOTAL VALOR VENDAS: ${NumberFormat.getCurrencyInstance().format(totalValorVenda)}\n\r" +
                    "---------------------------------------------\n\r" +
                    "               VENDAS POR TIPO               \n\r" +
                    "---------------------------------------------\n\r" +
                    " VENDAS TIPO ENTREGA: $qtdEntregas           \n\r" +
                    " VALOR TIPO ENTREGA: ${NumberFormat.getCurrencyInstance().format(valorEntregas)}\n\r" +
                    " VENDAS TIPO VENDA RAPIDA: $qtdVendasRapida  \n\r" +
                    " VALOR TIPO VENDA RAPIDA: ${NumberFormat.getCurrencyInstance().format(valorVendaRapida)}\n\r" +
                    " ==============================              \n\r" +
                    " VALOR TOTAL VENDAS: ${NumberFormat.getCurrencyInstance().format(totalValorVenda)}\n\r" +
                    "---------------------------------------------\n\r" +
                    "                 SALDO DO DIA                \n\r" +
                    "---------------------------------------------\n\r" +
                    " LUCRO HOJE: ${NumberFormat.getCurrencyInstance().format(totalValorVenda)}\n\r" +
                    " GASTOS HOJE: ${NumberFormat.getCurrencyInstance().format(gastosHoje)}\n\r" +
                    " ==============================              \n\r" +
                    " SALDO HOJE: ${NumberFormat.getCurrencyInstance().format(totalValorVenda - gastosHoje)}\n\r"
                    "---------------------------------------------\n\r" +
                    "\n\r \n\r \n\r \n\r \n\r \n\r \n\r \n\r \n\r \n\r\f"

            impressaoCupom(dadosCupom)
            model.put("status", "success")
            model.put("message", "Impresso com sucesso!")
            respond model
        } catch (Exception ex) {
            ex.printStackTrace()
            model.put("status", "error")
            model.put("message", "Erro ao imprimir tente novamente. Se persistir entre em contato com o administrador.")
            respond model
        }
    }

    def impressaoCupom(String dados) {
        println(dados)
        try {
            InputStream prin = new ByteArrayInputStream(dados.getBytes())
            DocFlavor docFlavor = DocFlavor.INPUT_STREAM.AUTOSENSE
            SimpleDoc documentoTexto = new SimpleDoc(prin, docFlavor, null)
            PrintService impressora = PrintServiceLookup.lookupDefaultPrintService()
            PrintRequestAttributeSet printerAttrinutes = new HashPrintRequestAttributeSet()
            printerAttrinutes.add(new JobName("Impressão", null))
            printerAttrinutes.add(OrientationRequested.PORTRAIT)
            printerAttrinutes.add(MediaSizeName.ISO_A4)
            DocPrintJob printJob = impressora.createPrintJob()
            try {
                printJob.print(documentoTexto, (PrintRequestAttributeSet) printerAttrinutes)
            } catch (PrintException e) {
                e.printStackTrace()
            }
            prin.close()
        } catch (Exception ex) {
            ex.printStackTrace()
        }
    }
}
