"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CodeReviewDemo } from "@/components/ui/slide-cn/code-review-demo"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"

const topicDescription =
  "Revisão de código assistida por IA no merge request: qualidade (Clean Code, SOLID, DRY), aderência aos critérios de aceite e sugestões antes do merge — com o código da US-015 visível no repositório."

const capabilities = [
  "Analisar arquitetura e separação de camadas",
  "Conferir critérios de aceite no código do MR",
  "Listar melhorias e riscos antes do merge",
  "Apoiar o time sem substituir o julgamento do revisor",
]

export function DesignImplementationCodeReviewSlide() {
  return (
    <HeaderWithContent className="h-full min-h-0 gap-4 md:gap-6">
      <HeaderWithContent.Header className="shrink-0 text-2xl md:text-4xl lg:text-5xl">
        <span className="text-amber-600 dark:text-amber-400">02.4</span>
        <span className="text-muted-foreground"> · </span>
        Revisão de código com IA
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
                    <span className="text-amber-600 dark:text-amber-400">
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
                  A IA aponta padrões e lacunas — aprovar ou pedir mudanças no MR
                  continua sendo decisão humana, com foco em risco e regras de
                  negócio da feature.
                </CardDescription>
              </CardHeader>
            </Card>
          </HorizontalSplit.Left>
          <HorizontalSplit.Right className="flex h-full max-h-full min-h-0 w-full flex-col">
            <CodeReviewDemo />
          </HorizontalSplit.Right>
        </HorizontalSplit>
      </HeaderWithContent.Content>
    </HeaderWithContent>
  )
}
