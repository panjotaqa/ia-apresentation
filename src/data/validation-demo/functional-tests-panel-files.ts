import type { CodePanelFile } from "@/components/ui/slide-cn/repo-code-panel"
import {
  FUNCTIONAL_FILE_STEP_1,
  FUNCTIONAL_FILE_STEP_2,
  FUNCTIONAL_FILE_STEP_3,
  FUNCTIONAL_FILE_STEP_4,
  FUNCTIONAL_TESTS_AFTER_DEDUP,
} from "@/data/validation-demo/functional-api-tests"

export const FUNCTIONAL_TEST_FILE_ID = "test_api_status_aluno.py" as const

export type FunctionalTestFileId = typeof FUNCTIONAL_TEST_FILE_ID

function panelFile(code: string): CodePanelFile {
  const trimmed = code.trimEnd()
  return {
    id: FUNCTIONAL_TEST_FILE_ID,
    path: "tests/test_api_status_aluno.py",
    code: trimmed,
    linesAdded: trimmed.split("\n").length,
  }
}

/** Conteúdo do arquivo após cada step do chat (índice = step concluído) */
export const FUNCTIONAL_PANEL_CODE_BY_STEP: string[] = [
  FUNCTIONAL_FILE_STEP_1,
  FUNCTIONAL_FILE_STEP_2,
  FUNCTIONAL_FILE_STEP_3,
  FUNCTIONAL_FILE_STEP_4,
  FUNCTIONAL_TESTS_AFTER_DEDUP,
]

export function functionalPanelFileForStep(stepIndex: number): CodePanelFile {
  const code =
    FUNCTIONAL_PANEL_CODE_BY_STEP[stepIndex] ??
    FUNCTIONAL_PANEL_CODE_BY_STEP[FUNCTIONAL_PANEL_CODE_BY_STEP.length - 1]
  return panelFile(code)
}

export const FUNCTIONAL_PANEL_INITIAL_FILES: Record<
  FunctionalTestFileId,
  CodePanelFile
> = {
  [FUNCTIONAL_TEST_FILE_ID]: panelFile(FUNCTIONAL_FILE_STEP_1),
}
