"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { CodeBlock } from "@/components/ui/slide-cn/code-block"
import {
  REPO_FILES,
  REPO_FILE_ORDER,
} from "@/data/gitlab-demo/aluno-status-files"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, FileCode2 } from "lucide-react"

export type CodePanelFile = {
  id: string
  path: string
  code: string
  linesAdded: number
}

export type CodePanelSection = {
  label: string
  fileIds: string[]
}

export type RepoCodePanelProps = {
  visibleFileIds: string[]
  openAccordion: string[]
  onOpenAccordionChange: (value: string[]) => void
  className?: string
  emptyMessage?: string
  title?: string
  files?: Record<string, CodePanelFile>
  fileOrder?: string[]
  sections?: readonly CodePanelSection[]
}

const DEFAULT_TITLE = "Repositório acadêmico · Pedra da Galinha School"

function RepoFileEntry({
  repoFile,
  isOpen,
  onToggle,
}: {
  repoFile: CodePanelFile
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="min-w-0 border-b border-border/40 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-2 py-3 text-left hover:no-underline"
        aria-expanded={isOpen}
      >
        <span className="flex min-w-0 flex-1 items-center justify-between gap-4 pr-1">
          <span className="truncate font-mono text-sm text-foreground">
            {repoFile.path}
          </span>
          <span className="shrink-0 font-mono text-xs font-medium tabular-nums text-emerald-600 dark:text-emerald-400">
            +{repoFile.linesAdded}
          </span>
        </span>
        {isOpen ? (
          <ChevronUp className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        )}
      </button>
      {isOpen ? (
        <div className="min-w-0 pb-3">
          <CodeBlock
            key={repoFile.linesAdded}
            code={repoFile.code}
            language="python"
            showLineNumbers
            compact
          />
        </div>
      ) : null}
    </div>
  )
}

export function RepoCodePanel({
  visibleFileIds,
  openAccordion,
  onOpenAccordionChange,
  className,
  emptyMessage = "Nenhum arquivo alterado ainda. Envie um prompt no chat para a IA implementar.",
  title = DEFAULT_TITLE,
  files = REPO_FILES as Record<string, CodePanelFile>,
  fileOrder = REPO_FILE_ORDER as string[],
  sections,
}: RepoCodePanelProps) {
  const visibleSet = new Set(visibleFileIds)

  const toggleFile = (fileId: string) => {
    onOpenAccordionChange(
      openAccordion.includes(fileId)
        ? openAccordion.filter((id) => id !== fileId)
        : [...openAccordion, fileId]
    )
  }

  const renderFile = (fileId: string) => {
    const repoFile = files[fileId]
    if (!repoFile || !visibleSet.has(fileId)) return null

    return (
      <RepoFileEntry
        key={`${fileId}-${repoFile.linesAdded}`}
        repoFile={repoFile}
        isOpen={openAccordion.includes(fileId)}
        onToggle={() => toggleFile(fileId)}
      />
    )
  }

  const flatVisible = fileOrder.filter((id) => visibleSet.has(id))

  const fileList = (
    <div className="flex w-full min-w-0 max-w-full flex-col">
      {flatVisible.map((fileId) => renderFile(fileId))}
    </div>
  )

  const sectionBlocks = sections?.map((section) => {
    const sectionVisible = section.fileIds.filter((id) => visibleSet.has(id))
    if (sectionVisible.length === 0) return null

    return (
      <div key={section.label} className="mb-4 last:mb-0">
        <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {section.label}
        </h3>
        <div className="flex w-full min-w-0 max-w-full flex-col">
          {section.fileIds.map((fileId) => renderFile(fileId))}
        </div>
      </div>
    )
  })

  return (
    <div
      className={cn(
        "flex h-[82vh] min-h-[82vh] max-h-[82vh] w-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-xs",
        className
      )}
    >
      <header className="flex shrink-0 items-center gap-2 border-b border-border/60 px-4 py-3">
        <FileCode2 className="size-4 text-muted-foreground" />
        <h2 className="text-base font-semibold text-foreground md:text-lg">
          {title}
        </h2>
      </header>

      <ScrollArea
        className="min-h-0 flex-1"
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="box-border min-w-0 max-w-full p-3">
          {flatVisible.length === 0 ? (
            <p className="px-2 py-8 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          ) : sections ? (
            sectionBlocks
          ) : (
            fileList
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
