"use client"

import {
  SlideAiChat,
  type SlideAiChatStep,
} from "@/components/ui/slide-cn/slide-ai-chat"
import { useMemo } from "react"

function buildFunctionalTestsSteps(
  updateTestFile: (stepIndex: number) => void
): SlideAiChatStep[] {
  return [
    {
      chipLabel: "Cenário Aprovado",
      text: `Automatize um teste funcional HTTP (pytest + requests) para o cenário Aprovado da US-015:

GET /alunos/{id}/status — aluno com média > 7 deve retornar status "Aprovado" e HTTP 200.
Use aluno_id = 1 e BASE_URL http://127.0.0.1:8000/alunos`,
      thinkingLabel: "Gerando teste de aluno aprovado…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            Primeiro cenário em{" "}
            <code className="rounded bg-muted px-1">
              tests/test_api_status_aluno.py
            </code>{" "}
            — padrão Arrange / Act / Assert. Revise no painel à esquerda.
          </p>
        </div>
      ),
      onComplete: () => updateTestFile(0),
    },
    {
      chipLabel: "Cenário Recuperação",
      text: `Adicione o teste funcional para Recuperação: média entre 4 e 7 (inclusive), status "Recuperação", HTTP 200. Use aluno_id = 2.`,
      thinkingLabel: "Gerando teste de recuperação…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            Segundo cenário adicionado ao mesmo arquivo — arquivo atualizado no
            painel.
          </p>
        </div>
      ),
      onComplete: () => updateTestFile(1),
    },
    {
      chipLabel: "Cenário Reprovado",
      text: `Adicione o teste funcional para Reprovado: média < 4, status "Reprovado", HTTP 200. Use aluno_id = 3.`,
      thinkingLabel: "Gerando teste de reprovado…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>Terceiro cenário — cobre a faixa de reprovação no painel.</p>
        </div>
      ),
      onComplete: () => updateTestFile(2),
    },
    {
      chipLabel: "Aluno não encontrado (404)",
      text: `Adicione teste funcional para aluno inexistente: GET com aluno_id = 9999 deve retornar HTTP 404 e mensagem clara no campo detail.`,
      thinkingLabel: "Gerando teste de erro 404…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            Quarto cenário adicionado — arquivo completo com os quatro testes no
            painel.
          </p>
        </div>
      ),
      onComplete: () => updateTestFile(3),
    },
    {
      chipLabel: "Remover duplicação (DRY)",
      text: `Revise o arquivo de testes funcionais da US-015: remova código duplicado, extraia helpers reutilizáveis e aplique boas práticas (DRY, funções auxiliares claras).`,
      thinkingLabel: "Refatorando testes e aplicando DRY…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            Refatoração aplicada: <code>realizar_requisicao_status</code> e{" "}
            <code>validar_resposta_sucesso</code> centralizam o fluxo repetido —
            veja a versão final no painel.
          </p>
          <p className="text-muted-foreground">
            Cada teste ficou focado na regra específica da média; menos ruído e
            manutenção mais simples no CI.
          </p>
        </div>
      ),
      onComplete: () => updateTestFile(4),
    },
  ]
}

export type FunctionalTestsAiChatProps = {
  onUpdateTestFile: (stepIndex: number) => void
}

export function FunctionalTestsAiChat({
  onUpdateTestFile,
}: FunctionalTestsAiChatProps) {
  const steps = useMemo(
    () => buildFunctionalTestsSteps(onUpdateTestFile),
    [onUpdateTestFile]
  )

  return (
    <SlideAiChat
      title="Pedra da Galinha IA"
      steps={steps}
      emptyMessage="Automatize cenários HTTP da API de status do aluno (Aprovado, Recuperação, Reprovado…)."
    />
  )
}
