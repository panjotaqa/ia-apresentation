"use client"

import {
  SlideAiChat,
  type SlideAiChatStep,
} from "@/components/ui/slide-cn/slide-ai-chat"
import { useMemo } from "react"

function buildCodeSmellSteps(
  updateServiceFile: (stepIndex: number) => void
): SlideAiChatStep[] {
  return [
    {
      chipLabel: "Identificar code smells",
      text: `Contexto: US-015 em produção no repositório academico-pedra-da-galinha-school.
Arquivo em foco: service.py (AlunoService.processar_status_aluno).

Analise o código atual e liste code smells relevantes (números mágicos, método longo, comentários óbvios, responsabilidade misturada). Priorize o que impacta manutenção e testes.`,
      thinkingLabel: "Analisando service.py e identificando code smells…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            Revisei <code className="rounded bg-muted px-1">service.py</code> no
            painel — o comportamento está correto, mas há débito técnico claro.
          </p>
          <p className="font-medium">Code smells encontrados</p>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>
              <strong>Números mágicos</strong> — <code>7.0</code> e{" "}
              <code>4.0</code> sem constantes nomeadas
            </li>
            <li>
              <strong>Comentários redundantes</strong> — narram o óbvio (
              &quot;busca média&quot;, &quot;monta resposta&quot;)
            </li>
            <li>
              <strong>Classificação inline</strong> — bloco if/elif longo no
              método público; difícil testar regra isolada
            </li>
            <li>
              <strong>String duplicada</strong> — mensagem de erro poderia ser
              constante reutilizável
            </li>
          </ul>
          <p className="text-muted-foreground">
            Próximo passo: refatorar sem alterar comportamento observável da API.
          </p>
        </div>
      ),
      onComplete: () => updateServiceFile(0),
    },
    {
      chipLabel: "Refatorar service",
      text: `Refatore service.py da US-015 aplicando boas práticas:

• Extrair LIMITE_APROVACAO e LIMITE_RECUPERACAO
• Extrair _classificar_por_media(media) com a mesma semântica atual (>7 Aprovado, 4–7 Recuperação, <4 Reprovado)
• Centralizar mensagem de erro 404
• Remover comentários que não agregam
• Manter assinatura pública de processar_status_aluno`,
      thinkingLabel: "Refatorando e aplicando clean code…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            Refatoração aplicada em{" "}
            <code className="rounded bg-muted px-1">service.py</code> — veja a
            versão atualizada no painel.
          </p>
          <p className="font-medium">O que mudou</p>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>
              Constantes <code>LIMITE_APROVACAO</code> e{" "}
              <code>LIMITE_RECUPERACAO</code>
            </li>
            <li>
              Método privado <code>_classificar_por_media</code> — regra testável
              isoladamente
            </li>
            <li>
              <code>MSG_ALUNO_SEM_MEDIA</code> centralizada
            </li>
            <li>
              <code>processar_status_aluno</code> ficou orquestração fina
            </li>
          </ul>
          <p className="text-muted-foreground">
            Comportamento preservado: mesmas fronteiras 7,0 e 4,0 inclusive.
          </p>
        </div>
      ),
      onComplete: () => updateServiceFile(1),
    },
    {
      chipLabel: "Validar regressão",
      text: `Após a refatoração de service.py (sem mudança de regra de negócio), quais testes da US-015 devem continuar passando?

Confirme alinhamento com CT-01 a CT-06 e se algum teste unitário de borda precisa ser executado antes do merge do hotfix.`,
      thinkingLabel: "Cruzando refatoração com suíte de testes…",
      response: (
        <div className="space-y-3 text-sm leading-relaxed md:text-base">
          <p>
            Refatoração <strong>sem mudança funcional</strong> — a suíte
            existente deve permanecer verde.
          </p>
          <p className="font-medium">Validação recomendada</p>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>
              <code>test_service.py</code> — todos os cenários de status e 404
            </li>
            <li>
              CT-04 e CT-05 (médias 7,0 e 4,0) — críticos após extrair
              classificação
            </li>
            <li>
              <code>test_api_status_aluno.py</code> — smoke HTTP após deploy
            </li>
          </ul>
          <p className="rounded-lg border border-orange-500/30 bg-orange-500/5 px-3 py-2 text-muted-foreground">
            <strong className="text-foreground">QA:</strong> rode a pipeline
            completa; refatoração pura não dispensa regressão — só reduz risco
            de quebra futura.
          </p>
        </div>
      ),
      onComplete: () => updateServiceFile(2),
    },
  ]
}

export type EvolutionCodeSmellAiChatProps = {
  onUpdateServiceFile: (stepIndex: number) => void
}

export function EvolutionCodeSmellAiChat({
  onUpdateServiceFile,
}: EvolutionCodeSmellAiChatProps) {
  const steps = useMemo(
    () => buildCodeSmellSteps(onUpdateServiceFile),
    [onUpdateServiceFile]
  )

  return (
    <SlideAiChat
      title="Pedra da Galinha IA"
      steps={steps}
      emptyMessage="Peça análise de code smells e refatoração segura no service.py da US-015."
    />
  )
}
