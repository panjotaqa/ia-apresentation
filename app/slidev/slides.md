---
theme: dracula
title: Meu fluxo de trabalho como Engenheiro de Qualidade na Era da IA
author: Jean Pantoja
info: |
  **Jean Pantoja** — Engenheiro de Qualidade de Software · DBC Company

  Oficina · Engenharia de Software + IA

  Como atuo em cada etapa do ciclo de vida do software — da especificação à
  evolução — com inteligência artificial como parceira de trabalho.
drawings:
  persist: false
transition: slide-left
---

---
layout: cover
class: text-center
---

# Meu fluxo de trabalho como Engenheiro de Qualidade na Era da IA

Oficina · Engenharia de Software + IA

Como atuo em cada etapa do ciclo de vida do software — da especificação à evolução — com inteligência artificial como parceira de trabalho

<div class="opacity-80 mt-8 text-lg">2026</div>

---
layout: two-cols
---

# Quem sou eu

<div class="flex flex-col gap-8 pr-4 text-xl">

<div class="flex items-center gap-6">
  <img src="/eu.jpeg" class="size-36 shrink-0 rounded-full object-cover border-2 border-purple-400/40" alt="Jean Pantoja" />
  <div>
    <p class="text-4xl font-semibold">Jean Pantoja</p>
    <p class="text-2xl opacity-80">Engenheiro de Qualidade de Software</p>
    <p class="text-xl opacity-70">DBC Company · Cliente Sicredi</p>
    <p class="text-xl opacity-60">São Paulo, SP</p>
  </div>
</div>

<div class="text-xl opacity-80 flex flex-col gap-2">
  <p>📧 pantoja.jean.dev@gmail.com</p>
  <p>🔗 <a href="https://www.linkedin.com/in/jean-pantoja" target="_blank" class="underline">linkedin.com/in/jean-pantoja</a></p>
</div>

> Desde os 12 anos curioso por software — do RPG Maker ao QA em sistemas financeiros e agro.

</div>

::right::

<div class="flex flex-col gap-4 text-lg">

### 🏦 Hoje — DBC · Sicredi

Contratação de operações de investimento no agro (repasse BNDES): especificação de testes, automação em **Java, JavaScript e TypeScript**, APIs REST, sistemas web e legado **Clipper**, regressão e métricas com OKRs.

### 🛠️ Trajetória

**Verity** (Porto Seguro) · **GREat** (Dell FRDI, Dell Scope, Furukawa OSP) — QA em plataformas web, API e evolução contínua em contexto ágil.

### 💡 Competências

PostgreSQL · Garantia da qualidade · Jenkins · Testes ágeis · BDD

### 🎯 Objetivo da oficina

Mostrar como um Engenheiro de Qualidade pode atuar em cada etapa da engenharia de software usando IA de forma prática e responsável.

</div>

---

# Sumário

Quatro etapas clássicas da engenharia de software — e como um Engenheiro de Qualidade pode atuar em cada uma com apoio de IA.

<div class="mt-8 grid gap-6">

<div class="flex gap-4 items-start">
  <span class="text-purple-400 font-bold text-xl">01</span>
  <div>
    <p class="font-semibold text-lg">📄 Especificação de Software</p>
    <p class="opacity-80">Requisitos, elicitação, análise e documentação do que o sistema deve fazer.</p>
  </div>
</div>

<div class="flex gap-4 items-start">
  <span class="text-purple-400 font-bold text-xl">02</span>
  <div>
    <p class="font-semibold text-lg">💻 Projeto e Implementação</p>
    <p class="opacity-80">Arquitetura, design técnico, escolha de tecnologias e codificação.</p>
  </div>
</div>

<div class="flex gap-4 items-start">
  <span class="text-purple-400 font-bold text-xl">03</span>
  <div>
    <p class="font-semibold text-lg">🛡️ Validação de Software</p>
    <p class="opacity-80">Testes, revisões e V&V para garantir conformidade e valor entregue.</p>
  </div>
</div>

<div class="flex gap-4 items-start">
  <span class="text-purple-400 font-bold text-xl">04</span>
  <div>
    <p class="font-semibold text-lg">🔄 Evolução de Software</p>
    <p class="opacity-80">Manutenção, correções, adaptação a novos ambientes e novas funcionalidades.</p>
  </div>
</div>

</div>

---
layout: section
---

# 01

## Especificação de Software

Software Specification

---
layout: two-cols
---

# Especificação de Software

## A fase

É a fase dos requisitos. Aqui é definido o que o sistema deve fazer e quais são suas restrições de operação e desenvolvimento.

### O que envolve

- Engenharia de requisitos e elicitação com stakeholders
- Análise e priorização de necessidades do cliente
- Documentação de regras de negócio e critérios de aceite
- Identificação precoce de riscos e requisitos não funcionais

::right::

## Como atuo com IA

