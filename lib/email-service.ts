import nodemailer from "nodemailer"

// Em um ambiente de produção, você usaria um serviço de email real
// Para desenvolvimento, usamos um transporte de teste
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "ethereal.user@ethereal.email",
    pass: process.env.EMAIL_PASSWORD || "ethereal_password",
  },
})

export async function sendBudgetAlert(
  email: string,
  name: string,
  category: string,
  percentage: number,
  currentAmount: number,
  budgetAmount: number,
) {
  const subject = percentage >= 100 ? "Alerta: Orçamento Excedido" : "Alerta: Orçamento Próximo do Limite"

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">${subject}</h2>
      <p>Olá ${name},</p>
      <p>Este é um alerta sobre seu orçamento na categoria <strong>${category}</strong>.</p>
      
      <div style="background-color: ${
        percentage >= 100 ? "#FFEBEE" : "#FFF8E1"
      }; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0; font-size: 16px;">
          Você já utilizou <strong>${percentage.toFixed(1)}%</strong> do seu orçamento.
        </p>
        <p style="margin: 10px 0 0 0;">
          Gasto atual: R$ ${currentAmount.toFixed(2)}<br>
          Orçamento: R$ ${budgetAmount.toFixed(2)}
        </p>
      </div>
      
      <p>
        ${
          percentage >= 100
            ? "Seu orçamento foi excedido. Considere revisar seus gastos nesta categoria."
            : "Você está se aproximando do limite do seu orçamento. Considere monitorar seus gastos com mais atenção."
        }
      </p>
      
      <p>Acesse seu painel financeiro para mais detalhes e recomendações.</p>
      
      <p>Atenciosamente,<br>Equipe Flowers&Saints</p>
    </div>
  `

  try {
    const info = await transporter.sendMail({
      from: '"Flowers&Saints" <financeiro@flowerssaints.com>',
      to: email,
      subject,
      html,
    })

    console.log("Email enviado: %s", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return { success: false, error }
  }
}
