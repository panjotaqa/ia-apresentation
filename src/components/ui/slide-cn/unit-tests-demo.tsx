"use client"

import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
import { RepoCodePanel } from "@/components/ui/slide-cn/repo-code-panel"
import { UnitTestsAiChat } from "@/components/ui/slide-cn/unit-tests-ai-chat"
import {
  UNIT_TESTS_INITIAL_VISIBLE,
  UNIT_TESTS_PANEL_FILES,
  UNIT_TESTS_PANEL_SECTIONS,
  UNIT_TESTS_REVEAL_BY_STEP,
  UNIT_TESTS_SOURCE_FILE_IDS,
  UNIT_TESTS_TEST_FILE_IDS,
  type UnitTestFileId,
} from "@/data/validation-demo/unit-tests-panel-files"
import { useCallback, useState } from "react"

const UNIT_TESTS_FILE_ORDER: UnitTestFileId[] = [
  ...UNIT_TESTS_SOURCE_FILE_IDS,
  ...UNIT_TESTS_TEST_FILE_IDS,
]

export function UnitTestsDemo() {
  const [visibleFileIds, setVisibleFileIds] = useState<UnitTestFileId[]>(
    UNIT_TESTS_INITIAL_VISIBLE
  )
  const [openAccordion, setOpenAccordion] = useState<string[]>([
    ...UNIT_TESTS_SOURCE_FILE_IDS,
  ])

  const revealTests = useCallback((stepIndex: number) => {
    const newIds = UNIT_TESTS_REVEAL_BY_STEP[stepIndex] ?? []
    if (newIds.length === 0) return

    setVisibleFileIds((prev) => {
      const merged = [...prev]
      for (const id of newIds) {
        if (!merged.includes(id)) merged.push(id)
      }
      return merged
    })
    setOpenAccordion((prev) => {
      const merged = [...prev]
      for (const id of newIds) {
        if (!merged.includes(id)) merged.push(id)
      }
      return merged
    })
  }, [])

  return (
    <HorizontalSplit
      ratio={0.5}
      className="min-h-0 flex-1 items-stretch gap-4 md:gap-6"
    >
      <HorizontalSplit.Left className="flex min-h-0 h-full w-full self-stretch">
        <RepoCodePanel
          title="US-015 · código e testes unitários"
          files={UNIT_TESTS_PANEL_FILES}
          fileOrder={UNIT_TESTS_FILE_ORDER}
          sections={UNIT_TESTS_PANEL_SECTIONS}
          visibleFileIds={visibleFileIds}
          openAccordion={openAccordion}
          onOpenAccordionChange={setOpenAccordion}
          emptyMessage="Envie um prompt no chat para gerar os testes por camada."
        />
      </HorizontalSplit.Left>
      <HorizontalSplit.Right className="flex min-h-0 h-full w-full self-stretch">
        <UnitTestsAiChat onRevealTests={revealTests} />
      </HorizontalSplit.Right>
    </HorizontalSplit>
  )
}
