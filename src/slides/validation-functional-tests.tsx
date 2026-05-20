"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FunctionalTestsDemo } from "@/components/ui/slide-cn/functional-tests-demo"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"

const topicDescription =
  "Automação funcional com pytest e requests na API FastAPI — um prompt por cenário de negócio (Aprovado, Recuperação, Reprovado, 404) e refactor final para eliminar duplicação no arquivo de testes."

const capabilities = [
  "Gerar testes HTTP a partir das regras da US-015",
  "Acrescentar cenários passo a passo no mesmo arquivo",
  "Refatorar com helpers reutilizáveis (DRY)",
  "Validar contrato da API sem subir toda a pirâmide manualmente",
]

export function ValidationFunctionalTestsSlide() {
  return (
    <HeaderWithContent className="h-full min-h-0 gap-4 md:gap-6">
      <HeaderWithContent.Header className="shrink-0 text-2xl md:text-4xl lg:text-5xl">
        <span className="text-emerald-600 dark:text-emerald-400">03.3</span>
        <span className="text-muted-foreground"> · </span>
        Testes funcionais com IA
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
                    <span className="text-emerald-600 dark:text-emerald-400">
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
                  A IA acelera scripts e cenários — você define dados de teste,
                  ambiente da API e confirma que o refactor preserva todos os
                  critérios de aceite antes do CI.
                </CardDescription>
              </CardHeader>
            </Card>
          </HorizontalSplit.Left>
          <HorizontalSplit.Right className="flex h-full max-h-full min-h-0 w-full flex-col">
            <FunctionalTestsDemo />
          </HorizontalSplit.Right>
        </HorizontalSplit>
      </HeaderWithContent.Content>
    </HeaderWithContent>
  )
}
