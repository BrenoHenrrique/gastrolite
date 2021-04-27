package restaurante

import java.sql.Date
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
                    arrayParametros.each{Object entry ->
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
                            "             DADOS DO COMPROVANTE            \n\r" +
                            "---------------------------------------------\n\r" +
                            "      NOME: ${objetoCliente.nome.toString().toUpperCase()}            \n\r" +
                            "   CELULAR: ${objetoCliente.celular.toString().toUpperCase()}         \n\r" +
                            "  ENDERECO: ${objetoCliente.endereco.toString().toUpperCase()}        \n\r" +
                            "REFERENCIA: ${objetoCliente.referencia.toString().toUpperCase()}          " : ""


                    String pagamentoVendaRapida = "VALOR TOTAL: " + total + "\n\r"

                    String pagamentoEntrega = params.tipo != "vendaRapida" ?
                         "VALOR PRODUTOS: ${total} \n\r" +
                           "TAXA ENTREGA: ${taxa} \n\r" +
                               "RECEBIDO: ${pago} \n\r" +
                                  "TROCO: ${pago - (total + taxa)} \n\r" +
                         "==============\n\r" +
                           "TOTAL COMPRA: ${total + taxa} \n\r" : ""

                    String data = new SimpleDateFormat("dd/MM/yyyy").format(new Date(System.currentTimeMillis()))
                    String hora = new SimpleDateFormat("HH:mm").format(new Date(System.currentTimeMillis()))

                    impressaoCupom("                POPO LANCHES \n\r"
                                 + "DATA: ${data} AS ${hora} \n\r"
                                 + "ENDERECO:RUA 11 RESIDENCIAL MARACANAU/CAGAADO\n\r"
                                 + "N 28A\n\r"
                                 + "CELULAR: (85) 98726 4195 / (85) 98631 5889   \n\r"
                                 + "---------------------------------------------\n\r"
                                 + "               CUPOM NAO FISCAL              \n\r"
                                 + "---------------------------------------------\n\r"
                                 + "                LISTA DE ITENS               \n\r"
                                 + "---------------------------------------------\n\r"
                                 + "DESCRICAO                  PRECO      QT     \n\r"
                                 + "${itens}                                     \n\r"
                                 + "---------------------------------------------\n\r"
                                 + "OBSERVACOES: ${observacoes ?: ""}           \n\r"
                                 + "---------------------------------------------\n\r"
                                 + "${params.tipo != "vendaRapida" ? dadosCliente : "CLIENTE: ${params.cliente}"}         \n\r"
                                 + "---------------------------------------------\n\r"
                                 + "             DADOS DO COMPROVANTE            \n\r"
                                 + "---------------------------------------------\n\r"
                                 + "${params.tipo == "vendaRapida" ? pagamentoVendaRapida : pagamentoEntrega}"
                                 + "---------------------------------------------\n\r"
                                 + "OBS:SO E FEITA A TROCA COM ESTE CUPOM EM MAOS\n\r"
                                 + "---------------------------------------------\n\r"
                                 + "          OBRIGADO PELA PREFERENCIA!         \n\r"
                                 + "\n\r \n\r \n\r \n\r \n\r \n\r \n\r \n\r \n\r \n\r\f"
                    )
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
