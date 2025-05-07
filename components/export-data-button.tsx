"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileText, Loader2, Table } from "lucide-react"
import { convertToCSV, downloadCSV, generateFileName } from "@/lib/export-utils"
import { toast } from "@/components/ui/use-toast"

interface ExportDataButtonProps<T extends Record<string, any>> {
  data: T[]
  headers: { [key in keyof T]?: string }
  dateFields?: (keyof T)[]
  filename: string
  label?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
  onExportPDF?: () => Promise<void>
  className?: string
}

export function ExportDataButton<T extends Record<string, any>>({
  data,
  headers,
  dateFields = [],
  filename,
  label = "Exportar",
  variant = "outline",
  size = "sm",
  disabled = false,
  onExportPDF,
  className,
}: ExportDataButtonProps<T>) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExportCSV = () => {
    try {
      setIsExporting(true)
      const csvContent = convertToCSV(data, headers, dateFields)
      const fileName = generateFileName(filename, "csv")
      downloadCSV(csvContent, fileName)
      toast({
        title: "Exportação concluída",
        description: `Os dados foram exportados para ${fileName}`,
      })
    } catch (error) {
      console.error("Erro ao exportar CSV:", error)
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar os dados para CSV",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportPDF = async () => {
    if (!onExportPDF) {
      toast({
        title: "Funcionalidade não disponível",
        description: "A exportação para PDF não está disponível para este relatório",
        variant: "destructive",
      })
      return
    }

    try {
      setIsExporting(true)
      await onExportPDF()
      toast({
        title: "Exportação concluída",
        description: `Os dados foram exportados para PDF`,
      })
    } catch (error) {
      console.error("Erro ao exportar PDF:", error)
      toast({
        title: "Erro na exportação",
        description: "Não foi possível exportar os dados para PDF",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  if (isExporting) {
    return (
      <Button variant={variant} size={size} disabled className={className}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Exportando...
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} disabled={disabled} className={className}>
          <Download className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportCSV}>
          <Table className="mr-2 h-4 w-4" />
          Exportar para CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPDF}>
          <FileText className="mr-2 h-4 w-4" />
          Exportar para PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
