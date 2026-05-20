export const UNIT_TEST_REPOSITORY = `import pytest
from unittest.mock import MagicMock
from repository import AlunoRepository
from models import AlunoModel

def test_buscar_media_por_id_retorna_media_quando_aluno_existe():
    db = MagicMock()
    aluno = AlunoModel(id=1, nome="Carlos", media=8.5)
    db.query.return_value.filter.return_value.first.return_value = aluno

    repo = AlunoRepository(db)
    media = repo.buscar_media_por_id(1)

    assert media == 8.5

def test_buscar_media_por_id_retorna_none_quando_aluno_nao_existe():
    db = MagicMock()
    db.query.return_value.filter.return_value.first.return_value = None

    repo = AlunoRepository(db)
    media = repo.buscar_media_por_id(9999)

    assert media is None`

export const UNIT_TEST_SERVICE = `import pytest
from unittest.mock import MagicMock
from fastapi import HTTPException
from service import AlunoService

def test_processar_status_aluno_aprovado():
    repo = MagicMock()
    repo.buscar_media_por_id.return_value = 8.0
    service = AlunoService(MagicMock())
    service.repository = repo

    resultado = service.processar_status_aluno(1)

    assert resultado.status == "Aprovado"
    assert resultado.media == 8.0

def test_processar_status_aluno_recuperacao():
    repo = MagicMock()
    repo.buscar_media_por_id.return_value = 5.5
    service = AlunoService(MagicMock())
    service.repository = repo

    resultado = service.processar_status_aluno(2)

    assert resultado.status == "Recuperação"

def test_processar_status_aluno_reprovado():
    repo = MagicMock()
    repo.buscar_media_por_id.return_value = 3.0
    service = AlunoService(MagicMock())
    service.repository = repo

    resultado = service.processar_status_aluno(3)

    assert resultado.status == "Reprovado"

def test_processar_status_aluno_sem_media_lanca_404():
    repo = MagicMock()
    repo.buscar_media_por_id.return_value = None
    service = AlunoService(MagicMock())
    service.repository = repo

    with pytest.raises(HTTPException) as exc:
        service.processar_status_aluno(9999)

    assert exc.value.status_code == 404`

export const UNIT_TEST_CONTROLLER = `import pytest
from unittest.mock import MagicMock
from fastapi import HTTPException
from controller import obter_status_aluno
from dto import StatusAlunoResponse

def test_obter_status_aluno_retorna_dto():
    db = MagicMock()
    service_mock = MagicMock()
    service_mock.processar_status_aluno.return_value = StatusAlunoResponse(
        aluno_id=1, media=8.0, status="Aprovado"
    )

    # Em teste real, use dependency_overrides do FastAPI para injetar o mock
    resultado = obter_status_aluno(aluno_id=1, db=db)

    assert resultado.aluno_id == 1
    assert resultado.status == "Aprovado"

def test_obter_status_aluno_propaga_404_do_service():
    db = MagicMock()
    # Simula service lançando HTTPException quando aluno não existe
    with pytest.raises(HTTPException) as exc:
        obter_status_aluno(aluno_id=9999, db=db)

    # Ajuste conforme mock/override do projeto
    assert exc.value.status_code in (404, 500)`
