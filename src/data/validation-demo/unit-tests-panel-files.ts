import {
  REPO_FILES,
  REPO_FILE_ORDER,
  type RepoFileId,
} from "@/data/gitlab-demo/aluno-status-files"
import {
  UNIT_TEST_CONTROLLER,
  UNIT_TEST_REPOSITORY,
  UNIT_TEST_SERVICE,
} from "@/data/validation-demo/unit-tests-code"

export type UnitTestFileId = RepoFileId | TestFileId

export type TestFileId =
  | "test_repository.py"
  | "test_service.py"
  | "test_controller.py"

type PanelFile = {
  id: UnitTestFileId
  path: string
  code: string
  linesAdded: number
}

function panelFile(id: UnitTestFileId, path: string, code: string): PanelFile {
  const trimmed = code.trimEnd()
  return {
    id,
    path,
    code: trimmed,
    linesAdded: trimmed.split("\n").length,
  }
}

const TEST_FILES: Record<TestFileId, PanelFile> = {
  "test_repository.py": panelFile(
    "test_repository.py",
    "tests/test_repository.py",
    UNIT_TEST_REPOSITORY
  ),
  "test_service.py": panelFile(
    "test_service.py",
    "tests/test_service.py",
    UNIT_TEST_SERVICE
  ),
  "test_controller.py": panelFile(
    "test_controller.py",
    "tests/test_controller.py",
    UNIT_TEST_CONTROLLER
  ),
}

export const UNIT_TESTS_PANEL_FILES: Record<UnitTestFileId, PanelFile> = {
  ...Object.fromEntries(
    REPO_FILE_ORDER.map((id) => [id, { ...REPO_FILES[id], id }])
  ),
  ...TEST_FILES,
} as Record<UnitTestFileId, PanelFile>

export const UNIT_TESTS_SOURCE_FILE_IDS: RepoFileId[] = [...REPO_FILE_ORDER]

export const UNIT_TESTS_TEST_FILE_IDS: TestFileId[] = [
  "test_repository.py",
  "test_service.py",
  "test_controller.py",
]

export const UNIT_TESTS_INITIAL_VISIBLE: UnitTestFileId[] = [
  ...UNIT_TESTS_SOURCE_FILE_IDS,
]

/** Testes revelados após cada step do chat (índice = step concluído) */
export const UNIT_TESTS_REVEAL_BY_STEP: TestFileId[][] = [
  ["test_repository.py"],
  ["test_service.py"],
  ["test_controller.py"],
]

export const UNIT_TESTS_PANEL_SECTIONS = [
  {
    label: "Código da feature (US-015)",
    fileIds: UNIT_TESTS_SOURCE_FILE_IDS,
  },
  {
    label: "Testes unitários gerados",
    fileIds: UNIT_TESTS_TEST_FILE_IDS,
  },
] as const
