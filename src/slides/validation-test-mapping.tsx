"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TestMappingAiChat } from "@/components/ui/slide-cn/test-mapping-ai-chat"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"

const topicDescription =
  "A IA cruza documentação de requisitos e código entregue pelo dev: gera matriz de casos, verifica rastreabilidade e aponta lacunas de cobertura — antes de automatizar testes."

const capabilities = [
  "Gerar casos de teste a partir da US e critérios de aceite",
  "Conferir se o código do dev atende cada cenário mapeado",
  "Verificar testes unitários existentes por caso (CT-XX)",
  "Consolidar plano de ação e prioridades para o QA",
]

export function ValidationTestMappingSlide() {
  return (
    <HeaderWithContent className="h-full min-h-0 gap-4 md:gap-6">
      <HeaderWithContent.Header className="shrink-0 text-2xl md:text-4xl lg:text-5xl">
        <span className="text-emerald-600 dark:text-emerald-400">03.2</span>
        <span className="text-muted-foreground"> · </span>
        Mapeamento de casos de teste
      </HeaderWithContent.Header>
      <HeaderWithContent.Content className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden">
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
                  A IA acelera mapeamento e rastreio — critério de aceite,
                  priorização e sign-off continuam humanos. Use o chat como
                  copiloto conectado à documentação e ao repositório; valide cada
                  lacuna antes do release.
                </CardDescription>
              </CardHeader>
            </Card>
          </HorizontalSplit.Left>
          <HorizontalSplit.Right className="flex h-full max-h-full min-h-0 w-full flex-col">
            <TestMappingAiChat />
          </HorizontalSplit.Right>
        </HorizontalSplit>
      </HeaderWithContent.Content>
    </HeaderWithContent>
  )
}
