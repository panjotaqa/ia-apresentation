"use client"

import { Callout } from "@/components/ui/slide-cn/callout"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"
import { HorizontalSplit } from "@/components/ui/slide-cn/horizontal-split"
export type PhaseAiPractice = {
  title: string
  description: string
}

export type PhaseSlideProps = {
  title: string
  phaseDescription: string
  phaseActivities: string[]
  aiPractices: PhaseAiPractice[]
  callout?: {
    variant?: "info" | "success" | "warning" | "error"
    title: string
    children: React.ReactNode
  }
}

export function PhaseSlide({
  title,
  phaseDescription,
  phaseActivities,
  aiPractices,
  callout,
}: PhaseSlideProps) {
  return (
    <HeaderWithContent>
      <HeaderWithContent.Header>{title}</HeaderWithContent.Header>
      <HeaderWithContent.Content className="flex flex-col gap-6">
        <HorizontalSplit ratio={0.4}>
          <HorizontalSplit.Left className="flex flex-col gap-4 pr-0 md:pr-8">
            <div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">
                A fase
              </h2>
              <p className="text-base leading-relaxed">{phaseDescription}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                O que envolve
              </h3>
              <ul className="flex flex-col gap-2 text-base">
                {phaseActivities.map((activity) => (
                  <li key={activity} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </HorizontalSplit.Left>
          <HorizontalSplit.Right className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-foreground">
              Como atuo com IA
            </h2>
            {aiPractices.map((practice) => (
              <Callout key={practice.title} variant="info" title={practice.title}>
                {practice.description}
              </Callout>
            ))}
            {callout && (
              <Callout variant={callout.variant ?? "success"} title={callout.title}>
                {callout.children}
              </Callout>
            )}
          </HorizontalSplit.Right>
        </HorizontalSplit>
      </HeaderWithContent.Content>
    </HeaderWithContent>
  )
}
