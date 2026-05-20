"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import { Code, Database, GitBranch, TestTube2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const phaseDescription =
  "É a fase do desenvolvimento. O software é projetado estruturalmente e, em seguida, codificado."

const phaseActivities = [
  "Definição de arquitetura e padrões do sistema",
  "Design de banco de dados e integrações",
  "Escolha de stack e frameworks",
  "Escrita e revisão do código-fonte",
]

const topics: {
  icon: LucideIcon
  label: string
  title: string
  description: string
  accent: string
}[] = [
  {
    icon: GitBranch,
    label: "01",
    title: "Consultar GitLab",
    description:
      "Projetos, serviços, pipelines e histórico de mudanças com apoio de IA.",
    accent: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: Database,
    label: "02",
    title: "Entender o banco",
    description:
      "Explorar schema, relacionamentos e regras implícitas nos dados.",
    accent: "text-sky-600 dark:text-sky-400",
  },
  {
    icon: Code,
    label: "03",
    title: "Desenvolver com IA",
    description:
      "Codificação orientada a skills e regras bem definidas — com ownership humano.",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: TestTube2,
    label: "04",
    title: "Testes unitários",
    description:
      "Geração assistida respeitando a pirâmide de testes e o contexto do time.",
    accent: "text-amber-600 dark:text-amber-400",
  },
]

export function DesignImplementationSlide() {
  return (
    <HeaderWithContent className="gap-4 md:gap-5">
      <HeaderWithContent.Header className="text-2xl md:text-4xl lg:text-5xl">
        Projeto e Implementação de Software
      </HeaderWithContent.Header>
      <HeaderWithContent.Content className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <HorizontalSplit
          ratio={0.4}
          className="min-h-0 flex-1 items-stretch"
        >
          <HorizontalSplit.Left className="flex flex-col gap-4 overflow-y-auto pr-0 md:pr-6">
            <div>
              <h2 className="mb-1 text-sm font-semibold text-foreground md:text-base">
                A fase
              </h2>
              <p className="text-xs leading-relaxed md:text-sm">
                {phaseDescription}
              </p>
            </div>
            <div>
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
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs leading-relaxed text-foreground md:text-sm">
                É a etapa que mais abre possibilidades com IA — e também a mais
                perigosa se usada sem critério: podemos perder o fio do que
                estamos fazendo.
              </p>
              <p className="text-xs leading-relaxed md:text-sm">
                Precisa ser feita e entendida por nós. Delegar tudo à IA
                enfraquece o raciocínio — a direção e a revisão continuam sendo
                nossas.
              </p>
            </div>
          </HorizontalSplit.Left>

          <HorizontalSplit.Right className="flex min-h-0 flex-col gap-2">
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
