"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Users, Building2 } from "lucide-react"
import { motion } from "framer-motion"

interface UserTypeSelectorProps {
  onTypeSelect: (type: string) => void
}

export default function UserTypeSelector({ onTypeSelect }: UserTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState("individual")

  const userTypes = [
    {
      id: "individual",
      title: "Pessoa Física",
      description: "Controle suas finanças pessoais",
      icon: <User className="size-6" />,
      color: "bg-blue-500",
    },
    {
      id: "family",
      title: "Família",
      description: "Gerencie o orçamento familiar",
      icon: <Users className="size-6" />,
      color: "bg-green-500",
    },
    {
      id: "business",
      title: "MEI/Empresa",
      description: "Organize as finanças do seu negócio",
      icon: <Building2 className="size-6" />,
      color: "bg-purple-500",
    },
  ]

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    onTypeSelect(type)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-4 text-center"
    >
      <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
        Personalização
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Qual é o seu perfil?</h2>
      <p className="max-w-[600px] text-muted-foreground md:text-lg mb-8">
        Selecione seu perfil para ver conteúdo personalizado e funcionalidades específicas para suas necessidades.
      </p>

      <div className="grid gap-6 md:grid-cols-3 w-full max-w-4xl">
        {userTypes.map((type) => (
          <motion.div key={type.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card
              className={`cursor-pointer transition-all duration-300 ${
                selectedType === type.id
                  ? "border-primary shadow-lg bg-primary/5"
                  : "border-border/40 hover:border-primary/50"
              }`}
              onClick={() => handleTypeSelect(type.id)}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`size-12 rounded-full ${type.color} flex items-center justify-center text-white mb-4 mx-auto`}
                >
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                <p className="text-muted-foreground">{type.description}</p>
                {selectedType === type.id && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-4">
                    <Button size="sm" className="rounded-full">
                      Selecionado
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