> **Análise de user stories e critérios de aceite**
>
> Uso de LLM para revisar histórias, sugerir critérios de aceite testáveis (formato Given/When/Then) e apontar lacunas ou ambiguidades antes do desenvolvimento.

> **Perguntas de elicitação**
>
> Geração de perguntas para workshops com PO e negócio — cenários de borda, exceções e dependências que costumam surgir tarde demais.

> **Matriz de rastreabilidade inicial**
>
> Apoio na estruturação de mapas requisito → cenário de teste, facilitando a cobertura desde o início do ciclo.

> **Revisão de consistência**
>
> Comparação entre documentos (PRD, épicos, protótipos) para detectar contradições e termos inconsistentes.

> ⚠️ **Papel do QA aqui**
>
> Não substituo o analista de negócios — atuo como guardião da testabilidade e da qualidade dos requisitos, antecipando o que será difícil validar depois.

---
layout: section
---

# 02

## Projeto e Implementação

Software Design and Implementation

---
layout: two-cols
---

# Projeto e Implementação de Software

## A fase

É a fase do desenvolvimento. O software é projetado estruturalmente e, em seguida, codificado.

### O que envolve

- Definição de arquitetura e padrões do sistema
- Design de banco de dados e integrações
- Escolha de stack e frameworks
- Escrita e revisão do código-fonte

::right::

## Como atuo com IA

> **Revisão de testabilidade no design**
>
> Análise de ADRs, diagramas e APIs com foco em observabilidade, pontos de injeção de dependência e contratos testáveis.

> **Scaffolding de automação**
>
> Geração de estrutura de Page Objects, fixtures e helpers de teste — sempre revisados e adaptados ao padrão do time.

> **Pair programming com IA**
>
> Aceleração na criação de testes unitários e de contrato, mantendo o QA próximo do código desde o início.

> **Análise estática assistida**
>
> Uso de ferramentas + LLM para interpretar alertas de Sonar, dependências vulneráveis e code smells relevantes para qualidade.

> ✅ **Shift-left na prática**
>
> Participar do design reduz retrabalho na validação: problemas de testabilidade custam muito mais caro se descobertos só na fase de testes.

---
layout: section
---

# 03

## Validação de Software

Software Validation

---
layout: two-cols
---

# Validação de Software

## A fase

É a fase de validação e verificação (V&V). Garante que o software atenda às especificações e corresponda às expectativas do cliente.

### O que envolve

- Testes unitários, de integração, sistema e aceitação
- Revisões de código e testes exploratórios
- Automação de regressão e pipelines de CI/CD
- Evidências de conformidade e relatórios de qualidade

::right::

## Como atuo com IA

> **Geração e expansão de casos de teste**
>
> A partir de requisitos e código, sugestão de cenários positivos, negativos e de borda — com curadoria e priorização humana.

> **Automação assistida**
>
> Criação de scripts E2E e API tests com IA, integrados ao framework já adotado pelo time (Playwright, Cypress, etc.).

> **Revisão de Pull Requests**
>
> Análise de diffs com foco em impacto em regressão, cobertura afetada e cenários que podem ter sido esquecidos.

> **Testes exploratórios guiados**
>
> Charters e roteiros de exploração gerados com base em áreas de risco, mudanças recentes e dados de produção.

> 💡 **Onde a IA mais brilha — e onde exige cuidado**
>
> A fase tradicional do QA ganha velocidade, mas julgamento, contexto de negócio e ética continuam sendo humanos. Nunca confio cegamente em output de LLM.

---
layout: section
---

# 04

## Evolução de Software

Software Evolution

---
layout: two-cols
---

# Evolução de Software

## A fase

É a fase da manutenção. Como o mundo muda, o software precisa mudar junto para continuar sendo útil.

### O que envolve

- Correção de erros pós-lançamento (hotfixes)
- Adaptação a novos ambientes e dependências
- Inclusão de novas funcionalidades demandadas pelo mercado
- Refatoração e redução de débito técnico

::right::

## Como atuo com IA

> **Análise de impacto em regressão**
>
> Mapeamento de áreas afetadas por uma mudança e sugestão de suíte mínima de testes para validar o release com segurança.

> **Priorização inteligente de testes**
>
> Uso de histórico de falhas, cobertura e métricas de produção para focar esforço onde o risco é maior.

> **Monitoramento e qualidade em produção**
>
> Apoio na interpretação de logs, alertas e feedback de usuários para transformar incidentes em casos de regressão.

> **Documentação viva**
>
> Atualização assistida de runbooks, notas de release e cenários de teste quando features evoluem.

> ✅ **Qualidade contínua**
>
> A evolução não é "fim do projeto" — é onde o QA prova valor de longo prazo, mantendo confiança do cliente release após release.

---
layout: cover
class: text-center
---

# Vamos refinar juntos?

Este é o conteúdo inicial. Nas próximas iterações podemos aprofundar exemplos reais, demos ao vivo e histórias do seu dia a dia.

<div class="opacity-80 mt-8 text-xl">Obrigado!</div>
