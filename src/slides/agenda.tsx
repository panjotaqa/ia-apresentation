"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"
import { Code, FileText, RefreshCw, ShieldCheck } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const phases: {
  icon: LucideIcon
  label: string
  title: string
  description: string
  accent: string
}[] = [
  {
    icon: FileText,
    label: "01",
    title: "Especificação de Software",
    description:
      "Requisitos, elicitação, análise e documentação do que o sistema deve fazer.",
    accent: "text-sky-600 dark:text-sky-400",
  },
  {
    icon: Code,
    label: "02",
    title: "Projeto e Implementação",
    description:
      "Arquitetura, design técnico, escolha de tecnologias e codificação.",
    accent: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: ShieldCheck,
    label: "03",
    title: "Validação de Software",
    description:
      "Testes, revisões e V&V para garantir conformidade e valor entregue.",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: RefreshCw,
    label: "04",
    title: "Evolução de Software",
    description:
      "Manutenção, correções, adaptação a novos ambientes e novas funcionalidades.",
    accent: "text-amber-600 dark:text-amber-400",
  },
]

export function AgendaSlide() {
  return (
    <HeaderWithContent className="gap-6 md:gap-8">
      <HeaderWithContent.Header className="text-3xl md:text-5xl lg:text-6xl">
        Sumário
      </HeaderWithContent.Header>
      <HeaderWithContent.Content className="flex flex-col gap-8">
        <p className="max-w-4xl text-lg text-foreground md:text-2xl">
          Quatro etapas clássicas da engenharia de software — e como um
          Engenheiro de Qualidade pode atuar em cada uma com apoio de IA.
        </p>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {phases.map(({ icon: Icon, label, title, description, accent }) => (
            <Card key={title} className="h-full w-full bg-card">
              <CardHeader className="gap-3">
                <p
                  className={`text-sm font-semibold tracking-wide md:text-base ${accent}`}
                >
                  {label}
                </p>
                <CardTitle
                  className={`flex items-center gap-3 !text-xl font-semibold md:!text-2xl ${accent}`}
                >
                  <Icon className="size-6 shrink-0 md:size-7" />
                  {title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </HeaderWithContent.Content>
    </HeaderWithContent>
  )
}
