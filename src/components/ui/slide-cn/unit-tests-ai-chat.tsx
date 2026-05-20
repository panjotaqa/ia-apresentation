"use client"

import {
  SlideAiChat,
  type SlideAiChatStep,
} from "@/components/ui/slide-cn/slide-ai-chat"
import { useMemo } from "react"

function buildUnitTestsSteps(
  revealTests: (stepIndex: number) => void
): SlideAiChatStep[] {
  return [
    {
      chipLabel: "Testes do repository",
      text: `Com base no código da US-015 (Pedra da Galinha School), gere testes unitários para a camada repository (AlunoRepository.buscar_media_por_id).

Use pytest e mocks — sem banco real. Cubra aluno existente com média e aluno inexistente.`,
      thinkingLabel: "Gerando testes unitários do repository…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            <code className="rounded bg-muted px-1">tests/test_repository.py</code>{" "}
            gerado — mocks do SQLAlchemy, sem banco real. Revise no painel à
            esquerda.
          </p>
          <p className="text-muted-foreground">
            Cobertura: média retornada para aluno existente e{" "}
            <code>None</code> quando o ID não existe.
          </p>
        </div>
      ),
      onComplete: () => revealTests(0),
    },
    {
      chipLabel: "Testes do service",
      text: `Gere testes unitários para AlunoService.processar_status_aluno com as regras: >7 Aprovado, 4–7 Recuperação, <4 Reprovado e 404 sem média.`,
      thinkingLabel: "Gerando testes unitários do service…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            <code className="rounded bg-muted px-1">tests/test_service.py</code>{" "}
            no repositório — repository mockado, foco nas regras de negócio e
            HTTP 404.
          </p>
          <p className="text-muted-foreground">
            Fronteiras 7,0 e 4,0 cobertas com asserts de status.
          </p>
        </div>
      ),
      onComplete: () => revealTests(1),
    },
    {
      chipLabel: "Testes do controller",
      text: `Gere testes unitários para o endpoint GET /alunos/{aluno_id}/status no controller — validando delegação ao service e retorno do DTO.`,
      thinkingLabel: "Gerando testes unitários do controller…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            <code className="rounded bg-muted px-1">tests/test_controller.py</code>{" "}
            disponível no painel. Em produção, use{" "}
            <code>dependency_overrides</code> do FastAPI para injetar o service
            mockado.
          </p>
          <p className="text-muted-foreground">
            Pirâmide de testes: estes unitários são a base — rápidos e sem subir
            a API.
          </p>
        </div>
      ),
      onComplete: () => revealTests(2),
    },
  ]
}

export type UnitTestsAiChatProps = {
  onRevealTests: (stepIndex: number) => void
}

export function UnitTestsAiChat({ onRevealTests }: UnitTestsAiChatProps) {
  const steps = useMemo(
    () => buildUnitTestsSteps(onRevealTests),
    [onRevealTests]
  )

  return (
    <SlideAiChat
      title="Pedra da Galinha IA"
      steps={steps}
      emptyMessage="Peça testes unitários por camada (repository, service, controller)."
    />
  )
}
