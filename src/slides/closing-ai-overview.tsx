"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Callout } from "@/components/ui/slide-cn/callout"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import { Code, FileText, RefreshCw, ShieldCheck, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const phaseAiUsage: {
  icon: LucideIcon
  label: string
  title: string
  description: string
  accent: string
}[] = [
  {
    icon: FileText,
    label: "01",
    title: "Especificação",
    description:
      "Templates de US, critérios de aceite e refinamento com LLM — exige domínio do negócio para validar o que a IA propõe.",
    accent: "text-sky-600 dark:text-sky-400",
  },
  {
    icon: Code,
    label: "02",
    title: "Projeto e implementação",
    description:
      "GitLab + IA, MCP no banco, codificação e review de MR — a arquitetura e as regras do time continuam humanas.",
    accent: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: ShieldCheck,
    label: "03",
    title: "Validação",
    description:
      "Geração de testes, mapeamento de casos e automação HTTP — o QA define estratégia, dados e sign-off.",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: RefreshCw,
    label: "04",
    title: "Evolução",
    description:
      "Refatoração de code smells e análise de impacto em regressão — manutenção exige contexto histórico e critério.",
    accent: "text-orange-600 dark:text-orange-400",
  },
]

export function ClosingAiOverviewSlide() {
  return (
    <HeaderWithContent className="h-full min-h-0 gap-4 md:gap-5">
      <HeaderWithContent.Header className="text-2xl md:text-4xl lg:text-5xl">
        <span className="text-primary">05</span>
        <span className="text-muted-foreground"> · </span>
        IA com consciência no SDLC
      </HeaderWithContent.Header>
      <HeaderWithContent.Content className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <HorizontalSplit
          ratio={0.4}
          className="min-h-0 flex-1 items-stretch"
        >
          <HorizontalSplit.Left className="flex min-h-0 flex-col gap-4 overflow-y-auto pr-0 md:pr-6">
            <section>
              <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Sparkles className="size-5 text-primary" />
                Ferramentas de IA no ciclo de vida
              </h2>
              <p className="text-sm leading-relaxed md:text-base">
                Cada etapa que vimos permite — e em muitos casos acelera — o uso
                de IA: chat com contexto de repositório, geração de artefatos,
                análise de código e apoio a testes. Isso não substitui o processo
                de software; complementa quem já sabe o que está fazendo.
              </p>
            </section>
            <section>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Conhecimento e consciência
              </h3>
              <p className="text-sm leading-relaxed md:text-base">
                Para usar bem, precisamos de base técnica, regras de negócio e
                critério de qualidade. Estudos e a prática do mercado convergem:
                a IA{" "}
                <strong className="text-foreground">amplifica</strong> o nosso
                trabalho — ela não melhora por si só. Se o conhecimento for
                fraco, o código e as informações geradas também serão fracos.
              </p>
            </section>
            <Callout variant="warning" title="Mensagem para levar">
              IA é copiloto, não piloto automático. Quanto melhor o QA e o time
              entendem requisitos, código e risco, mais valor a ferramenta entrega.
            </Callout>
          </HorizontalSplit.Left>

          <HorizontalSplit.Right className="flex min-h-0 flex-col justify-start gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground md:text-sm">
              IA em cada fase
            </p>
            {phaseAiUsage.map(({ icon: Icon, label, title, description, accent }) => (
              <Card
                key={title}
                size="sm"
                className="w-full shrink-0 gap-0 bg-card py-0 shadow-sm ring-1 ring-foreground/10"
              >
                <CardHeader className="gap-1 px-4 py-2.5">
                  <p
                    className={`text-xs font-semibold tracking-wide ${accent}`}
                  >
                    {label}
                  </p>
                  <CardTitle
                    className={`flex items-center gap-2 !text-sm font-semibold ${accent}`}
                  >
                    <Icon className="size-4 shrink-0" />
                    {title}
                  </CardTitle>
                  <CardDescription className="text-xs leading-snug">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </HorizontalSplit.Right>
        </HorizontalSplit>
      </HeaderWithContent.Content>
    </HeaderWithContent>
  )
}
