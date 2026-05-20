import type { CodePanelFile } from "@/components/ui/slide-cn/repo-code-panel"
import {
  SERVICE_PY_AFTER_REFACTOR,
  SERVICE_PY_BEFORE_SMELL,
} from "@/data/evolution-demo/code-smell-service"

export const CODE_SMELL_FILE_ID = "service.py" as const

export type CodeSmellFileId = typeof CODE_SMELL_FILE_ID

function panelFile(code: string): CodePanelFile {
  const trimmed = code.trimEnd()
  return {
    id: CODE_SMELL_FILE_ID,
    path: "service.py",
    code: trimmed,
    linesAdded: trimmed.split("\n").length,
  }
}

export const CODE_SMELL_PANEL_CODE_BY_STEP: string[] = [
  SERVICE_PY_BEFORE_SMELL,
  SERVICE_PY_AFTER_REFACTOR,
  SERVICE_PY_AFTER_REFACTOR,
]

export function codeSmellPanelFileForStep(stepIndex: number): CodePanelFile {
  const code =
    CODE_SMELL_PANEL_CODE_BY_STEP[stepIndex] ??
    CODE_SMELL_PANEL_CODE_BY_STEP[CODE_SMELL_PANEL_CODE_BY_STEP.length - 1]
  return panelFile(code)
}

export const CODE_SMELL_PANEL_INITIAL_FILES: Record<
  CodeSmellFileId,
  CodePanelFile
> = {
  [CODE_SMELL_FILE_ID]: panelFile(SERVICE_PY_BEFORE_SMELL),
}
