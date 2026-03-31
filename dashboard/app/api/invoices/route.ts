import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { invoices, payments } from "@/lib/schema"
import { eq, desc, and, gte, lte } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    if (!userId) {
      return NextResponse.json({ error: "ID do usuário é obrigatório" }, { status: 400 })
    }

    const conditions = [eq(invoices.user_id, Number.parseInt(userId))]

    // Filtrar por status se especificado
    if (status && status !== "all") {
      conditions.push(eq(invoices.status, status))
    }

    // Filtrar por período se especificado
    if (startDate && endDate) {
      conditions.push(
        and(gte(invoices.issue_date, startDate), lte(invoices.issue_date, endDate)) as any,
      )
    }

    const userInvoices = await db
      .select()
      .from(invoices)
      .where(and(...conditions))
      .orderBy(desc(invoices.due_date))

    // Buscar pagamentos relacionados
    const invoiceIds = userInvoices.map((inv: any) => inv.id)
    const relatedPayments =
      invoiceIds.length > 0 ? await db.select().from(payments).where(eq(payments.invoice_id, invoiceIds[0])) : []

    // Calcular estatísticas
    const totalAmount = userInvoices.reduce((sum: number, inv: any) => sum + Number(inv.amount), 0)
    const paidAmount = userInvoices
      .filter((inv: any) => inv.status === "paid")
      .reduce((sum: number, inv: any) => sum + Number(inv.amount), 0)
    const pendingAmount = userInvoices
      .filter((inv: any) => inv.status === "pending")
      .reduce((sum: number, inv: any) => sum + Number(inv.amount), 0)
    const overdueAmount = userInvoices
      .filter((inv: any) => inv.status === "overdue" || (inv.status === "pending" && new Date(inv.due_date) < new Date()))
      .reduce((sum: number, inv: any) => sum + Number(inv.amount), 0)

    return NextResponse.json({
      invoices: userInvoices,
      payments: relatedPayments,
      statistics: {
        total: totalAmount,
        paid: paidAmount,
        pending: pendingAmount,
        overdue: overdueAmount,
        count: userInvoices.length,
      },
    })
  } catch (error) {
    console.error("Erro ao buscar faturas:", error)
    return NextResponse.json({ error: "Erro ao buscar faturas" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, client, amount, issueDate, dueDate, description } = body

    if (!userId || !client || !amount || !issueDate || !dueDate) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 })
    }

    const newInvoice = await db
      .insert(invoices)
      .values({
        user_id: Number(userId),
        client,
        amount: String(amount),
        issue_date: issueDate,
        due_date: dueDate,
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning()

    return NextResponse.json({ invoice: newInvoice[0] })
  } catch (error) {
    console.error("Erro ao criar fatura:", error)
    return NextResponse.json({ error: "Erro ao criar fatura" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, status, client, amount, dueDate } = body

    if (!id) {
      return NextResponse.json({ error: "ID da fatura é obrigatório" }, { status: 400 })
    }

    const updateData: any = {
      updated_at: new Date(),
    }

    if (status) updateData.status = status
    if (client) updateData.client = client
    if (amount) updateData.amount = Number(amount)
    if (dueDate) updateData.due_date = dueDate

    const updatedInvoice = await db.update(invoices).set(updateData).where(eq(invoices.id, id)).returning()

    if (!updatedInvoice.length) {
      return NextResponse.json({ error: "Fatura não encontrada" }, { status: 404 })
    }

    return NextResponse.json({ invoice: updatedInvoice[0] })
  } catch (error) {
    console.error("Erro ao atualizar fatura:", error)
    return NextResponse.json({ error: "Erro ao atualizar fatura" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID da fatura é obrigatório" }, { status: 400 })
    }

    const deletedInvoice = await db
      .delete(invoices)
      .where(eq(invoices.id, Number.parseInt(id)))
      .returning()

    if (!deletedInvoice.length) {
      return NextResponse.json({ error: "Fatura não encontrada" }, { status: 404 })
    }

    return NextResponse.json({ message: "Fatura excluída com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir fatura:", error)
    return NextResponse.json({ error: "Erro ao excluir fatura" }, { status: 500 })
  }
}
