"use client"

import { CodeBlock } from "@/components/ui/slide-cn/code-block"
import {
  SlideAiChat,
  type SlideAiChatStep,
} from "@/components/ui/slide-cn/slide-ai-chat"

const SCHEMA_QUERY = `SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table,
  ccu.column_name AS foreign_column
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
ORDER BY tc.table_name;`

const DATABASE_MCP_STEPS: SlideAiChatStep[] = [
  {
    chipLabel: "Tabelas e relacionamentos",
    text: `Conectado ao PostgreSQL do Pedra da Galinha School via MCP.

Explique as principais tabelas do schema acadêmico e como elas se relacionam entre si (FKs, cardinalidade e fluxo de dados).`,
    thinkingLabel: "Consultando schema via MCP…",
    response: (
      <div className="space-y-3 text-sm leading-relaxed md:text-base">
        <p>
          Consultei o schema via MCP. O núcleo do domínio acadêmico gira em torno
          de <strong>provas</strong>, <strong>notas</strong> e os cadastros de{" "}
          <strong>alunos</strong> e <strong>professores</strong>.
        </p>
        <p className="font-medium">Tabelas principais</p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li>
            <code className="rounded bg-muted px-1">alunos</code> — cadastro do
            aluno
          </li>
          <li>
            <code className="rounded bg-muted px-1">professores</code> — quem
            ministra e lança notas
          </li>
          <li>
            <code className="rounded bg-muted px-1">disciplinas</code> — matérias
            ofertadas
          </li>
          <li>
            <code className="rounded bg-muted px-1">provas</code> — avaliações
            vinculadas a uma disciplina
          </li>
          <li>
            <code className="rounded bg-muted px-1">notas</code> — nota de cada
            aluno em cada prova (tabela de associação)
          </li>
        </ul>
        <p className="font-medium">Relacionamentos</p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li>
            <code>provas.disciplina_id</code> → <code>disciplinas.id</code> (N:1)
          </li>
          <li>
            <code>notas.aluno_id</code> → <code>alunos.id</code> (N:1)
          </li>
          <li>
            <code>notas.prova_id</code> → <code>provas.id</code> (N:1)
          </li>
          <li>
            <code>notas.professor_id</code> → <code>professores.id</code> (N:1)
          </li>
        </ul>
        <p className="text-muted-foreground">
          Cada linha em <code>notas</code> representa a nota de um aluno em uma
          prova específica — é assim que aluno e prova se conectam no modelo.
        </p>
        </div>
      ),
    },
    {
      chipLabel: "Campo da nota do aluno",
    text: `Qual campo do banco é responsável por registrar a nota do aluno?`,
    thinkingLabel: "Localizando colunas de nota…",
    response: (
      <div className="space-y-3 text-sm leading-relaxed md:text-base">
        <p>
          A <strong>nota da avaliação</strong> fica em{" "}
          <code className="rounded bg-muted px-1">notas.valor</code>{" "}
          (<code>NUMERIC(4,1)</code>, ex.: 8,5).
        </p>
        <p className="text-muted-foreground">
          Chave composta lógica: <code>aluno_id</code> + <code>prova_id</code>{" "}
          identificam de qual avaliação aquela nota é. Há índice único em{" "}
          <code>(aluno_id, prova_id)</code> para evitar duplicidade.
        </p>
        <p className="font-medium">Consulta de exemplo (read-only)</p>
        <CodeBlock
          code={`SELECT a.nome, p.titulo AS prova, n.valor
FROM notas n
JOIN alunos a ON a.id = n.aluno_id
JOIN provas p ON p.id = n.prova_id
WHERE a.id = 1;`}
          language="sql"
        />
        <p className="text-muted-foreground">
          A coluna <code>alunos.media</code> pode existir como média consolidada —
          mas o lançamento por prova sempre passa por <code>notas.valor</code>.
        </p>
      </div>
    ),
  },
  {
    chipLabel: "Professor que lançou a nota",
    text: `Qual campo registra o professor que passou a nota do aluno?`,
    thinkingLabel: "Rastreando responsável pelo lançamento…",
    response: (
      <div className="space-y-3 text-sm leading-relaxed md:text-base">
        <p>
          O professor que <strong>registrou a nota</strong> fica em{" "}
          <code className="rounded bg-muted px-1">notas.professor_id</code>, FK
          para <code>professores.id</code>.
        </p>
        <p className="text-muted-foreground">
          <code>notas.criado_em</code> registra quando o lançamento foi feito —
          útil para auditoria e testes de rastreabilidade.
        </p>
        <p className="font-medium">Consulta de exemplo</p>
        <CodeBlock
          code={`SELECT a.nome AS aluno,
       pr.nome AS professor,
       n.valor,
       n.criado_em
FROM notas n
JOIN alunos a ON a.id = n.aluno_id
JOIN professores pr ON pr.id = n.professor_id
WHERE n.prova_id = 12;`}
          language="sql"
        />
        <p className="text-muted-foreground">
          Para QA: validar que todo registro em <code>notas</code> tem{" "}
          <code>professor_id</code> preenchido e que o professor existe em{" "}
          <code>professores</code>.
        </p>
      </div>
    ),
  },
  {
    chipLabel: "Provas e vínculo com alunos",
    text: `Qual tabela registra uma prova e como ela se relaciona com cada aluno?`,
    thinkingLabel: "Mapeando provas e vínculos com alunos…",
    response: (
      <div className="space-y-3 text-sm leading-relaxed md:text-base">
        <p>
          A prova em si fica em{" "}
          <code className="rounded bg-muted px-1">provas</code> (
          <code>titulo</code>, <code>data_prova</code>,{" "}
          <code>disciplina_id</code>, <code>peso</code>).
        </p>
        <p className="font-medium">Como liga cada aluno</p>
        <p className="text-muted-foreground">
          Não há FK direta de <code>provas</code> para <code>alunos</code>. O
          vínculo é <strong>N:N via</strong>{" "}
          <code className="rounded bg-muted px-1">notas</code>: uma linha por
          par (aluno, prova) com o <code>valor</code> daquela avaliação.
        </p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li>1 prova → N linhas em notas (uma por aluno que fez a prova)</li>
          <li>1 aluno → N linhas em notas (uma por prova que realizou)</li>
        </ul>
        <p className="font-medium">Consulta: alunos de uma prova</p>
        <CodeBlock
          code={`SELECT a.id, a.nome, n.valor, n.professor_id
FROM provas p
JOIN notas n ON n.prova_id = p.id
JOIN alunos a ON a.id = n.aluno_id
WHERE p.id = 12
ORDER BY a.nome;`}
          language="sql"
        />
        <p className="text-muted-foreground">
          Para listar FKs do schema via MCP, use algo como a query de{" "}
          <code>information_schema</code> abaixo (somente leitura).
        </p>
        <CodeBlock code={SCHEMA_QUERY} language="sql" />
      </div>
    ),
  },
]

export function DatabaseMcpAiChat() {
  return (
    <SlideAiChat
      title="Pedra da Galinha IA"
      steps={DATABASE_MCP_STEPS}
      emptyMessage="Pergunte sobre tabelas, relacionamentos, notas, professores ou provas no banco."
    />
  )
}
