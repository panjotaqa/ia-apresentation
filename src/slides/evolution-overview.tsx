"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import { GitCompareArrows, Wrench } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const phaseDescription =
  "É a fase da manutenção. Como o mundo muda, o software precisa mudar junto para continuar sendo útil."

const phaseActivities = [
  "Correção de erros pós-lançamento (hotfixes)",
  "Adaptação a novos ambientes e dependências",
  "Inclusão de novas funcionalidades demandadas pelo mercado",
  "Refatoração e redução de débito técnico",
]

const topics: {
  icon: LucideIcon
  label: string
  title: string
  description: string
  accent: string
}[] = [
  {
    icon: Wrench,
    label: "01",
    title: "Code smells e refatoração",
    description:
      "Identificar números mágicos, métodos longos e duplicação; refatorar com IA mantendo o comportamento (US-015).",
    accent: "text-orange-600 dark:text-orange-400",
  },
  {
    icon: GitCompareArrows,
    label: "02",
    title: "Impacto em regressão",
    description:
      "Dado um change set, mapear camadas afetadas e sugerir suíte mínima de testes antes do release.",
    accent: "text-orange-600 dark:text-orange-400",
  },
]

export function EvolutionOverviewSlide() {
  return (
    <HeaderWithContent className="h-full min-h-0 gap-4 md:gap-5">
      <HeaderWithContent.Header className="text-2xl md:text-4xl lg:text-5xl">
        Evolução de Software
      </HeaderWithContent.Header>
      <HeaderWithContent.Content className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <HorizontalSplit
          ratio={0.4}
          className="min-h-0 flex-1 items-stretch"
        >
          <HorizontalSplit.Left className="flex min-h-0 flex-col gap-4 overflow-y-auto pr-0 md:pr-6">
            <section>
              <h2 className="mb-1 text-sm font-semibold text-foreground md:text-base">
                A fase
              </h2>
              <p className="text-xs leading-relaxed md:text-sm">
                {phaseDescription}
              </p>
            </section>
            <section>
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:text-sm">
                O que envolve
              </h3>
              <ul className="flex flex-col gap-1 text-xs md:text-sm">
                {phaseActivities.map((activity) => (
                  <li key={activity} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="flex flex-col gap-2">
              <p className="text-xs leading-relaxed text-foreground md:text-sm">
                A evolução não é fim de projeto — é onde o QA mantém confiança
                release após release, com IA acelerando análise e refatoração.
              </p>
            </section>
          </HorizontalSplit.Left>

          <HorizontalSplit.Right className="flex min-h-0 flex-col justify-start gap-3">
            {topics.map(({ icon: Icon, label, title, description, accent }) => (
              <Card
                key={title}
                size="sm"
                className="w-full shrink-0 gap-0 bg-card py-0 shadow-sm ring-1 ring-foreground/10"
              >
                <CardHeader className="gap-1 px-4 py-3">
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
