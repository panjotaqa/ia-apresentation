"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EvolutionCodeSmellDemo } from "@/components/ui/slide-cn/evolution-code-smell-demo"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"

const topicDescription =
  "Código em produção que funciona, mas acumula débito: números mágicos, métodos longos e comentários redundantes. A IA ajuda a refatorar sem mudar o comportamento observável."

const capabilities = [
  "Listar code smells com impacto em manutenção e testes",
  "Refatorar com constantes e métodos privados",
  "Validar que a suíte de regressão continua verde",
]

export function EvolutionCodeSmellSlide() {
  return (
    <HeaderWithContent className="h-full min-h-0 gap-4 md:gap-6">
      <HeaderWithContent.Header className="shrink-0 text-2xl md:text-4xl lg:text-5xl">
        <span className="text-orange-600 dark:text-orange-400">04.1</span>
        <span className="text-muted-foreground"> · </span>
        Code smells com IA
      </HeaderWithContent.Header>
      <HeaderWithContent.Content className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <HorizontalSplit ratio={0.27} className="min-h-0 flex-1 items-stretch">
          <HorizontalSplit.Left className="flex min-h-0 flex-col gap-4 overflow-y-auto pr-0 md:pr-6">
            <div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                O tópico
              </h2>
              <p className="text-base leading-relaxed">{topicDescription}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                O que o chat faz
              </h3>
              <ul className="flex flex-col gap-2 text-base">
                {capabilities.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-orange-600 dark:text-orange-400">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="bg-card" size="sm">
              <CardHeader className="gap-2">
                <CardTitle className="text-lg font-semibold">
                  Papel do QA
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  A IA propõe refatoração — você valida que regras de negócio e
                  testes não regrediram. Refatorar sem regressão é evolução
                  responsável.
                </CardDescription>
              </CardHeader>
            </Card>
          </HorizontalSplit.Left>
          <HorizontalSplit.Right className="flex h-full max-h-full min-h-0 w-full flex-col">
            <EvolutionCodeSmellDemo />
          </HorizontalSplit.Right>
        </HorizontalSplit>
      </HeaderWithContent.Content>
    </HeaderWithContent>
  )
}
