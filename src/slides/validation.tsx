"use client"

import { PhaseSlide } from "@/slides/phase-slide"

export function ValidationSlide() {
  return (
    <PhaseSlide
      title="Validação de Software"
      phaseDescription="É a fase de validação e verificação (V&V). Garante que o software atenda às especificações e corresponda às expectativas do cliente."
      phaseActivities={[
        "Testes unitários, de integração, sistema e aceitação",
        "Revisões de código e testes exploratórios",
        "Automação de regressão e pipelines de CI/CD",
        "Evidências de conformidade e relatórios de qualidade",
      ]}
      aiPractices={[
        {
          title: "Geração e expansão de casos de teste",
          description:
            "A partir de requisitos e código, sugestão de cenários positivos, negativos e de borda — com curadoria e priorização humana.",
        },
        {
          title: "Automação assistida",
          description:
            "Criação de scripts E2E e API tests com IA, integrados ao framework já adotado pelo time (Playwright, Cypress, etc.).",
        },
        {
          title: "Revisão de Pull Requests",
          description:
            "Análise de diffs com foco em impacto em regressão, cobertura afetada e cenários que podem ter sido esquecidos.",
        },
        {
          title: "Testes exploratórios guiados",
          description:
            "Charters e roteiros de exploração gerados com base em áreas de risco, mudanças recentes e dados de produção.",
        },
      ]}
      callout={{
        variant: "info",
        title: "Onde a IA mais brilha — e onde exige cuidado",
        children:
          "A fase tradicional do QA ganha velocidade, mas julgamento, contexto de negócio e ética continuam sendo humanos. Nunca confio cegamente em output de LLM.",
      }}
    />
  )
}
