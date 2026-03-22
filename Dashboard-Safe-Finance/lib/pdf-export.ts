import { formatDataForPDF } from "./export-utils"
import { toast } from "@/components/ui/use-toast"

// Função para carregar a biblioteca jsPDF dinamicamente
async function loadJsPDF() {
  try {
    // Importação dinâmica da biblioteca jsPDF
    const jsPDFModule = await import("jspdf")
    const autoTableModule = await import("jspdf-autotable")

    const jsPDF = jsPDFModule.default
    const doc = new jsPDF()

    // Adiciona o plugin autotable ao jsPDF
    autoTableModule.default(doc)

    return doc
  } catch (error) {
    console.error("Erro ao carregar jsPDF:", error)
    toast({
      title: "Erro ao carregar biblioteca",
      description: "Não foi possível carregar a biblioteca de exportação PDF",
      variant: "destructive",
    })
    throw error
  }
}

// Função para exportar dados para PDF
export async function exportToPDF<T extends Record<string, any>>(
  data: T[],
  headers: { [key in keyof T]?: string },
  title: string,
  filename: string,
  dateFields: (keyof T)[] = [],
  orientation: "portrait" | "landscape" = "portrait",
): Promise<void> {
  try {
    // Carregar jsPDF dinamicamente
    const doc = await loadJsPDF()

    // Configurar orientação
    if (orientation === "landscape") {
      doc.setPage("landscape")
    }

    // Adicionar título
    doc.setFontSize(18)
    doc.text(title, 14, 22)

    // Adicionar data
    doc.setFontSize(11)
    doc.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, 14, 30)

    // Formatar dados para a tabela
    const { headers: headerArray, rows: rowsArray } = formatDataForPDF(data, headers, dateFields)

    // Criar tabela
    ;(doc as any).autoTable({
      head: [headerArray],
      body: rowsArray,
      startY: 40,
      headStyles: {
        fillColor: [80, 200, 168], // Verde Safe Finance
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      margin: { top: 40 },
    })

    // Adicionar rodapé
    const pageCount = (doc as any).internal.getNumberOfPages()
    doc.setFontSize(10)

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.text(
        `Safe Finance - Página ${i} de ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" },
      )
    }

    // Salvar o PDF
    doc.save(`${filename}.pdf`)
  } catch (error) {
    console.error("Erro ao exportar para PDF:", error)
    throw error
  }
}
