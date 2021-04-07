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
        def paramaters = params.entities

        Map model = [:]
        List arrayParametros = []
        String parametros

        BigDecimal total = 0
        BigDecimal dinheiro = 0
        BigDecimal troco = 0
        BigDecimal pago = 0
        BigDecimal debito = 0
        BigDecimal credito = 0

        try {
            VendaRapida venda = VendaRapida.findByIdVenda(paramaters.idVenda)
            if (venda) {
                List<VendaRapidaProdutos> produtos = VendaRapidaProdutos.findAllByVendaRapida(venda)
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

                            parametros = nomeProduto + "  RS" + valorProd + "     " + quantProd + "  " + "\n\r"

                            arrayParametros.add(parametros)

                        } else {
                            nomeProduto = (String.format("%-26s", nomeProduto))
                            nomeProduto = nomeProduto.substring(0, 26)

                            parametros = nomeProduto + " RS" + valorProd + "     " + quantProd + "  " + "\n\r"

                            arrayParametros.add(parametros)
                        }
                    }

                    String pagamentoVendaRapida = """ VALOR TOTAL: ${total} \n\r"""

                    String pagamentoEntrega =
                            """ VALOR TOTAL: ${total} \n\r
                           DINHEIRO: ${dinheiro} \n\r
                            CREDITO: ${credito} \n\r
                             DEBITO: ${debito} \n\r
                           RECEBIDO: ${pago} \n\r
                              TROCO: ${troco} \n\r"""

                    String data = new SimpleDateFormat("dd/MM/yyyy").format(new Date(System.currentTimeMillis()))
                    String hora = new SimpleDateFormat("HH:mm").format(new Date(System.currentTimeMillis()))

                    impressaoCupom("""               POPO LANCHES              \n\r
                                        Data e Hora: data - hora\n\r
                                        Endereco:Rua 11 Residencial Maracanau/Cagaado\n\r
                                        N 28A\n\r"
                                        Celular: (85) 98726 4195 / (85) 98631 5889   \n\r
                                        ---------------------------------------------\n\r
                                                        CUPOM NAO FISCAL             \n\r
                                        ---------------------------------------------\n\r
                                                         LISTA DE ITENS              \n\r
                                        ---------------------------------------------\n\r
                                        DESCRICAO                     PRECO     QT   \n\r
                                        ${arrayParametros.toString().replace("[", "").replace("]", "")} \n\r
                                        ---------------------------------------------\n\r
                                        ${paramaters.tipo == "vendaRapida" ? pagamentoVendaRapida : pagamentoEntrega}
                                        ---------------------------------------------\n\r
                                        OBS:So e feita a troca de produtos com este
                                        cupom em maos.\n\r
                                        ---------------------------------------------\n\r
                                                   OBRIGADO PELA PREFERENCIA!        \n\r
                                        \n\r \n\r \n\r \n\r \n\r \n\r \n\r \n\r \n\r \n\r\f"""
                    )
                }
            }
            arrayParametros.clear()
            model.put("status", "success")
            model.put("message", "Impresso com sucesso!")
            respond model
        } catch (Exception ex) {
            ex.printStackTrace()
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
