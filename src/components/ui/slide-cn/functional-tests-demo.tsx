"use client"

import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import { RepoCodePanel } from "@/components/ui/slide-cn/repo-code-panel"
import { FunctionalTestsAiChat } from "@/components/ui/slide-cn/functional-tests-ai-chat"
import {
  FUNCTIONAL_PANEL_INITIAL_FILES,
  FUNCTIONAL_TEST_FILE_ID,
  functionalPanelFileForStep,
  type FunctionalTestFileId,
} from "@/data/validation-demo/functional-tests-panel-files"
import { useCallback, useState } from "react"

export function FunctionalTestsDemo() {
  const [files, setFiles] = useState(FUNCTIONAL_PANEL_INITIAL_FILES)
  const [visibleFileIds, setVisibleFileIds] = useState<FunctionalTestFileId[]>(
    []
  )
  const [openAccordion, setOpenAccordion] = useState<string[]>([])

  const updateTestFile = useCallback((stepIndex: number) => {
    const nextFile = functionalPanelFileForStep(stepIndex)
    setFiles({ [FUNCTIONAL_TEST_FILE_ID]: nextFile })
    setVisibleFileIds([FUNCTIONAL_TEST_FILE_ID])
    setOpenAccordion([FUNCTIONAL_TEST_FILE_ID])
  }, [])

  return (
    <HorizontalSplit
      ratio={0.5}
      className="min-h-0 flex-1 items-stretch gap-4 md:gap-6"
    >
      <HorizontalSplit.Left className="flex min-h-0 h-full w-full self-stretch">
        <RepoCodePanel
          title="Testes funcionais · US-015"
          files={files}
          fileOrder={[FUNCTIONAL_TEST_FILE_ID]}
          visibleFileIds={visibleFileIds}
          openAccordion={openAccordion}
          onOpenAccordionChange={setOpenAccordion}
          emptyMessage="Envie um prompt no chat para gerar os testes HTTP da API."
        />
      </HorizontalSplit.Left>
      <HorizontalSplit.Right className="flex min-h-0 h-full w-full self-stretch">
        <FunctionalTestsAiChat onUpdateTestFile={updateTestFile} />
      </HorizontalSplit.Right>
    </HorizontalSplit>
  )
}
