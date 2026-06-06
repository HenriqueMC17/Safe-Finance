"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { useLocale } from "@/shared/contexts/locale-context"
import { Skeleton } from "@/shared/ui/skeleton"
import { ExportDataButton } from "@/features/data-export/components/export-data-button"
import { exportToPDF } from "@/shared/lib/pdf-export"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

interface Transaction {
  id: string | number
  account_id?: string | number
  description: string
  amount: number
  type: string
  category: string
  date: string | number
}

interface RealTransactionsProps {
  userId: string | number
}

export function RealTransactions({ userId }: RealTransactionsProps) {
  const { formatCurrency } = useLocale()
  
  // Buscar no convex diretamente
  const transactionsRaw = useQuery(api.transactions.list, { 
    userId: userId as Id<"users">
  })
  
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    if (transactionsRaw) {
      const formatted = transactionsRaw.map((v) => ({
        id: v._id,
        account_id: v.account_id,
        description: v.description,
        amount: v.amount,
        type: v.type,
        category: v.category || "Geral",
        date: v.date
      }));
      setTransactions(formatted)
      setFilteredTransactions(formatted)
    }
  }, [transactionsRaw])


  useEffect(() => {
    let result = transactions

    // Filtrar por termo de busca
    if (searchTerm) {
      result = result.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por categoria
    if (categoryFilter !== "all") {
      result = result.filter((transaction) => transaction.category === categoryFilter)
    }

    // Filtrar por tipo
    if (typeFilter !== "all") {
      result = result.filter((transaction) => transaction.type === typeFilter)
    }

    setFilteredTransactions(result)
  }, [searchTerm, categoryFilter, typeFilter, transactions])

  const formatDate = (dateString: string | number) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("pt-BR").format(date)
  }

  const getUniqueCategories = () => {
    const categories = new Set(transactions.map((transaction) => transaction.category))
    return Array.from(categories)
  }

  // Função para exportar transações para PDF
  const handleExportPDF = async () => {
    const headers = {
      description: "Descrição",
      amount: "Valor",
      type: "Tipo",
      category: "Categoria",
      date: "Data",
    }

    await exportToPDF(
      filteredTransactions,
      headers,
      "Relatório de Transações",
      "transacoes_safe_finance",
      ["date"],
      "landscape",
    )
  }

  const isLoading = transactionsRaw === undefined;
  const error = null; // Tratamento de erro ideal via ErrorBoundary no app Convex

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium">Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Transações Recentes</CardTitle>
        <ExportDataButton
          data={filteredTransactions}
          headers={{
            description: "Descrição",
            amount: "Valor",
            type: "Tipo",
            category: "Categoria",
            date: "Data",
          }}
          dateFields={["date"]}
          filename="transacoes_safe_finance"
          label="Exportar"
          onExportPDF={handleExportPDF}
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="search">Buscar</Label>
              <Input
                id="search"
                placeholder="Buscar transações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {getUniqueCategories().map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="credit">Receita</SelectItem>
                  <SelectItem value="debit">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Nenhuma transação encontrada com os filtros atuais.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell className={transaction.type === "credit" ? "text-green-600" : "text-red-600"}>
                        {transaction.type === "credit" ? "+" : "-"}
                        {formatCurrency(Number(transaction.amount))}
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
