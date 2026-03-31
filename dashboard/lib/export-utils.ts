/**
 * Utilitários para exportação de dados em diferentes formatos
 */

// Função para converter dados para CSV
export function convertToCSV<T extends Record<string, any>>(
  data: T[],
  headers: { [key in keyof T]?: string },
  dateFields: (keyof T)[] = [],
): string {
  if (!data.length) return ""

  // Criar cabeçalhos
  const headerRow = Object.entries(headers)
    .map(([_, label]) => `"${label}"`)
    .join(",")

  // Criar linhas de dados
  const rows = data.map((item) => {
    return Object.keys(headers)
      .map((key) => {
        let value = item[key]

        // Formatar datas
        if (dateFields.includes(key as keyof T) && value) {
          value = new Date(value).toLocaleDateString("pt-BR")
        }

        // Formatar valores numéricos
        if (typeof value === "number") {
          return value.toString().replace(".", ",")
        }

        // Escapar strings com aspas
        if (typeof value === "string") {
          return `"${value.replace(/"/g, '""')}"`
        }

        return value === null || value === undefined ? '""' : `"${value}"`
      })
      .join(",")
  })

  return [headerRow, ...rows].join("\n")
}

// Função para baixar arquivo CSV
export function downloadCSV(csvContent: string, fileName: string): void {
  const blob = new Blob(["\ufeff", csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", fileName)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Função para formatar dados para PDF
export function formatDataForPDF<T extends Record<string, any>>(
  data: T[],
  headers: { [key in keyof T]?: string },
  dateFields: (keyof T)[] = [],
): { headers: string[]; rows: string[][] } {
  const headerArray = Object.entries(headers).map(([_, label]) => label)
  const keys = Object.keys(headers)

  const rowsArray = data.map((item) => {
    return keys.map((key) => {
      let value = item[key]

      // Formatar datas
      if (dateFields.includes(key as keyof T) && value) {
        value = new Date(value).toLocaleDateString("pt-BR")
      }

      // Formatar valores numéricos
      if ((typeof value === "number" && key.includes("amount")) || key.includes("valor")) {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(value)
      }

      return value === null || value === undefined ? "" : String(value)
    })
  })

  return { headers: headerArray, rows: rowsArray }
}

// Função para gerar nome de arquivo com timestamp
export function generateFileName(baseName: string, extension: string): string {
  const date = new Date()
  const timestamp = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}_${date.getHours().toString().padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}`
  return `${baseName}_${timestamp}.${extension}`
}
