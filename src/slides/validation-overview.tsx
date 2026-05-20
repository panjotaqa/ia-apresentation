"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import { ClipboardList, FlaskConical, TestTube2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const phaseDescription =
  "É a fase de validação e verificação (V&V). Garante que o software atenda às especificações e corresponda às expectativas do cliente."

const phaseActivities = [
  "Testes unitários, de integração, sistema e aceitação",
  "Revisões de código e testes exploratórios",
  "Automação de regressão e pipelines de CI/CD",
  "Mapeamento de cenários e rastreabilidade requisitos × código × testes",
  "Evidências de conformidade e relatórios de qualidade",
]

const topics: {
  icon: LucideIcon
  label: string
  title: string
  description: string
  accent: string
}[] = [
  {
    icon: TestTube2,
    label: "01",
    title: "Testes unitários",
    description:
      "Geração assistida por camada (repository, service, controller) com base no código da feature.",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: ClipboardList,
    label: "02",
    title: "Mapeamento de casos de teste",
    description:
      "IA com acesso à documentação de requisitos e ao código do dev — matriz de cenários, rastreio e cobertura.",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: FlaskConical,
    label: "03",
    title: "Testes funcionais",
    description:
      "Automação HTTP na API — cenários Aprovado, Recuperação, Reprovado e refactor DRY.",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
]

export function ValidationOverviewSlide() {
  return (
    <HeaderWithContent className="h-full min-h-0 gap-4 md:gap-5">
      <HeaderWithContent.Header className="text-2xl md:text-4xl lg:text-5xl">
        Validação de Software
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
                A IA acelera casos e scripts — julgamento, priorização e
                evidências de qualidade continuam com o QA.
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
