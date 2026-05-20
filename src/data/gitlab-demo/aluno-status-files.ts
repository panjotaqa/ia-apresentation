export type RepoFileId =
  | "models.py"
  | "dto.py"
  | "repository.py"
  | "service.py"
  | "controller.py"

export type RepoFile = {
  id: RepoFileId
  path: RepoFileId
  code: string
  linesAdded: number
}

function file(path: RepoFileId, code: string): RepoFile {
  return {
    id: path,
    path,
    code: code.trimEnd(),
    linesAdded: code.trimEnd().split("\n").length,
  }
}

const MODELS_PY = `from sqlalchemy import Column, Integer, Float, String
from database import Base

class AlunoModel(Base):
    __tablename__ = "alunos"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    media = Column(Float, nullable=True)  # A nota/média do aluno`

const DTO_PY = `from pydantic import BaseModel
from typing import Optional

class StatusAlunoResponse(BaseModel):
    aluno_id: int
    media: Optional[float]
    status: str

    class Config:
        from_attributes = True  # Permite que o Pydantic leia dados direto do modelo do SQLAlchemy`

const REPOSITORY_PY = `from sqlalchemy.orm import Session
from models import AlunoModel
from typing import Optional

class AlunoRepository:
    def __init__(self, db: Session):
        self.db = db

    def buscar_media_por_id(self, aluno_id: int) -> Optional[float]:
        # Executa um "SELECT media FROM alunos WHERE id = aluno_id"
        aluno = self.db.query(AlunoModel).filter(AlunoModel.id == aluno_id).first()

        if aluno:
            return aluno.media
        return None`

const SERVICE_PY = `from sqlalchemy.orm import Session
from repository import AlunoRepository
from dto import StatusAlunoResponse
from fastapi import HTTPException

class AlunoService:
    def __init__(self, db: Session):
        self.repository = AlunoRepository(db)

    def processar_status_aluno(self, aluno_id: int) -> StatusAlunoResponse:
        media = self.repository.buscar_media_por_id(aluno_id)

        # Média inválida ou ausente exibe mensagem de erro clara
        if media is None:
            raise HTTPException(
                status_code=404,
                detail="Erro: Aluno não encontrado ou sem média registrada.",
            )

        # Critérios de aceite da imagem
        if media > 7.0:
            status = "Aprovado"
        elif 4.0 <= media <= 7.0:
            status = "Recuperação"
        else:
            status = "Reprovado"

        return StatusAlunoResponse(aluno_id=aluno_id, media=media, status=status)`

const CONTROLLER_PY = `from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from service import AlunoService
from dto import StatusAlunoResponse

router = APIRouter(prefix="/alunos", tags=["Alunos"])

@router.get("/{aluno_id}/status", response_model=StatusAlunoResponse)
def obter_status_aluno(aluno_id: int, db: Session = Depends(get_db)):
    # Criamos o service passando a conexão ativa do banco de dados
    aluno_service = AlunoService(db)
    return aluno_service.processar_status_aluno(aluno_id)`

export const REPO_FILES: Record<RepoFileId, RepoFile> = {
  "models.py": file("models.py", MODELS_PY),
  "dto.py": file("dto.py", DTO_PY),
  "repository.py": file("repository.py", REPOSITORY_PY),
  "service.py": file("service.py", SERVICE_PY),
  "controller.py": file("controller.py", CONTROLLER_PY),
}

/** Arquivos revelados após cada step do chat (índice = step concluído) */
export const REVEAL_BY_STEP: RepoFileId[][] = [
  [],
  ["models.py", "repository.py"],
  ["dto.py", "service.py"],
  ["controller.py"],
]

export const REPO_FILE_ORDER: RepoFileId[] = [
  "models.py",
  "repository.py",
  "dto.py",
  "service.py",
  "controller.py",
]
