"use client"

import { CodeBlock } from "@/components/ui/slide-cn/code-block"
import {
  SlideAiChat,
  type SlideAiChatStep,
} from "@/components/ui/slide-cn/slide-ai-chat"

const CURL_EXAMPLE = `curl -X GET "http://localhost:8000/alunos/1/status" \\
  -H "Accept: application/json"`

const GITLAB_CONSULT_STEPS: SlideAiChatStep[] = [
  {
    chipLabel: "Cadastro de notas — arquivos e SQL",
    text: `No repositório acadêmico Pedra da Galinha School (GitLab), onde está o cadastro de notas do aluno?

Quero saber:
• quais arquivos persistem a nota/média
• qual consulta SQL o repository executa para buscar essa informação`,
    thinkingLabel: "Consultando GitLab e mapeando persistência…",
    response: (
      <div className="space-y-3 text-sm leading-relaxed md:text-base">
        <p>
          No GitLab, a <strong>nota do aluno</strong> fica na coluna{" "}
          <code className="rounded bg-muted px-1">media</code> da tabela{" "}
          <code className="rounded bg-muted px-1">alunos</code>, modelada em{" "}
          <code className="rounded bg-muted px-1">models.py</code>.
        </p>
        <p className="font-medium">Arquivos envolvidos</p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li>
            <code className="rounded bg-muted px-1">models.py</code> —{" "}
            <code>AlunoModel</code> com <code>id</code>, <code>nome</code>,{" "}
            <code>media</code> (média/nota cadastrada)
          </li>
          <li>
            <code className="rounded bg-muted px-1">repository.py</code> —{" "}
            <code>AlunoRepository.buscar_media_por_id</code>
          </li>
        </ul>
        <p className="font-medium">SQL equivalente (via SQLAlchemy)</p>
        <p className="text-muted-foreground">
          O repository faz um{" "}
          <code className="rounded bg-muted px-1">
            SELECT media FROM alunos WHERE id = :aluno_id
          </code>{" "}
          — retorna <code>None</code> se o aluno não existir ou não tiver média.
        </p>
      </div>
    ),
  },
  {
    chipLabel: "Regras de negócio no service",
    text: `Depois que a nota está cadastrada, como o service trata as regras de negócio da classificação do aluno?`,
    thinkingLabel: "Analisando service e regras de negócio…",
    response: (
      <div className="space-y-3 text-sm leading-relaxed md:text-base">
        <p>
          A regra de negócio fica em{" "}
          <code className="rounded bg-muted px-1">service.py</code>, método{" "}
          <code>processar_status_aluno</code> — o controller não classifica.
        </p>
        <p className="font-medium">Fluxo</p>
        <ol className="list-inside list-decimal space-y-1 text-muted-foreground">
          <li>Busca a média via <code>AlunoRepository</code></li>
          <li>
            Se <code>media is None</code> → HTTP 404 com mensagem clara
          </li>
          <li>Classifica conforme a média cadastrada</li>
        </ol>
        <p className="font-medium">Regras aplicadas</p>
        <ul className="list-inside list-disc space-y-1 text-muted-foreground">
          <li>
            <strong>Média &gt; 7,0</strong> → status <strong>Aprovado</strong>
          </li>
          <li>
            <strong>4,0 ≤ média ≤ 7,0</strong> → <strong>Recuperação</strong>
          </li>
          <li>
            <strong>Média &lt; 4,0</strong> → status <strong>Reprovado</strong>
          </li>
        </ul>
        <p className="text-muted-foreground">
          O contrato de resposta está em{" "}
          <code className="rounded bg-muted px-1">dto.py</code> (
          <code>StatusAlunoResponse</code>: aluno_id, media, status).
        </p>
      </div>
    ),
  },
  {
    chipLabel: "Endpoint e curl",
    text: `Qual endpoint REST expõe a consulta da situação do aluno com base na nota cadastrada? Como testar com curl?`,
    thinkingLabel: "Localizando endpoint e montando exemplo…",
    response: (
      <div className="space-y-3 text-sm leading-relaxed md:text-base">
        <p>
          O endpoint está em{" "}
          <code className="rounded bg-muted px-1">controller.py</code>:
        </p>
        <p className="font-mono text-sm">
          <strong>GET</strong> /alunos/{"{aluno_id}"}/status
        </p>
        <p className="text-muted-foreground">
          Resposta: <code>StatusAlunoResponse</code> (JSON com aluno_id, media e
          status). Injeção de <code>db</code> via <code>Depends(get_db)</code>;
          delega tudo ao <code>AlunoService</code>.
        </p>
        <p className="font-medium">Exemplo com curl</p>
        <CodeBlock code={CURL_EXAMPLE} language="bash" />
        <p className="text-muted-foreground">
          Substitua <code>1</code> pelo ID do aluno. Exemplos úteis para QA: média
          8,0 (Aprovado), 5,5 (Recuperação), 3,0 (Reprovado) e ID inexistente
          (404).
        </p>
      </div>
    ),
  },
]

export function GitlabConsultAiChat() {
  return (
    <SlideAiChat
      title="Pedra da Galinha IA"
      steps={GITLAB_CONSULT_STEPS}
      emptyMessage="Pergunte sobre cadastro de notas, SQL, regras de negócio ou endpoints do repositório."
    />
  )
}
