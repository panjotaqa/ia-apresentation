"use client"

import { PhaseSlide } from "@/slides/phase-slide"

export function EvolutionSlide() {
  return (
    <PhaseSlide
      title="Evolução de Software"
      phaseDescription="É a fase da manutenção. Como o mundo muda, o software precisa mudar junto para continuar sendo útil."
      phaseActivities={[
        "Correção de erros pós-lançamento (hotfixes)",
        "Adaptação a novos ambientes e dependências",
        "Inclusão de novas funcionalidades demandadas pelo mercado",
        "Refatoração e redução de débito técnico",
      ]}
      aiPractices={[
        {
          title: "Análise de impacto em regressão",
          description:
            "Mapeamento de áreas afetadas por uma mudança e sugestão de suíte mínima de testes para validar o release com segurança.",
        },
        {
          title: "Priorização inteligente de testes",
          description:
            "Uso de histórico de falhas, cobertura e métricas de produção para focar esforço onde o risco é maior.",
        },
        {
          title: "Monitoramento e qualidade em produção",
          description:
            "Apoio na interpretação de logs, alertas e feedback de usuários para transformar incidentes em casos de regressão.",
        },
        {
          title: "Documentação viva",
          description:
            "Atualização assistida de runbooks, notas de release e cenários de teste quando features evoluem.",
        },
      ]}
      callout={{
        variant: "success",
        title: "Qualidade contínua",
        children:
          "A evolução não é 'fim do projeto' — é onde o QA prova valor de longo prazo, mantendo confiança do cliente release após release.",
      }}
    />
  )
}
