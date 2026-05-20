"use client"

import euPhoto from "@/assets/eu.jpeg"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bot, FlaskConical, Link2, Mail, MapPin, Target } from "lucide-react"

const highlights = [
  {
    icon: FlaskConical,
    title: "V&V em todo o ciclo",
    description:
      "Atuação desde requisitos até produção — qualidade não começa na fase de testes.",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: Bot,
    title: "IA como copiloto",
    description:
      "Uso de LLMs e ferramentas de IA para acelerar análise, documentação e automação — com revisão humana.",
    accent: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: Target,
    title: "Objetivo da oficina",
    description:
      "Mostrar como um Engenheiro de Qualidade pode atuar em cada etapa da engenharia de software usando IA de forma prática e responsável.",
    accent: "text-amber-600 dark:text-amber-400",
  },
]

export function AboutMeSlide() {
  return (
    <HeaderWithContent className="gap-6 md:gap-8">
      <HeaderWithContent.Header className="text-3xl md:text-5xl lg:text-7xl">
        Quem sou eu
      </HeaderWithContent.Header>
      <HeaderWithContent.Content className="flex flex-col gap-8 text-base md:text-2xl lg:text-3xl">
        <HorizontalSplit ratio={0.45}>
          <HorizontalSplit.Left className="flex flex-col gap-8 pr-0 md:pr-8">
            <div className="flex items-center gap-6">
              <img
                src={euPhoto}
                alt="Jean Pantoja"
                className="size-28 shrink-0 rounded-full border-2 border-primary/30 object-cover md:size-36"
              />
              <div className="flex flex-col gap-3">
                <p className="text-3xl font-semibold text-foreground md:text-5xl">
                  Jean Pantoja
                </p>
                <p className="text-xl text-muted-foreground md:text-3xl">
                  Engenheiro de Qualidade de Software
                </p>
                <p className="text-lg text-muted-foreground md:text-2xl">
                  DBC Company · Cliente Sicredi
                </p>
                <p className="flex items-center gap-2 text-lg text-muted-foreground md:text-2xl">
                  <MapPin className="size-5 shrink-0 md:size-7" />
                  Quixadá, Ceará
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-lg text-muted-foreground md:gap-4 md:text-2xl">
              <a
                href="mailto:pantoja.jean.dev@gmail.com"
                className="flex items-center gap-3 hover:text-foreground"
              >
                <Mail className="size-5 shrink-0 md:size-7" />
                pantoja.jean.dev@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/jean-pantoja"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-foreground"
              >
                <Link2 className="size-5 shrink-0 md:size-7" />
                linkedin.com/in/jean-pantoja
              </a>
            </div>
          </HorizontalSplit.Left>
          <HorizontalSplit.Right className="flex flex-col gap-5 md:gap-6">
            {highlights.map(({ icon: Icon, title, description, accent }) => (
              <Card key={title} className="bg-card">
                <CardHeader className="gap-2 md:gap-3">
                  <CardTitle
                    className={`flex items-center gap-3 !text-xl font-semibold md:!text-3xl ${accent}`}
                  >
                    <Icon className="size-6 shrink-0 md:size-8" />
                    {title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground md:text-2xl">
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
