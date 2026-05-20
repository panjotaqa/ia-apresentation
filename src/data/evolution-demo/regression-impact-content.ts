/** Conteúdo das respostas do chat de impacto em regressão (US-015) */

export const CHANGE_SCENARIO = {
  title: "Mudança hipotética no release 2.1",
  description:
    "Novo critério: média exatamente 7,0 passa a ser Aprovado (antes era Recuperação). Limite de recuperação permanece 4,0–7,0 exclusivo no limite superior.",
  rules: [
    "Média > 7,0 → Aprovado (inalterado)",
    "Média = 7,0 → Aprovado (NOVO — antes Recuperação)",
    "4,0 ≤ média < 7,0 → Recuperação",
    "Média < 4,0 → Reprovado",
  ],
} as const

export const IMPACT_LAYERS = [
  {
    layer: "service.py",
    risk: "Alta",
    reason:
      "Regra de classificação alterada — fronteiras 7,0 e comparações if/elif",
  },
  {
    layer: "dto.py",
    risk: "Baixa",
    reason: "Contrato JSON inalterado (aluno_id, media, status)",
  },
  {
    layer: "repository.py",
    risk: "Nenhuma",
    reason: "Persistência não muda — só consulta média",
  },
  {
    layer: "controller.py",
    risk: "Baixa",
    reason: "Delegação mantida — validar smoke do endpoint",
  },
  {
    layer: "tests/test_service.py",
    risk: "Alta",
    reason: "CT-04 (média 7,0) e asserts de fronteira precisam atualizar",
  },
  {
    layer: "tests/test_api_status_aluno.py",
    risk: "Alta",
    reason: "Cenário com média 7,0 deve esperar Aprovado, não Recuperação",
  },
] as const

export const MIN_REGRESSION_SUITE = [
  {
    id: "CT-04",
    type: "Unit · service",
    priority: "Obrigatório",
    note: "assert média 7,0 → Aprovado",
  },
  {
    id: "CT-02",
    type: "Unit + HTTP",
    priority: "Obrigatório",
    note: "Recuperação em 5,5 — não regredir faixa 4–7",
  },
  {
    id: "CT-01",
    type: "HTTP",
    priority: "Recomendado",
    note: "Smoke Aprovado > 7",
  },
  {
    id: "CT-06",
    type: "HTTP",
    priority: "Recomendado",
    note: "404 inalterado — regressão de contrato de erro",
  },
] as const

export const SKIP_RISKS = [
  "Pular CT-04: release pode aprovar aluno com 7,0 incorretamente em produção",
  "Pular testes HTTP: divergência entre service e API exposta ao coordenador",
  "Não rodar suite completa: mudança pequena mas em regra crítica de negócio",
] as const
