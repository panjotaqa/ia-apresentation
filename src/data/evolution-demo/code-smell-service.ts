/** service.py com code smells explícitos (evolução pós-release US-015) */
export const SERVICE_PY_BEFORE_SMELL = `from sqlalchemy.orm import Session
from repository import AlunoRepository
from dto import StatusAlunoResponse
from fastapi import HTTPException

class AlunoService:
    def __init__(self, db: Session):
        self.repository = AlunoRepository(db)

    def processar_status_aluno(self, aluno_id: int) -> StatusAlunoResponse:
        # Busca a média do aluno no banco de dados
        media = self.repository.buscar_media_por_id(aluno_id)

        # Verifica se o aluno existe ou tem média
        if media is None:
            raise HTTPException(
                status_code=404,
                detail="Erro: Aluno não encontrado ou sem média registrada.",
            )

        # Critérios de aceite da US-015 — classificação inline
        if media > 7.0:
            status = "Aprovado"
        elif media >= 4.0 and media <= 7.0:
            status = "Recuperação"
        else:
            status = "Reprovado"

        # Monta e retorna a resposta da API
        return StatusAlunoResponse(aluno_id=aluno_id, media=media, status=status)`

/** service.py refatorado — constantes, método privado, mensagens centralizadas */
export const SERVICE_PY_AFTER_REFACTOR = `from sqlalchemy.orm import Session
from repository import AlunoRepository
from dto import StatusAlunoResponse
from fastapi import HTTPException

LIMITE_APROVACAO = 7.0
LIMITE_RECUPERACAO = 4.0
MSG_ALUNO_SEM_MEDIA = "Erro: Aluno não encontrado ou sem média registrada."


class AlunoService:
    def __init__(self, db: Session):
        self.repository = AlunoRepository(db)

    def _classificar_por_media(self, media: float) -> str:
        if media > LIMITE_APROVACAO:
            return "Aprovado"
        if media >= LIMITE_RECUPERACAO:
            return "Recuperação"
        return "Reprovado"

    def processar_status_aluno(self, aluno_id: int) -> StatusAlunoResponse:
        media = self.repository.buscar_media_por_id(aluno_id)

        if media is None:
            raise HTTPException(status_code=404, detail=MSG_ALUNO_SEM_MEDIA)

        status = self._classificar_por_media(media)
        return StatusAlunoResponse(aluno_id=aluno_id, media=media, status=status)`
