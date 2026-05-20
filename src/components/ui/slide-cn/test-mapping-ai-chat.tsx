"use client"

import {
  SlideAiChat,
  type SlideAiChatStep,
} from "@/components/ui/slide-cn/slide-ai-chat"
import {
  CODE_TRACEABILITY,
  MAPPED_TEST_CASES,
  QA_GAPS,
  UNIT_TEST_TRACEABILITY,
  US015_REQUIREMENTS_SUMMARY,
} from "@/data/validation-demo/test-mapping-content"
import { cn } from "@/lib/utils"

function StatusBadge({
  status,
}: {
  status: "ok" | "gap" | "partial"
}) {
  const styles = {
    ok: "text-emerald-600 dark:text-emerald-400",
    gap: "text-amber-600 dark:text-amber-400",
    partial: "text-amber-600 dark:text-amber-400",
  }
  const labels = { ok: "Atendido", gap: "Lacuna", partial: "Parcial" }
  return (
    <strong className={styles[status]}>{labels[status]}</strong>
  )
}

const TEST_MAPPING_STEPS: SlideAiChatStep[] = [
  {
    chipLabel: "Casos a partir dos requisitos",
    text: `Contexto disponível:
• Documentação de requisitos: US-015 (Consultar situação de aprovação do aluno) — critérios de aceite, regras de negócio e contrato da API
• Repositório: academico-pedra-da-galinha-school (feature já especificada, ainda sem código neste passo)

Com base exclusivamente na documentação de requisitos da US-015, gere uma matriz de casos de teste estruturada para o QA.

Inclua:
• ID do caso (CT-XX), título, tipo (funcional, borda, negativo, contrato, arquitetura)
• Prioridade (Alta / Média)
• Formato Dado / Quando / Então
• Cenários de borda nos limites 7,0 e 4,0 e erro 404`,
    thinkingLabel:
      "Lendo US-015 na documentação e derivando cenários de teste…",
    response: (
      <div className="space-y-4 text-sm leading-relaxed md:text-base">
        <p>
          Consultei a <strong>US-015</strong> na documentação de requisitos (
          {US015_REQUIREMENTS_SUMMARY.title}). Segue a matriz inicial —{" "}
          <strong>{MAPPED_TEST_CASES.length} casos</strong> cobrindo regras,
          bordas e contrato da API.
        </p>
        <p className="font-medium">Regras extraídas do documento</p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          {US015_REQUIREMENTS_SUMMARY.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <p className="font-medium">Matriz de casos de teste</p>
        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full min-w-[32rem] text-left text-xs md:text-sm">
            <thead className="border-b border-border/60 bg-muted/40">
              <tr>
                <th className="px-3 py-2 font-semibold">ID</th>
                <th className="px-3 py-2 font-semibold">Cenário</th>
                <th className="px-3 py-2 font-semibold">Tipo</th>
                <th className="px-3 py-2 font-semibold">Pri.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {MAPPED_TEST_CASES.map((tc) => (
                <tr key={tc.id} className="align-top">
                  <td className="px-3 py-2 font-mono text-emerald-600 dark:text-emerald-400">
                    {tc.id}
                  </td>
                  <td className="px-3 py-2">
                    <p className="font-medium">{tc.title}</p>
                    <p className="mt-1 text-muted-foreground">{tc.gwt}</p>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{tc.type}</td>
                  <td className="px-3 py-2">{tc.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground">
          Próximo passo sugerido: cruzar esta matriz com o código entregue pelo
          dev no GitLab.
        </p>
      </div>
    ),
  },
  {
    chipLabel: "Código vs casos de teste",
    text: `Contexto atualizado:
• Matriz de casos CT-01 a CT-10 (gerada no passo anterior)
• Código-fonte da US-015 no repositório: models.py, repository.py, dto.py, service.py, controller.py (MR mergeado)

Verifique se a implementação do dev atende a todos os casos de teste mapeados.

Para cada CT-XX, indique: Atendido / Parcial / Lacuna e a evidência no código (arquivo + trecho ou comportamento).`,
    thinkingLabel:
      "Cruzando requisitos × casos × código no repositório…",
    response: (
      <div className="space-y-4 text-sm leading-relaxed md:text-base">
        <p>
          Analisei o código da feature no repositório{" "}
          <strong>academico-pedra-da-galinha-school</strong> contra a matriz{" "}
          CT-01…CT-10.
        </p>
        <p className="font-medium">Rastreabilidade requisitos → código</p>
        <ul className="space-y-2">
          {CODE_TRACEABILITY.map((row) => (
            <li
              key={row.caseId}
              className="rounded-md border border-border/40 bg-muted/20 px-3 py-2"
            >
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                {row.caseId}
              </span>{" "}
              — <StatusBadge status={row.status} />
              <p className="mt-1 text-muted-foreground">{row.evidence}</p>
            </li>
          ))}
        </ul>
        <p>
          <strong className="text-emerald-600 dark:text-emerald-400">
            Resultado:
          </strong>{" "}
          os 10 casos estão cobertos pela implementação. Separação de camadas
          conforme a especificação (repository → service → controller).
        </p>
        <p className="text-muted-foreground">
          Observação de QA: a especificação original mencionava validação de
          média informada pelo coordenador na UI; o MR entrega consulta via API
          por ID — alinhar escopo com o PO se CT de entrada de média for
          obrigatório.
        </p>
      </div>
    ),
  },
  {
    chipLabel: "Cobertura de testes unitários",
    text: `Contexto:
• Matriz CT-01 a CT-10
• Código da US-015 no repositório
• Pasta tests/: test_repository.py, test_service.py, test_controller.py

O dev implementou testes unitários para a US-015?

Mapeie cada caso de teste (CT-XX) para o arquivo/método de teste correspondente ou marque como não coberto. Indique lacunas prioritárias.`,
    thinkingLabel:
      "Analisando tests/ e cruzando com a matriz de casos…",
    response: (
      <div className="space-y-4 text-sm leading-relaxed md:text-base">
        <p>
          Revisei <code className="rounded bg-muted px-1">tests/</code> no
          mesmo repositório. Cobertura unitária{" "}
          <strong>parcial</strong> — base sólida, com bordas a reforçar.
        </p>
        <p className="font-medium">Casos × testes unitários</p>
        <ul className="space-y-2">
          {UNIT_TEST_TRACEABILITY.map((row) => (
            <li
              key={row.caseId}
              className={cn(
                "rounded-md border px-3 py-2",
                row.covered
                  ? "border-border/40 bg-muted/20"
                  : "border-amber-500/30 bg-amber-500/5"
              )}
            >
              <span className="font-mono">{row.caseId}</span>
              {row.covered ? (
                <>
                  {" "}
                  —{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Coberto
                  </span>
                  <p className="mt-1 text-muted-foreground">
                    <code className="rounded bg-muted px-1">{row.file}</code> ·{" "}
                    {row.note}
                  </p>
                </>
              ) : (
                <>
                  {" "}
                  —{" "}
                  <span className="text-amber-600 dark:text-amber-400">
                    Não coberto
                  </span>
                  <p className="mt-1 text-muted-foreground">{row.note}</p>
                </>
              )}
            </li>
          ))}
        </ul>
        <p className="font-medium">Resumo</p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li>
            <strong>8/10</strong> casos com evidência em testes unitários
          </li>
          <li>
            Lacunas: <strong>CT-04</strong> e <strong>CT-05</strong> (limites
            7,0 e 4,0) — sugerir <code>test_media_exatamente_7</code> e{" "}
            <code>test_media_exatamente_4</code> em{" "}
            <code>test_service.py</code>
          </li>
          <li>
            Testes funcionais HTTP ainda não substituem a pirâmide — validar CT-01
            a CT-06 na API real
          </li>
        </ul>
      </div>
    ),
  },
  {
    chipLabel: "Plano de ação do QA",
    text: `Consolide o status da US-015 para o QA:

• Matriz de casos CT-01 a CT-10
• Rastreabilidade código (todos atendidos)
• Cobertura unitária (8/10)

Liste lacunas remanescentes, prioridade de execução (unitário → funcional → exploratório) e o que o QA deve validar manualmente antes do release.`,
    thinkingLabel: "Consolidando plano de testes e próximos passos…",
    response: (
      <div className="space-y-4 text-sm leading-relaxed md:text-base">
        <p>
          Consolidação com base na documentação de requisitos, no código do dev
          e nos testes já commitados.
        </p>
        <p className="font-medium">Lacunas e ações recomendadas</p>
        <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
          {QA_GAPS.map((gap) => (
            <li key={gap}>{gap}</li>
          ))}
        </ol>
        <p className="font-medium">Ordem sugerida de execução</p>
        <ol className="list-inside list-decimal space-y-1 text-muted-foreground">
          <li>
            <strong>Completar unitários</strong> — CT-04 e CT-05 no service
            (rápido, sem API)
          </li>
          <li>
            <strong>Automatizar funcionais</strong> — CT-01 a CT-06 com pytest +
            requests (próximo slide da oficina)
          </li>
          <li>
            <strong>Smoke manual</strong> — curl no ambiente de homologação +
            conferência de mensagem 404
          </li>
          <li>
            <strong>Evidência no MR</strong> — anexar matriz CT-XX com status
            final para auditoria de qualidade
          </li>
        </ol>
        <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-muted-foreground">
          <strong className="text-foreground">Papel do QA:</strong> a IA
          acelera mapeamento e rastreio — critério de aceite, priorização e
          sign-off continuam humanos. Use o chat como copiloto, não como
          substituto do julgamento.
        </p>
      </div>
    ),
  },
]

export function TestMappingAiChat() {
  return (
    <SlideAiChat
      title="Pedra da Galinha IA · QA"
      steps={TEST_MAPPING_STEPS}
      emptyMessage="Conecte a documentação de requisitos e o repositório do dev — peça mapeamento de casos, rastreio no código ou cobertura de testes."
    />
  )
}
