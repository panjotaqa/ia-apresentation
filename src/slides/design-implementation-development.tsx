"use client"

import { Callout } from "@/components/ui/slide-cn/callout"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import { DesignImplementationTopicSlide } from "@/slides/design-implementation-topic"

const foundations = [
  "Skills e rules do projeto (padrões, stack, convenções de teste)",
  "AGENTS.md / .cursor/rules com contexto do domínio",
  "Escopo pequeno por tarefa: uma feature, um bug, um refactor",
  "Diff revisado linha a linha — como em qualquer PR",
]

const mindset = [
  "IA como pair programming, não como piloto automático",
  "Eu defino o que quero; a IA propõe, eu escolho e ajusto",
  "Se não consigo explicar o código, não entrego",
  "Testes e observabilidade entram junto com a implementação",
]

export function DesignImplementationDevelopmentSlide() {
  return (
    <DesignImplementationTopicSlide
      number="02.3"
      title="IA para desenvolver — skills e regras bem definidas"
    >
      <p className="text-foreground">
        Desenvolver com IA só funciona com guardrails: o time documenta como
        codificar e testar; eu mantenho o entendimento do que está sendo
        construído.
      </p>
      <HorizontalSplit ratio={0.5} className="min-h-0 flex-1">
        <HorizontalSplit.Left className="flex flex-col gap-3">
          <h3 className="font-semibold text-foreground">Base antes de codar</h3>
          <ul className="flex flex-col gap-2">
            {foundations.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-emerald-600 dark:text-emerald-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </HorizontalSplit.Left>
        <HorizontalSplit.Right className="flex flex-col gap-3">
          <h3 className="font-semibold text-foreground">Postura</h3>
          <ul className="flex flex-col gap-2">
            {mindset.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-emerald-600 dark:text-emerald-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </HorizontalSplit.Right>
      </HorizontalSplit>
      <Callout variant="success" title="Por que skills importam">
        Sem regras claras, a IA inventa padrões. Com elas, acelera sem
        descaracterizar o projeto — e eu continuo sabendo o que entreguei.
      </Callout>
    </DesignImplementationTopicSlide>
  )
}
