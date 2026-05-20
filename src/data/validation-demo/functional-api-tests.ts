export const FUNCTIONAL_TEST_APROVADO = `def test_aluno_deve_estar_aprovado():
    aluno_id = 1

    response = requests.get(f"{BASE_URL}/{aluno_id}/status")

    assert response.status_code == 200, "O status do HTTP deveria ser 200 (OK)"

    dados = response.json()
    assert dados["aluno_id"] == aluno_id
    assert dados["media"] > 7.0, f"A média deveria ser maior que 7, veio: {dados['media']}"
    assert dados["status"] == "Aprovado", f"O status esperado era 'Aprovado', mas veio: '{dados['status']}'"`

export const FUNCTIONAL_TEST_RECUPERACAO = `def test_aluno_deve_estar_em_recuperacao():
    aluno_id = 2

    response = requests.get(f"{BASE_URL}/{aluno_id}/status")

    assert response.status_code == 200

    dados = response.json()
    assert dados["aluno_id"] == aluno_id
    assert 4.0 <= dados["media"] <= 7.0, f"A média deveria estar entre 4 e 7, veio: {dados['media']}"
    assert dados["status"] == "Recuperação", f"O status esperado era 'Recuperação', mas veio: '{dados['status']}'"`

export const FUNCTIONAL_TEST_REPROVADO = `def test_aluno_deve_estar_reprovado():
    aluno_id = 3

    response = requests.get(f"{BASE_URL}/{aluno_id}/status")

    assert response.status_code == 200

    dados = response.json()
    assert dados["aluno_id"] == aluno_id
    assert dados["media"] < 4.0, f"A média deveria ser menor que 4, veio: {dados['media']}"
    assert dados["status"] == "Reprovado", f"O status esperado era 'Reprovado', mas veio: '{dados['status']}'"`

export const FUNCTIONAL_TEST_NAO_ENCONTRADO = `def test_aluno_nao_encontrado_deve_retornar_erro_claro():
    aluno_id = 9999

    response = requests.get(f"{BASE_URL}/{aluno_id}/status")

    assert response.status_code == 404, "Deveria retornar status 404 para aluno inexistente"

    dados = response.json()
    assert "detail" in dados, "A resposta deveria conter uma chave 'detail' com a mensagem de erro"
    assert "Erro: Aluno não encontrado" in dados["detail"], "A mensagem de erro deveria ser clara"`

export const FUNCTIONAL_TESTS_BEFORE_DEDUP = `import requests
import pytest

BASE_URL = "http://127.0.0.1:8000/alunos"

${FUNCTIONAL_TEST_APROVADO}

${FUNCTIONAL_TEST_RECUPERACAO}

${FUNCTIONAL_TEST_REPROVADO}

${FUNCTIONAL_TEST_NAO_ENCONTRADO}`

export const FUNCTIONAL_TESTS_AFTER_DEDUP = `import requests
import pytest

BASE_URL = "http://127.0.0.1:8000/alunos"


def realizar_requisicao_status(aluno_id: int) -> requests.Response:
    return requests.get(f"{BASE_URL}/{aluno_id}/status")


def validar_resposta_sucesso(response: requests.Response, aluno_id: int, status_esperado: str):
    assert response.status_code == 200

    dados = response.json()
    assert dados["aluno_id"] == aluno_id
    assert dados["status"] == status_esperado
    return dados["media"]


def test_aluno_deve_estar_aprovado():
    aluno_id = 1

    response = realizar_requisicao_status(aluno_id)
    media = validar_resposta_sucesso(response, aluno_id, "Aprovado")

    assert media > 7.0


def test_aluno_deve_estar_em_recuperacao():
    aluno_id = 2

    response = realizar_requisicao_status(aluno_id)
    media = validar_resposta_sucesso(response, aluno_id, "Recuperação")

    assert 4.0 <= media <= 7.0


def test_aluno_deve_estar_reprovado():
    aluno_id = 3

    response = realizar_requisicao_status(aluno_id)
    media = validar_resposta_sucesso(response, aluno_id, "Reprovado")

    assert media < 4.0


def test_aluno_nao_encontrado_deve_retornar_erro_claro():
    aluno_id = 9999

    response = realizar_requisicao_status(aluno_id)

    assert response.status_code == 404
    dados = response.json()
    assert "detail" in dados
    assert "Erro: Aluno não encontrado" in dados["detail"]`

function buildPartialFunctionalFile(tests: string[]): string {
  const body = tests.join("\n\n\n")
  return `import requests
import pytest

BASE_URL = "http://127.0.0.1:8000/alunos"

${body}`
}

export const FUNCTIONAL_FILE_STEP_1 = buildPartialFunctionalFile([
  FUNCTIONAL_TEST_APROVADO,
])

export const FUNCTIONAL_FILE_STEP_2 = buildPartialFunctionalFile([
  FUNCTIONAL_TEST_APROVADO,
  FUNCTIONAL_TEST_RECUPERACAO,
])

export const FUNCTIONAL_FILE_STEP_3 = buildPartialFunctionalFile([
  FUNCTIONAL_TEST_APROVADO,
  FUNCTIONAL_TEST_RECUPERACAO,
  FUNCTIONAL_TEST_REPROVADO,
])

export const FUNCTIONAL_FILE_STEP_4 = buildPartialFunctionalFile([
  FUNCTIONAL_TEST_APROVADO,
  FUNCTIONAL_TEST_RECUPERACAO,
  FUNCTIONAL_TEST_REPROVADO,
  FUNCTIONAL_TEST_NAO_ENCONTRADO,
])
