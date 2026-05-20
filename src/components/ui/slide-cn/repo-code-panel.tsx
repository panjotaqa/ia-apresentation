"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CodeBlock } from "@/components/ui/slide-cn/code-block"
import {
  REPO_FILES,
  REPO_FILE_ORDER,
  type RepoFileId,
} from "@/data/gitlab-demo/aluno-status-files"
import { cn } from "@/lib/utils"
import { FileCode2 } from "lucide-react"

export type RepoCodePanelProps = {
  visibleFileIds: RepoFileId[]
  openAccordion: string[]
  onOpenAccordionChange: (value: string[]) => void
  className?: string
}

export function RepoCodePanel({
  visibleFileIds,
  openAccordion,
  onOpenAccordionChange,
  className,
}: RepoCodePanelProps) {
  const orderedVisible = REPO_FILE_ORDER.filter((id) =>
    visibleFileIds.includes(id)
  )

  return (
    <div
      className={cn(
        "flex h-full max-h-[85vh] min-h-0 w-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-xs",
        className
      )}
    >
      <header className="flex shrink-0 items-center gap-2 border-b border-border/60 px-4 py-3">
        <FileCode2 className="size-4 text-muted-foreground" />
        <h2 className="text-base font-semibold text-foreground md:text-lg">
          Repositório acadêmico · Pedra da Galinha School
        </h2>
      </header>

      <div className="flex h-0 min-h-0 flex-1 flex-col">
        <ScrollArea
          className="h-full min-h-0"
          onWheel={(e) => e.stopPropagation()}
        >
        <div className="p-3">
          {orderedVisible.length === 0 ? (
            <p className="px-2 py-8 text-center text-sm text-muted-foreground">
              Nenhum arquivo alterado ainda. Envie um prompt no chat para a IA
              implementar.
            </p>
          ) : (
            <Accordion
              type="multiple"
              value={openAccordion}
              onValueChange={onOpenAccordionChange}
              className="w-full"
            >
              {orderedVisible.map((fileId) => {
                const repoFile = REPO_FILES[fileId]
                return (
                  <AccordionItem
                    key={fileId}
                    value={fileId}
                    className="border-b border-border/40 last:border-b-0"
                  >
                    <AccordionTrigger className="w-full gap-2 py-3 hover:no-underline [&>svg]:ml-1">
                      <span className="flex min-w-0 flex-1 items-center justify-between gap-4 pr-1">
                        <span className="truncate font-mono text-sm text-foreground">
                          {repoFile.path}
                        </span>
                        <span className="shrink-0 font-mono text-xs font-medium tabular-nums text-emerald-600 dark:text-emerald-400">
                          +{repoFile.linesAdded}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-3">
                      <ScrollArea
                        className="max-h-48 rounded-md border border-border/40"
                        onWheel={(e) => e.stopPropagation()}
                      >
                        <CodeBlock
                          code={repoFile.code}
                          language="python"
                          showLineNumbers
                        />
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          )}
        </div>
        </ScrollArea>
      </div>
    </div>
  )
}
