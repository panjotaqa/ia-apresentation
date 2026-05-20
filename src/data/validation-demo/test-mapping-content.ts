/** Conteúdo estruturado das respostas do chat de mapeamento (US-015) */

export const US015_REQUIREMENTS_SUMMARY = {
  id: "US-015",
  title: "Consultar situação de aprovação do aluno",
  rules: [
    "Média > 7,0 → Aprovado",
    "4,0 ≤ média ≤ 7,0 → Recuperação",
    "Média < 4,0 → Reprovado",
    "Aluno inexistente ou sem média → HTTP 404 com mensagem clara",
    "Regras de negócio no service; controller fino; persistência no repository",
  ],
} as const

export const MAPPED_TEST_CASES = [
  {
    id: "CT-01",
    title: "Aluno aprovado (média > 7)",
    type: "Funcional · API",
    priority: "Alta",
    gwt: "Dado aluno id=1 com média 8,0 → GET /alunos/1/status → 200, status Aprovado",
  },
  {
    id: "CT-02",
    title: "Aluno em recuperação (4 ≤ média ≤ 7)",
    type: "Funcional · API",
    priority: "Alta",
    gwt: "Dado aluno id=2 com média 5,5 → GET → 200, status Recuperação",
  },
  {
    id: "CT-03",
    title: "Aluno reprovado (média < 4)",
    type: "Funcional · API",
    priority: "Alta",
    gwt: "Dado aluno id=3 com média 3,0 → GET → 200, status Reprovado",
  },
  {
    id: "CT-04",
    title: "Limite exato 7,0 → Recuperação",
    type: "Borda · API",
    priority: "Alta",
    gwt: "Dado média exatamente 7,0 → status Recuperação (não Aprovado)",
  },
  {
    id: "CT-05",
    title: "Limite exato 4,0 → Recuperação",
    type: "Borda · API",
    priority: "Alta",
    gwt: "Dado média exatamente 4,0 → status Recuperação (não Reprovado)",
  },
  {
    id: "CT-06",
    title: "Aluno inexistente",
    type: "Negativo · API",
    priority: "Alta",
    gwt: "Dado id=9999 → GET → 404, detail com mensagem clara",
  },
  {
    id: "CT-07",
    title: "Aluno sem média cadastrada",
    type: "Negativo · API",
    priority: "Média",
    gwt: "Dado aluno existente com media NULL → 404",
  },
  {
    id: "CT-08",
    title: "Contrato do DTO",
    type: "Contrato · API",
    priority: "Média",
    gwt: "Resposta JSON com aluno_id, media, status (tipos corretos)",
  },
  {
    id: "CT-09",
    title: "Regra no service (não no controller)",
    type: "Arquitetura · Unit",
    priority: "Alta",
    gwt: "Classificação testada em AlunoService com repository mockado",
  },
  {
    id: "CT-10",
    title: "Repository sem regra de negócio",
    type: "Arquitetura · Unit",
    priority: "Média",
    gwt: "buscar_media_por_id retorna float ou None — sem status",
  },
] as const

export const CODE_TRACEABILITY = [
  { caseId: "CT-01", status: "ok" as const, evidence: "service.py: media > 7.0 → Aprovado" },
  { caseId: "CT-02", status: "ok" as const, evidence: "service.py: 4.0 <= media <= 7.0" },
  { caseId: "CT-03", status: "ok" as const, evidence: "service.py: media < 4.0 → Reprovado" },
  { caseId: "CT-04", status: "ok" as const, evidence: "Limite 7,0 incluso em Recuperação (<= 7)" },
  { caseId: "CT-05", status: "ok" as const, evidence: "Limite 4,0 incluso em Recuperação (>= 4)" },
  { caseId: "CT-06", status: "ok" as const, evidence: "HTTPException 404 + detail no service" },
  { caseId: "CT-07", status: "ok" as const, evidence: "if media is None → 404" },
  { caseId: "CT-08", status: "ok" as const, evidence: "dto.py StatusAlunoResponse" },
  { caseId: "CT-09", status: "ok" as const, evidence: "controller delega; regras só em service.py" },
  { caseId: "CT-10", status: "ok" as const, evidence: "repository.py retorna apenas media" },
] as const

export const UNIT_TEST_TRACEABILITY = [
  { caseId: "CT-01", covered: true, file: "test_service.py", note: "test_aprovado" },
  { caseId: "CT-02", covered: true, file: "test_service.py", note: "test_recuperacao" },
  { caseId: "CT-03", covered: true, file: "test_service.py", note: "test_reprovado" },
  { caseId: "CT-04", covered: false, file: "—", note: "Falta assert explícito média=7,0" },
  { caseId: "CT-05", covered: false, file: "—", note: "Falta assert explícito média=4,0" },
  { caseId: "CT-06", covered: true, file: "test_service.py", note: "test_404_sem_media" },
  { caseId: "CT-07", covered: true, file: "test_repository.py", note: "retorno None" },
  { caseId: "CT-08", covered: true, file: "test_controller.py", note: "campos do DTO" },
  { caseId: "CT-09", covered: true, file: "test_service.py", note: "mock do repository" },
  { caseId: "CT-10", covered: true, file: "test_repository.py", note: "sem assert de status" },
] as const

export const QA_GAPS = [
  "CT-04 e CT-05: adicionar testes de borda no service (média 7,0 e 4,0)",
  "Testes funcionais HTTP para CT-01 a CT-06 (pytest + requests)",
  "CT-07: validar com dado de seed no ambiente de integração",
  "Documentar IDs de aluno de teste (1, 2, 3, 9999) no README do QA",
] as const
