"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EvolutionRegressionAiChat } from "@/components/ui/slide-cn/evolution-regression-ai-chat"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"

const topicDescription =
  "Antes de cada release, a IA cruza o change set com o repositório e a suíte existente: quais camadas quebram, quais testes rodar no mínimo e o que não pode ser pulado."

const capabilities = [
  "Absorver mudança de negócio e contexto do código",
  "Mapear impacto por camada (service, API, testes)",
  "Definir suíte mínima de regressão (CT-XX + HTTP)",
  "Consolidar riscos e critérios de sign-off",
]

export function EvolutionRegressionImpactSlide() {
  return (
    <HeaderWithContent className="h-full min-h-0 gap-4 md:gap-6">
      <HeaderWithContent.Header className="shrink-0 text-2xl md:text-4xl lg:text-5xl">
        <span className="text-orange-600 dark:text-orange-400">04.2</span>
        <span className="text-muted-foreground"> · </span>
        Impacto em regressão
      </HeaderWithContent.Header>
      <HeaderWithContent.Content className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <HorizontalSplit ratio={0.38} className="min-h-0 flex-1 items-stretch">
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
                  A IA acelera o mapa de impacto — priorização, ambiente e
                  sign-off continuam humanos. Use o chat como copiloto antes de
                  cada release em produção.
                </CardDescription>
              </CardHeader>
            </Card>
          </HorizontalSplit.Left>
          <HorizontalSplit.Right className="flex h-full max-h-full min-h-0 w-full flex-col">
            <EvolutionRegressionAiChat />
          </HorizontalSplit.Right>
        </HorizontalSplit>
      </HeaderWithContent.Content>
    </HeaderWithContent>
  )
}
