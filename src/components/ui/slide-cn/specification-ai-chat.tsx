"use client"

import {
  SlideAiChat,
  type SlideAiChatStep,
} from "@/components/ui/slide-cn/slide-ai-chat"

const SPECIFICATION_STEPS: SlideAiChatStep[] = [
  {
    text: "crie um template de história de usuário com objetivo, critérios de aceite, detalhamento técnico, regras de negócio e informações extras — algo reutilizável pelo time em refinamentos",
    response: (
      <div className="space-y-4 text-sm leading-relaxed md:text-base">
        <p>
          Claro! Montei um template reutilizável para o time preencher em
          refinamentos — com as seções que você pediu e espaço para o QA
          antecipar testes ainda na especificação.
        </p>
        <div className="space-y-3 rounded-lg border border-border/60 bg-muted/30 p-4">
          <p className="font-semibold">📝 História de Usuário: [Título descritivo]</p>
          <p>
            <span className="text-muted-foreground">ID:</span> US-00X ·{" "}
            <span className="text-muted-foreground">Épico:</span> [Nome] ·{" "}
            <span className="text-muted-foreground">Prioridade:</span> Alta / Média / Baixa
          </p>
          <p className="font-medium">🎯 Objetivo</p>
          <p className="text-muted-foreground">
            Qual problema resolve, para quem e qual resultado de negócio se
            espera após a entrega.
          </p>
          <p className="font-medium">👤 User Story</p>
          <p>
            <strong>Como</strong> [persona], <strong>eu quero</strong> [ação],{" "}
            <strong>para que</strong> [benefício].
          </p>
          <p className="font-medium">📐 Regras de negócio</p>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>Pré-condições: o que precisa ser verdade antes da ação</li>
            <li>Restrições: limites legais, técnicos ou operacionais</li>
            <li>Dependências: integrações, aprovações ou dados necessários</li>
          </ul>
          <p className="font-medium">✅ Critérios de aceite (Given / When / Then)</p>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              <strong>Dado</strong> [contexto], <strong>quando</strong> [ação],{" "}
              <strong>então</strong> [resultado observável].
            </li>
            <li>
              <strong>Dado</strong> [exceção], <strong>quando</strong> [ação inválida],{" "}
              <strong>então</strong> [mensagem ou comportamento de erro].
            </li>
          </ul>
          <p className="font-medium">🧪 Notas para QA e riscos</p>
          <p className="text-muted-foreground">
            Dados de teste sugeridos, ambiguidades a validar com o PO e o que
            cobrir em API, UI e relatórios.
          </p>
        </div>
        <p className="text-muted-foreground">
          Se quiser, no próximo passo posso preencher este template com um caso
          real do seu domínio — é só me dizer o fluxo.
        </p>
      </div>
    ),
  },
  {
    text: "usando esse template, escreva uma história de usuário completa: o coordenador acadêmico consulta a situação do aluno (aprovado, recuperação ou reprovado) informando a média final",
    response: (
      <div className="space-y-4 text-sm leading-relaxed md:text-base">
        <p>
          Perfeito! Preenchi o template para o fluxo acadêmico — cada seção
          pensada para refinamento com produto, dev e QA, incluindo detalhamento
          técnico e pontos de teste.
        </p>
        <div className="space-y-2 rounded-lg border border-border/60 bg-muted/30 p-4">
          <p className="font-semibold">🎓 US-015 — Consultar situação de aprovação do aluno</p>
          <p>
            <span className="text-muted-foreground">Épico:</span> Gestão acadêmica ·{" "}
            <span className="text-muted-foreground">Prioridade:</span> Alta
          </p>
          <p className="font-medium">🎯 User Story</p>
          <p>
            <strong>Como</strong> coordenador acadêmico autenticado,
            <br />
            <strong>eu quero</strong> informar a média final do aluno e visualizar
            sua situação (aprovado, recuperação ou reprovado),
            <br />
            <strong>para que</strong> eu oriente o próximo passo do aluno com
            agilidade e consistência institucional.
          </p>
          <p className="font-medium">📐 Regras de negócio vinculadas</p>
          <ul className="list-inside list-disc space-y-1 text-muted-foreground">
            <li>Média &gt; 7 → status <strong>Aprovado</strong></li>
            <li>Média de 4 a 7 (inclusive) → status <strong>Recuperação</strong></li>
            <li>Média &lt; 4 → status <strong>Reprovado</strong></li>
            <li>Valores fora de 0–10 ou não numéricos → erro de validação</li>
          </ul>
        </div>
        <p className="font-medium">✅ Critérios de aceite detalhados</p>
        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
          <li>
            <strong>Dado</strong> média 8,0, <strong>quando</strong> consulto a
            situação, <strong>então</strong> o sistema exibe{" "}
            <strong>Aprovado</strong> em destaque e registra a consulta em log de
            auditoria.
          </li>
          <li>
            <strong>Dado</strong> média 5,5, <strong>quando</strong> consulto,{" "}
            <strong>então</strong> exibe <strong>Recuperação</strong> com texto de
            orientação (ex.: disciplinas elegíveis à recuperação).
          </li>
          <li>
            <strong>Dado</strong> média 3,0, <strong>quando</strong> consulto,{" "}
            <strong>então</strong> exibe <strong>Reprovado</strong> e impede ações
            de matrícula em novos cursos.
          </li>
          <li>
            <strong>Dado</strong> campo vazio ou inválido, <strong>quando</strong>{" "}
            envio, <strong>então</strong> mensagem: &quot;Informe uma média entre 0 e
            10&quot;.
          </li>
        </ul>
        <p className="text-muted-foreground">
          Recomendo validar fronteiras: 7,0 / 7,1 / 4,0 / 3,9 e a política de
          arredondamento (uma casa decimal) antes do go-live.
        </p>
      </div>
    ),
  },
  {
    text: "explique as regras de negócio da classificação por média: limites numéricos, casos de borda, mensagens de erro e checklist do que o QA deve validar antes do go-live",
    response: (
      <div className="space-y-4 text-sm leading-relaxed md:text-base">
        <p>
          Com prazer! Consolidei as regras de classificação por média final e o
          que o QA precisa cobrir antes do go-live — incluindo fronteiras,
          mensagens de erro e auditoria.
        </p>
        <p className="font-medium">📊 Tabela de classificação</p>
        <ul className="space-y-3">
          <li>
            <strong className="text-emerald-600 dark:text-emerald-400">Aprovado</strong>
            <br />
            Média <strong>&gt; 7</strong> (estritamente maior que 7). Ex.: 7,1 e
            10,0 são aprovados; <strong>7,0 exatamente</strong> cai em recuperação.
          </li>
          <li>
            <strong className="text-amber-600 dark:text-amber-400">Recuperação</strong>
            <br />
            Média <strong>≥ 4 e ≤ 7</strong> (inclusive nos dois limites). O aluno
            pode seguir o fluxo de recuperação conforme política da instituição.
          </li>
          <li>
            <strong className="text-red-600 dark:text-red-400">Reprovado</strong>
            <br />
            Média <strong>&lt; 4</strong>. Sem direito automático à recuperação
            pelo sistema.
          </li>
        </ul>
        <p className="font-medium">⚠️ Casos especiais (importante para o QA)</p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li>Valores negativos, acima de 10 ou não numéricos → erro, sem classificar.</li>
          <li>Definir regra de arredondamento antes do go-live (ex.: 6,75 → 6,8).</li>
          <li>Registrar auditoria: média, status calculado, usuário e timestamp.</li>
        </ul>
        <p className="font-medium">📌 Exemplos rápidos</p>
        <p className="text-muted-foreground">
          8,0 → Aprovado · 5,5 → Recuperação · 3,0 → Reprovado · 7,0 → Recuperação
        </p>
        <p className="text-muted-foreground">
          Se precisar, posso montar uma matriz de decisão em formato de tabela de
          testes ou um diagrama de estados para anexar à especificação.
        </p>
      </div>
    ),
  },
]

export function SpecificationAiChat() {
  return (
    <SlideAiChat title="Pedra da Galinha IA" steps={SPECIFICATION_STEPS} />
  )
}
