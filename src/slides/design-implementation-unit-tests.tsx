"use client"

import { Callout } from "@/components/ui/slide-cn/callout"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import { DesignImplementationTopicSlide } from "@/slides/design-implementation-topic"

const pyramid = [
  "Base larga: muitos testes unitários rápidos e isolados",
  "Meio: integração entre módulos e contratos",
  "Topo estreito: poucos E2E/UI — caros e frágeis",
  "IA não justifica inverter a pirâmide",
]

const withAi = [
  "Gerar scaffolding (arrange/act/assert) no framework do time",
  "Sugerir casos de borda a partir do código e requisitos",
  "Refatorar testes legados com cobertura frágil",
  "Priorizar comportamento observável, não detalhe de implementação",
]

export function DesignImplementationUnitTestsSlide() {
  return (
    <DesignImplementationTopicSlide
      number="02.4"
      title="IA para testes unitários — pirâmide de testes"
    >
      <p className="text-foreground">
        A IA acelera a escrita de testes, mas quem define estratégia e
        profundidade sou eu — respeitando a pirâmide e o custo de manutenção.
      </p>
      <HorizontalSplit ratio={0.48} className="min-h-0 flex-1">
        <HorizontalSplit.Left className="flex flex-col gap-3">
          <h3 className="font-semibold text-foreground">Pirâmide em mente</h3>
          <ul className="flex flex-col gap-2">
            {pyramid.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </HorizontalSplit.Left>
        <HorizontalSplit.Right className="flex flex-col gap-3">
          <h3 className="font-semibold text-foreground">Onde a IA ajuda</h3>
          <ul className="flex flex-col gap-2">
            {withAi.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </HorizontalSplit.Right>
      </HorizontalSplit>
      <Callout variant="info" title="Shift-left na prática">
        Participar da implementação com testes unitários sólidos reduz
        retrabalho na validação — problemas baratos de corrigir aqui, caros
        depois.
      </Callout>
    </DesignImplementationTopicSlide>
  )
}
