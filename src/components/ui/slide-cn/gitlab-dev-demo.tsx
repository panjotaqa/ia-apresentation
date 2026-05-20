"use client"

import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import { RepoCodePanel } from "@/components/ui/slide-cn/repo-code-panel"
import {
  SlideAiChat,
  type SlideAiChatStep,
} from "@/components/ui/slide-cn/slide-ai-chat"
import {
  REVEAL_BY_STEP,
  type RepoFileId,
} from "@/data/gitlab-demo/aluno-status-files"
import { useCallback, useMemo, useState } from "react"

function buildGitlabSteps(
  revealFiles: (stepIndex: number) => void
): SlideAiChatStep[] {
  return [
    {
      chipLabel: "Contexto, regras e análise do repo",
      text: `Contexto:
Repositório acadêmico Pedra da Galinha School (FastAPI + PostgreSQL).
Vamos implementar a US-015 — endpoint para o coordenador consultar a situação do aluno pela média final no banco.

Regras de negócio:
• Média > 7 → status "Aprovado"
• Média de 4 a 7 (inclusive) → "Recuperação"
• Média < 4 → "Reprovado"
• Aluno inexistente ou sem média → HTTP 404 com mensagem clara

Tecnologias e arquitetura:
SQLAlchemy (models + repository), Pydantic (DTO), camadas repository → service → controller.
Reutilizar database.py e get_db já existentes.

O que NÃO fazer:
• Regra de negócio ou SQL no controller
• Pular camadas ou alterar database.py sem necessidade
• Colar tokens/credenciais no chat
• Inventar padrões fora do repositório

Antes de codar:
Analise o GitLab, confirme pastas, dependências e convenções do time.`,
      thinkingLabel: "Analisando repositório GitLab e absorvendo contexto…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            Analisando o repositório <strong>academico-pedra-da-galinha-school</strong> no
            GitLab: estrutura de camadas, <code className="rounded bg-muted px-1">database.py</code>,{" "}
            dependências (FastAPI, SQLAlchemy, Pydantic) e MRs recentes do módulo acadêmico.
          </p>
          <p className="font-medium">Contexto absorvido</p>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>Feature: GET /alunos/{"{id}"}/status com classificação por média</li>
            <li>Regras: &gt;7 aprovado · 4–7 recuperação · &lt;4 reprovado · 404 se sem dados</li>
            <li>Padrão do repo: repository → service → controller</li>
          </ul>
          <p className="text-muted-foreground">
            Pronto para implementar em etapas. Não vou alterar{" "}
            <code className="rounded bg-muted px-1">get_db</code> nem misturar regras de negócio
            na camada HTTP.
          </p>
        </div>
      ),
      onComplete: () => revealFiles(0),
    },
    {
      chipLabel: "Persistência: model + repository",
      text: `Implemente a camada de persistência da US-015:

• models.py — AlunoModel (tabela alunos: id, nome, media)
• repository.py — AlunoRepository.buscar_media_por_id(aluno_id) com Session SQLAlchemy

Escopo:
Apenas acesso a dados — sem regra de negócio, sem HTTP, sem DTO de resposta.
Siga imports e convenções do repositório.`,
      thinkingLabel: "Implementando alterações…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            Implementação concluída. Alterações disponíveis no repositório — revise{" "}
            <code className="rounded bg-muted px-1">models.py</code> e{" "}
            <code className="rounded bg-muted px-1">repository.py</code> no painel à esquerda.
          </p>
          <p className="text-muted-foreground">
            O repository só consulta a média por ID; regras de status ficam para o service
            no próximo passo.
          </p>
        </div>
      ),
      onComplete: () => revealFiles(1),
    },
    {
      chipLabel: "DTO + service com regras de negócio",
      text: `Implemente a camada de negócio da US-015:

• dto.py — StatusAlunoResponse (aluno_id, media, status)
• service.py — AlunoService.processar_status_aluno

Regras no service:
• média > 7 → Aprovado
• 4 ≤ média ≤ 7 → Recuperação
• média < 4 → Reprovado
• aluno ou média ausente → HTTP 404

Service delega ao AlunoRepository — sem acesso direto ao banco fora do repository.`,
      thinkingLabel: "Implementando alterações…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            Implementação concluída. Arquivos{" "}
            <code className="rounded bg-muted px-1">dto.py</code> e{" "}
            <code className="rounded bg-muted px-1">service.py</code> no repositório — você
            pode revisar as regras de negócio e o contrato de resposta.
          </p>
          <p className="text-muted-foreground">
            Fronteiras 7,0 e 4,0 estão alinhadas à especificação (7,0 → Recuperação; &gt;7 →
            Aprovado).
          </p>
        </div>
      ),
      onComplete: () => revealFiles(2),
    },
    {
      chipLabel: "Controller e endpoint REST",
      text: `Exponha a API da US-015 no controller:

• GET /alunos/{aluno_id}/status → StatusAlunoResponse
• Injetar db: Session = Depends(get_db)
• Instanciar AlunoService(db) e delegar processar_status_aluno

Controller fino:
Sem SQL, sem regra de negócio, sem 404 duplicado (o service já lança).
Prefixo /alunos e tags conforme o projeto.`,
      thinkingLabel: "Implementando alterações…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            Endpoint pronto em{" "}
            <code className="rounded bg-muted px-1">controller.py</code>. Fluxo completo
            repository → service → controller disponível no repositório para validação no MR.
          </p>
          <p className="text-muted-foreground">
            Sugestão de teste manual: IDs com média 8,0 (Aprovado), 5,5 (Recuperação), 3,0
            (Reprovado) e ID inexistente (404).
          </p>
        </div>
      ),
      onComplete: () => revealFiles(3),
    },
  ]
}

export function GitlabDevDemo() {
  const [visibleFileIds, setVisibleFileIds] = useState<RepoFileId[]>([])
  const [openAccordion, setOpenAccordion] = useState<string[]>([])

  const revealFiles = useCallback((stepIndex: number) => {
    const newIds = REVEAL_BY_STEP[stepIndex] ?? []
    if (newIds.length === 0) return

    setVisibleFileIds((prev) => {
      const merged = [...prev]
      for (const id of newIds) {
        if (!merged.includes(id)) merged.push(id)
      }
      return merged
    })
    setOpenAccordion((prev) => {
      const merged = [...prev]
      for (const id of newIds) {
        if (!merged.includes(id)) merged.push(id)
      }
      return merged
    })
  }, [])

  const steps = useMemo(() => buildGitlabSteps(revealFiles), [revealFiles])

  return (
    <HorizontalSplit
      ratio={0.5}
      className="min-h-0 flex-1 items-stretch gap-4 md:gap-6"
    >
      <HorizontalSplit.Left className="flex min-h-0 h-full w-full self-stretch">
        <RepoCodePanel
          visibleFileIds={visibleFileIds}
          openAccordion={openAccordion}
          onOpenAccordionChange={setOpenAccordion}
        />
      </HorizontalSplit.Left>
      <HorizontalSplit.Right className="flex min-h-0 h-full w-full self-stretch">
        <SlideAiChat
          title="Pedra da Galinha IA"
          steps={steps}
          emptyMessage="Descreva o contexto da feature, regras de negócio e o que vamos implementar."
        />
      </HorizontalSplit.Right>
    </HorizontalSplit>
  )
}
