"use client"

import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import { RepoCodePanel } from "@/components/ui/slide-cn/repo-code-panel"
import {
  SlideAiChat,
  type SlideAiChatStep,
} from "@/components/ui/slide-cn/slide-ai-chat"
import {
  REPO_FILE_ORDER,
  type RepoFileId,
} from "@/data/gitlab-demo/aluno-status-files"
import { useMemo, useState } from "react"

const ALL_FILES: RepoFileId[] = [...REPO_FILE_ORDER]

const CODE_REVIEW_STEPS: SlideAiChatStep[] = [
  {
    chipLabel: "Clean Code, SOLID e DRY",
    text: `Revise o código da US-015 (GET /alunos/{id}/status) no MR !42 do repositório acadêmico Pedra da Galinha School.

A implementação segue Clean Code, SOLID, DRY e a separação repository → service → controller do projeto?`,
    thinkingLabel: "Analisando qualidade e arquitetura do código…",
    response: (
      <div className="space-y-3 text-sm leading-relaxed md:text-base">
        <p>
          Revisei os arquivos do MR no painel à esquerda. No geral a feature{" "}
          <strong>respeita as camadas</strong> e está legível — com ajustes
          pontuais antes do merge.
        </p>
        <p className="font-medium">O que está bem</p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li>
            <strong>SRP:</strong> controller só orquestra; regras em{" "}
            <code>service.py</code>; SQL em <code>repository.py</code>
          </li>
          <li>
            <strong>Clean Code:</strong> nomes claros (
            <code>processar_status_aluno</code>,{" "}
            <code>buscar_media_por_id</code>)
          </li>
          <li>
            <strong>DRY:</strong> classificação centralizada no service — sem
            duplicar limites no controller
          </li>
        </ul>
        <p className="font-medium">Sugestões (SOLID / manutenção)</p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li>
            Extrair constantes <code>LIMITE_APROVACAO = 7.0</code> e{" "}
            <code>LIMITE_RECUPERACAO = 4.0</code> — evita números mágicos
          </li>
          <li>
            Método privado <code>_classificar_por_media(media)</code> no service
            — facilita testes unitários isolados
          </li>
          <li>
            Validar se o DTO poderia expor enum para <code>status</code> em vez
            de <code>str</code> solta
          </li>
        </ul>
      </div>
    ),
  },
  {
    chipLabel: "Critérios de aceite",
    text: `Com base no código do MR da US-015, todos os critérios de aceite foram atendidos?

Critérios:
• Média > 7 → status "Aprovado"
• Média de 4 a 7 (inclusive) → "Recuperação"
• Média < 4 → "Reprovado"
• Aluno inexistente ou sem média → HTTP 404 com mensagem clara
• Regras de negócio no service, não no controller`,
    thinkingLabel: "Conferindo critérios de aceite no código…",
    response: (
      <div className="space-y-3 text-sm leading-relaxed md:text-base">
        <p>
          Cruzamento do MR com os critérios da especificação (arquivo{" "}
          <code className="rounded bg-muted px-1">service.py</code>):
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong className="text-emerald-600 dark:text-emerald-400">
              Atendido
            </strong>{" "}
            — Média &gt; 7,0 → <code>Aprovado</code> (
            <code>if media &gt; 7.0</code>)
          </li>
          <li>
            <strong className="text-emerald-600 dark:text-emerald-400">
              Atendido
            </strong>{" "}
            — 4,0 ≤ média ≤ 7,0 → <code>Recuperação</code> (inclusive nos
            limites)
          </li>
          <li>
            <strong className="text-emerald-600 dark:text-emerald-400">
              Atendido
            </strong>{" "}
            — Média &lt; 4,0 → <code>Reprovado</code>
          </li>
          <li>
            <strong className="text-emerald-600 dark:text-emerald-400">
              Atendido
            </strong>{" "}
            — Sem média → HTTP 404 com mensagem em{" "}
            <code>processar_status_aluno</code>
          </li>
          <li>
            <strong className="text-emerald-600 dark:text-emerald-400">
              Atendido
            </strong>{" "}
            — Controller delega; nenhuma regra de classificação na camada HTTP
          </li>
        </ul>
        <p className="font-medium text-amber-600 dark:text-amber-400">
          Validar em QA (não visível só no código)
        </p>
        <p className="text-muted-foreground">
          Fronteiras exatas: 7,0 → Recuperação; 7,1 → Aprovado; 4,0 e 3,9.
          Confirmar política de arredondamento (uma casa decimal) com o PO.
        </p>
      </div>
    ),
  },
  {
    chipLabel: "Revisão do MR",
    text: `Faça a revisão do MR !42 (US-015 — consulta de situação do aluno pela média) e liste pontos de melhoria antes do merge.`,
    thinkingLabel: "Revisando MR e consolidando feedback…",
    response: (
      <div className="space-y-3 text-sm leading-relaxed md:text-base">
        <p>
          <strong>MR !42</strong> — escopo coerente, camadas corretas, pronto
          para merge <strong>após</strong> os itens abaixo.
        </p>
        <p className="font-medium">Pontos fortes</p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li>Fluxo repository → service → controller consistente com o repo</li>
          <li>DTO alinhado ao contrato da API</li>
          <li>Mensagem de 404 clara para QA automatizar</li>
        </ul>
        <p className="font-medium">Melhorias sugeridas</p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li>
            <strong>Testes unitários</strong> do service (médias 8, 5,5, 3 e
            404) — não aparecem neste MR
          </li>
          <li>
            <strong>Teste de integração</strong> do endpoint GET com banco em
            memória ou fixture
          </li>
          <li>
            Log de auditoria (média consultada, status, usuário) se exigido
            pela especificação
          </li>
          <li>
            Documentar no MR os IDs de exemplo usados na validação manual
          </li>
        </ul>
        <p className="text-muted-foreground">
          Recomendação: aprovar com comentários — bloquear merge apenas se a
          política do time exige testes no mesmo MR.
        </p>
      </div>
    ),
  },
]

export function CodeReviewDemo() {
  const [openAccordion, setOpenAccordion] = useState<string[]>(ALL_FILES)
  const steps = useMemo(() => CODE_REVIEW_STEPS, [])

  return (
    <HorizontalSplit
      ratio={0.5}
      className="min-h-0 flex-1 items-stretch gap-4 md:gap-6"
    >
      <HorizontalSplit.Left className="flex min-h-0 h-full w-full self-stretch">
        <RepoCodePanel
          visibleFileIds={ALL_FILES}
          openAccordion={openAccordion}
          onOpenAccordionChange={setOpenAccordion}
          emptyMessage="Código do MR US-015 disponível para revisão."
        />
      </HorizontalSplit.Left>
      <HorizontalSplit.Right className="flex min-h-0 h-full w-full self-stretch">
        <SlideAiChat
          title="Pedra da Galinha IA"
          steps={steps}
          emptyMessage="Peça revisão de qualidade, critérios de aceite ou feedback do MR."
        />
      </HorizontalSplit.Right>
    </HorizontalSplit>
  )
}
