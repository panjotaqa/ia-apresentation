"use client"

import {
  SlideAiChat,
  type SlideAiChatStep,
} from "@/components/ui/slide-cn/slide-ai-chat"
import {
  CHANGE_SCENARIO,
  IMPACT_LAYERS,
  MIN_REGRESSION_SUITE,
  SKIP_RISKS,
} from "@/data/evolution-demo/regression-impact-content"

const REGRESSION_STEPS: SlideAiChatStep[] = [
  {
    chipLabel: "Contexto da mudança",
    text: `Contexto: release 2.1 da US-015 (Pedra da Galinha School) — repositório com código em produção e suíte de testes CT-01 a CT-06.

Mudança de negócio proposta:
• Média exatamente 7,0 passa a ser "Aprovado" (antes era "Recuperação")
• Demais limites: >7 Aprovado, 4–7 Recuperação, <4 Reprovado

Com base nesse change set, inicie a análise de impacto em regressão.`,
    thinkingLabel: "Absorvendo mudança e contexto do repositório…",
    response: (
      <div className="space-y-4 text-sm leading-relaxed md:text-base">
        <p>
          Contexto registrado para{" "}
          <strong>{CHANGE_SCENARIO.title}</strong>.
        </p>
        <p className="font-medium">Regras após a mudança</p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          {CHANGE_SCENARIO.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <p className="text-muted-foreground">{CHANGE_SCENARIO.description}</p>
      </div>
    ),
  },
  {
    chipLabel: "Camadas afetadas",
    text: `Quais camadas e arquivos da US-015 são impactados por essa mudança de regra?

Liste por arquivo: risco (Alta/Média/Baixa/Nenhuma) e motivo técnico.`,
    thinkingLabel: "Mapeando impacto por camada…",
    response: (
      <div className="space-y-4 text-sm leading-relaxed md:text-base">
        <p className="font-medium">Mapa de impacto</p>
        <ul className="space-y-2">
          {IMPACT_LAYERS.map((row) => (
            <li
              key={row.layer}
              className="rounded-md border border-border/40 bg-muted/20 px-3 py-2"
            >
              <code className="font-mono text-orange-600 dark:text-orange-400">
                {row.layer}
              </code>{" "}
              — <strong>{row.risk}</strong>
              <p className="mt-1 text-muted-foreground">{row.reason}</p>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground">
          Foco principal: <code>service.py</code> e testes de fronteira 7,0.
        </p>
      </div>
    ),
  },
  {
    chipLabel: "Suíte mínima de regressão",
    text: `Sugira a suíte mínima de testes (unitários CT-XX e funcionais HTTP) para validar esse release com segurança.

Priorize obrigatório vs recomendado.`,
    thinkingLabel: "Montando suíte mínima de regressão…",
    response: (
      <div className="space-y-4 text-sm leading-relaxed md:text-base">
        <p className="font-medium">Suíte mínima sugerida</p>
        <ul className="space-y-2">
          {MIN_REGRESSION_SUITE.map((row) => (
            <li
              key={row.id}
              className="rounded-md border border-border/40 bg-muted/20 px-3 py-2"
            >
              <span className="font-mono">{row.id}</span> · {row.type} ·{" "}
              <strong>{row.priority}</strong>
              <p className="mt-1 text-muted-foreground">{row.note}</p>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    chipLabel: "Riscos e sign-off",
    text: `Consolide para o QA: o que acontece se pularmos testes da suíte mínima? O que validar manualmente antes do sign-off do release 2.1?`,
    thinkingLabel: "Consolidando riscos e recomendações finais…",
    response: (
      <div className="space-y-4 text-sm leading-relaxed md:text-base">
        <p className="font-medium">Riscos se pular testes</p>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          {SKIP_RISKS.map((risk) => (
            <li key={risk}>{risk}</li>
          ))}
        </ol>
        <p className="rounded-lg border border-orange-500/30 bg-orange-500/5 px-3 py-2 text-muted-foreground">
          <strong className="text-foreground">Sign-off QA:</strong> execute CT-04
          e smoke HTTP com aluno média 7,0; anexe evidência no MR do hotfix antes
          do deploy em homologação.
        </p>
      </div>
    ),
  },
]

export function EvolutionRegressionAiChat() {
  return (
    <SlideAiChat
      title="Pedra da Galinha IA · QA"
      steps={REGRESSION_STEPS}
      emptyMessage="Descreva a mudança de release e peça análise de impacto em regressão."
      className="h-full min-h-0"
    />
  )
}
