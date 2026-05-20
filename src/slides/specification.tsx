"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import { SpecificationAiChat } from "@/components/ui/slide-cn/specification-ai-chat"

const phaseDescription =
  "É a fase dos requisitos. Aqui é definido o que o sistema deve fazer e quais são suas restrições de operação e desenvolvimento."

const phaseActivities = [
  "Engenharia de requisitos e elicitação com stakeholders",
  "Análise e priorização de necessidades do cliente",
  "Documentação de regras de negócio e critérios de aceite",
  "Identificação precoce de riscos e requisitos não funcionais",
]

export function SpecificationSlide() {
  return (
    <HeaderWithContent className="h-full min-h-0 gap-4 md:gap-6">
      <HeaderWithContent.Header className="shrink-0">
        Especificação de Software
      </HeaderWithContent.Header>
      <HeaderWithContent.Content className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden">
        <HorizontalSplit ratio={0.38} className="min-h-0 flex-1 items-stretch">
          <HorizontalSplit.Left className="flex min-h-0 flex-col gap-4 overflow-y-auto pr-0 md:pr-6">
            <div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                A fase
              </h2>
              <p className="text-base leading-relaxed">{phaseDescription}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                O que envolve
              </h3>
              <ul className="flex flex-col gap-2 text-base">
                {phaseActivities.map((activity) => (
                  <li key={activity} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="bg-card" size="sm">
              <CardHeader className="gap-2">
                <CardTitle className="text-lg font-semibold">
                  Papel do QA aqui
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  Não substituo o analista de negócios — atuo como guardião da
                  testabilidade e da qualidade dos requisitos, antecipando o que
                  será difícil validar depois.
                </CardDescription>
              </CardHeader>
            </Card>
          </HorizontalSplit.Left>
          <HorizontalSplit.Right className="min-h-0 h-full w-full">
            <SpecificationAiChat />
          </HorizontalSplit.Right>
        </HorizontalSplit>
      </HeaderWithContent.Content>
    </HeaderWithContent>
  )
}
