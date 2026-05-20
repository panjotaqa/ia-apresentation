"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ArrowUp, Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export type SlideAiChatStep = {
  text: string
  /** Rótulo curto exibido no chip numerado (quando o prompt é longo) */
  chipLabel?: string
  thinkingLabel?: string
  response: React.ReactNode
  onComplete?: () => void
}

type ChatMessage = {
  role: "user" | "assistant"
  content: React.ReactNode
}

export type SlideAiChatProps = {
  title: string
  steps: SlideAiChatStep[]
  emptyMessage?: string
  thinkingMs?: number
  defaultThinkingLabel?: string
}

const DEFAULT_THINKING_MS = 1200
const DEFAULT_THINKING_LABEL = "Gerando resposta…"

function ChatMessageText({ content }: { content: string }) {
  return (
    <p className="whitespace-pre-wrap text-sm leading-relaxed md:text-base">
      {content}
    </p>
  )
}

export function SlideAiChat({
  title,
  steps,
  emptyMessage = "Por onde começamos?",
  thinkingMs = DEFAULT_THINKING_MS,
  defaultThinkingLabel = DEFAULT_THINKING_LABEL,
}: SlideAiChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [step, setStep] = useState(0)
  const [input, setInput] = useState<string>(steps[0]?.text ?? "")
  const [isThinking, setIsThinking] = useState(false)
  const [thinkingLabel, setThinkingLabel] = useState(defaultThinkingLabel)
  const scrollRef = useRef<HTMLDivElement>(null)
  const promptScrollRef = useRef<HTMLDivElement>(null)

  const isComplete = step >= steps.length
  const canSend = !isComplete && !isThinking && input.trim().length > 0
  const isPromptDisabled = isComplete || isThinking

  useEffect(() => {
    const anchor = scrollRef.current
    if (!anchor) return

    const viewport = anchor.closest(
      '[data-slot="scroll-area-viewport"]'
    ) as HTMLElement | null

    viewport?.scrollTo({
      top: viewport.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, isThinking])

  useEffect(() => {
    const anchor = promptScrollRef.current
    if (!anchor) return

    const viewport = anchor.closest(
      '[data-slot="scroll-area-viewport"]'
    ) as HTMLElement | null

    viewport?.scrollTo({ top: 0, behavior: "smooth" })
  }, [input])

  const handleSend = () => {
    if (!canSend) return

    const current = steps[step]
    const userText = current.text

    setMessages((prev) => [...prev, { role: "user", content: userText }])
    setThinkingLabel(current.thinkingLabel ?? defaultThinkingLabel)
    setIsThinking(true)

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: current.response },
      ])
      setIsThinking(false)
      current.onComplete?.()
      const nextStep = step + 1
      setStep(nextStep)
      if (nextStep < steps.length) {
        setInput(steps[nextStep].text)
      }
    }, thinkingMs)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isPromptDisabled) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className="flex h-full w-full max-h-[85vh] min-h-0 flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-xs"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <header className="shrink-0 border-b border-border/60 px-4 py-3">
        <h2 className="text-base font-semibold text-foreground md:text-lg">
          {title}
        </h2>
      </header>

      <div className="flex h-0 min-h-0 flex-1 flex-col">
        <ScrollArea
          className="h-full min-h-0"
          onWheel={(e) => e.stopPropagation()}
        >
          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-label="Histórico da conversa"
            className="flex flex-col gap-4 p-4 pr-3"
          >
            {messages.length === 0 && !isThinking && (
              <p className="text-center text-sm text-muted-foreground">
                {emptyMessage}
              </p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex min-h-0 w-full",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === "user" ? (
                  <div className="max-w-[95%] shrink-0 rounded-2xl bg-muted px-4 py-3 text-foreground">
                    {typeof msg.content === "string" ? (
                      <ChatMessageText content={msg.content} />
                    ) : (
                      msg.content
                    )}
                  </div>
                ) : (
                  <div className="w-full max-w-[95%] rounded-2xl border border-border/40 px-4 py-3 text-foreground">
                    {typeof msg.content === "string" ? (
                      <ChatMessageText content={msg.content} />
                    ) : (
                      msg.content
                    )}
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl px-4 py-3 text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  <span className="text-sm">{thinkingLabel}</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <footer className="mt-auto shrink-0 border-t border-border/60 p-3">
        <div className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-muted/40 p-3">
          <div
            role="textbox"
            aria-readonly
            aria-label="Prompt sugerido"
            tabIndex={isPromptDisabled ? -1 : 0}
            onKeyDown={handleKeyDown}
            className={cn(
              "flex min-h-12 max-h-32 w-full overflow-hidden rounded-lg border border-border/60 bg-transparent shadow-none outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              isPromptDisabled && "opacity-60"
            )}
          >
            <ScrollArea
              className="h-32 max-h-32 min-h-12 w-full"
              onWheel={(e) => e.stopPropagation()}
            >
              <div
                ref={promptScrollRef}
                className="px-3 py-2.5 text-sm leading-relaxed whitespace-pre-wrap text-foreground md:text-base"
              >
                {input.trim() ? (
                  input
                ) : (
                  <span className="text-muted-foreground">
                    Digite ou use a sugestão abaixo…
                  </span>
                )}
              </div>
            </ScrollArea>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {steps.map((p, i) => (
                <button
                  key={p.text}
                  type="button"
                  disabled={i !== step || isComplete || isThinking}
                  onClick={() => i === step && setInput(p.text)}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-left text-[10px] transition-colors md:text-xs",
                    i === step && !isComplete
                      ? "bg-primary/15 text-primary"
                      : "bg-muted/60 text-muted-foreground opacity-50"
                  )}
                >
                  {i + 1}.{" "}
                  {p.chipLabel ??
                    (p.text.length > 42 ? `${p.text.slice(0, 42)}…` : p.text)}
                </button>
              ))}
            </div>
            <Button
              type="button"
              size="icon"
              className="shrink-0 rounded-full"
              disabled={!canSend}
              onClick={handleSend}
              aria-label="Enviar mensagem"
            >
              <ArrowUp className="size-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
