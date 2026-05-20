"use client"

import { Callout } from "@/components/ui/slide-cn/callout"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import { DesignImplementationTopicSlide } from "@/slides/design-implementation-topic"

const useCases = [
  "Explicar tabelas, colunas, FKs e views a partir do schema",
  "Sugerir queries de exploração (sempre read-only em ambientes seguros)",
  "Identificar regras implícitas: status, flags, campos calculados",
  "Relacionar dados com fluxos de negócio descritos nos requisitos",
]

const cautions = [
  "Nunca em produção sem governança e credenciais controladas",
  "Mascarar ou omitir dados sensíveis (PII, financeiros)",
  "Confirmar tipos, nullability e índices no banco real",
  "Documentar o que foi descoberto para o time",
]

export function DesignImplementationDatabaseSlide() {
  return (
    <DesignImplementationTopicSlide
      number="02.2"
      title="IA para consultar banco de dados e fazer entendimento"
    >
      <p className="text-foreground">
        O banco guarda regras que nem sempre estão no código. A IA ajuda a
        traduzir o schema em linguagem de negócio — com muito cuidado com
        ambiente e dados.
      </p>
      <HorizontalSplit ratio={0.5} className="min-h-0 flex-1">
        <HorizontalSplit.Left className="flex flex-col gap-3">
          <h3 className="font-semibold text-foreground">Para que uso</h3>
          <ul className="flex flex-col gap-2">
            {useCases.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-sky-600 dark:text-sky-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </HorizontalSplit.Left>
        <HorizontalSplit.Right className="flex flex-col gap-3">
          <h3 className="font-semibold text-foreground">Cuidados obrigatórios</h3>
          <ul className="flex flex-col gap-2">
            {cautions.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-sky-600 dark:text-sky-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </HorizontalSplit.Right>
      </HorizontalSplit>
      <Callout variant="warning" title="Entender ≠ executar cegamente">
        Queries sugeridas pela IA são ponto de partida. Eu reviso, adapto e
        executo só onde tenho permissão.
      </Callout>
    </DesignImplementationTopicSlide>
  )
}
