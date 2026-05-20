import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
  compact?: boolean
}

export function CodeBlock({
  code,
  language = "javascript",
  showLineNumbers = true,
  className,
  compact = false,
}: CodeBlockProps) {
  const highlighter = (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      showLineNumbers={showLineNumbers}
      wrapLongLines={false}
      lineNumberStyle={
        compact
          ? {
              minWidth: "2.25em",
              paddingRight: "1em",
              userSelect: "none",
            }
          : undefined
      }
      customStyle={{
        margin: 0,
        borderRadius: compact ? 0 : "0.5rem",
        padding: compact ? "0.5rem 0.75rem" : "1.5rem",
        fontSize: compact ? "0.75rem" : "0.8125rem",
        lineHeight: 1.5,
        overflow: "visible",
        width: "max-content",
        minWidth: "100%",
        height: "auto",
        maxHeight: "none",
        boxSizing: "border-box",
      }}
      preTagProps={{
        style: {
          margin: 0,
          height: "auto",
          maxHeight: "none",
          overflow: "visible",
        },
      }}
      codeTagProps={{
        style: {
          whiteSpace: "pre",
          wordBreak: "normal",
          overflowWrap: "normal",
        },
      }}
    >
      {code}
    </SyntaxHighlighter>
  )

  if (compact) {
    return (
      <ScrollArea
        orientation="horizontal"
        className={cn(
          "w-full min-w-0 max-w-full rounded-md border border-border/40 bg-muted/20",
          className
        )}
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="w-max min-w-full">{highlighter}</div>
      </ScrollArea>
    )
  }

  return (
    <div
      className={cn(
        "min-w-0 w-full max-w-full overflow-x-auto text-sm",
        className
      )}
    >
      {highlighter}
    </div>
  )
}
