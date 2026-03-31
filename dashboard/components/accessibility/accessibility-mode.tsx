"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Accessibility, Eye, MousePointer, Settings, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AccessibilitySettings {
  highContrast: boolean
  fontSize: number
  reducedMotion: boolean
  simplifiedLayout: boolean
  colorBlindMode: "none" | "protanopia" | "deuteranopia" | "tritanopia"
  focusIndicators: boolean
  soundFeedback: boolean
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  fontSize: 16,
  reducedMotion: false,
  simplifiedLayout: false,
  colorBlindMode: "none",
  focusIndicators: true,
  soundFeedback: false,
}

export function AccessibilityMode() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("accessibility-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  useEffect(() => {
    // Apply settings to document
    applyAccessibilitySettings(settings)

    // Save to localStorage
    localStorage.setItem("accessibility-settings", JSON.stringify(settings))
  }, [settings])

  const applyAccessibilitySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement

    // High contrast
    if (settings.highContrast) {
      root.classList.add("accessibility-high-contrast")
    } else {
      root.classList.remove("accessibility-high-contrast")
    }

    // Font size
    root.style.setProperty("--accessibility-font-size", `${settings.fontSize}px`)

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add("accessibility-reduced-motion")
    } else {
      root.classList.remove("accessibility-reduced-motion")
    }

    // Simplified layout
    if (settings.simplifiedLayout) {
      root.classList.add("accessibility-simplified")
    } else {
      root.classList.remove("accessibility-simplified")
    }

    // Color blind mode
    root.classList.remove("accessibility-protanopia", "accessibility-deuteranopia", "accessibility-tritanopia")
    if (settings.colorBlindMode !== "none") {
      root.classList.add(`accessibility-${settings.colorBlindMode}`)
    }

    // Focus indicators
    if (settings.focusIndicators) {
      root.classList.add("accessibility-focus-indicators")
    } else {
      root.classList.remove("accessibility-focus-indicators")
    }
  }

  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  const playFeedbackSound = () => {
    if (settings.soundFeedback && "speechSynthesis" in window) {
      // Simple audio feedback using Web Speech API
      const utterance = new SpeechSynthesisUtterance("Configuração alterada")
      utterance.volume = 0.1
      utterance.rate = 2
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <>
      {/* Floating accessibility button */}
      <Button
        className="fixed bottom-4 left-4 z-50 rounded-full w-12 h-12 shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir configurações de acessibilidade"
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      {/* Accessibility panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Accessibility className="h-5 w-5" />
                      Acessibilidade
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Visual Settings */}
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Visual
                    </h3>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">Alto Contraste</label>
                      <Switch
                        checked={settings.highContrast}
                        onCheckedChange={(checked) => {
                          updateSetting("highContrast", checked)
                          playFeedbackSound()
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm">Tamanho da Fonte</label>
                      <Slider
                        value={[settings.fontSize]}
                        onValueChange={([value]) => {
                          updateSetting("fontSize", value)
                          playFeedbackSound()
                        }}
                        min={12}
                        max={24}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-xs text-muted-foreground">{settings.fontSize}px</div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm">Modo Daltônico</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: "none", label: "Nenhum" },
                          { value: "protanopia", label: "Protanopia" },
                          { value: "deuteranopia", label: "Deuteranopia" },
                          { value: "tritanopia", label: "Tritanopia" },
                        ].map((option) => (
                          <Button
                            key={option.value}
                            variant={settings.colorBlindMode === option.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              updateSetting("colorBlindMode", option.value as any)
                              playFeedbackSound()
                            }}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Motion Settings */}
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <MousePointer className="h-4 w-4" />
                      Movimento
                    </h3>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">Movimento Reduzido</label>
                      <Switch
                        checked={settings.reducedMotion}
                        onCheckedChange={(checked) => {
                          updateSetting("reducedMotion", checked)
                          playFeedbackSound()
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">Layout Simplificado</label>
                      <Switch
                        checked={settings.simplifiedLayout}
                        onCheckedChange={(checked) => {
                          updateSetting("simplifiedLayout", checked)
                          playFeedbackSound()
                        }}
                      />
                    </div>
                  </div>

                  {/* Interaction Settings */}
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Interação
                    </h3>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">Indicadores de Foco</label>
                      <Switch
                        checked={settings.focusIndicators}
                        onCheckedChange={(checked) => {
                          updateSetting("focusIndicators", checked)
                          playFeedbackSound()
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">Feedback Sonoro</label>
                      <Switch
                        checked={settings.soundFeedback}
                        onCheckedChange={(checked) => {
                          updateSetting("soundFeedback", checked)
                          if (checked) playFeedbackSound()
                        }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={resetSettings} className="flex-1 bg-transparent">
                      Restaurar Padrão
                    </Button>
                    <Button onClick={() => setIsOpen(false)} className="flex-1">
                      Aplicar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
