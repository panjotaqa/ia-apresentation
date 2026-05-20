"use client"

import { EvolutionCodeSmellAiChat } from "@/components/ui/slide-cn/evolution-code-smell-ai-chat"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import { RepoCodePanel } from "@/components/ui/slide-cn/repo-code-panel"
import {
  CODE_SMELL_FILE_ID,
  CODE_SMELL_PANEL_INITIAL_FILES,
  codeSmellPanelFileForStep,
  type CodeSmellFileId,
} from "@/data/evolution-demo/code-smell-panel-files"
import { useCallback, useState } from "react"

export function EvolutionCodeSmellDemo() {
  const [files, setFiles] = useState(CODE_SMELL_PANEL_INITIAL_FILES)
  const [visibleFileIds, setVisibleFileIds] = useState<CodeSmellFileId[]>([])
  const [openAccordion, setOpenAccordion] = useState<string[]>([])

  const updateServiceFile = useCallback((stepIndex: number) => {
    const nextFile = codeSmellPanelFileForStep(stepIndex)
    setFiles({ [CODE_SMELL_FILE_ID]: nextFile })
    setVisibleFileIds([CODE_SMELL_FILE_ID])
    setOpenAccordion([CODE_SMELL_FILE_ID])
  }, [])

  return (
    <HorizontalSplit
      ratio={0.5}
      className="min-h-0 flex-1 items-stretch gap-4 md:gap-6"
    >
      <HorizontalSplit.Left className="flex min-h-0 h-full w-full self-stretch">
        <RepoCodePanel
          title="US-015 · refatoração service.py"
          files={files}
          fileOrder={[CODE_SMELL_FILE_ID]}
          visibleFileIds={visibleFileIds}
          openAccordion={openAccordion}
          onOpenAccordionChange={setOpenAccordion}
          emptyMessage="Envie um prompt no chat para analisar e refatorar o service.py."
        />
      </HorizontalSplit.Left>
      <HorizontalSplit.Right className="flex min-h-0 h-full w-full self-stretch">
        <EvolutionCodeSmellAiChat onUpdateServiceFile={updateServiceFile} />
      </HorizontalSplit.Right>
    </HorizontalSplit>
  )
}
