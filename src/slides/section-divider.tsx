"use client"

import { TitleSlide } from "@/components/ui/slide-cn/title-slide"
import { cn } from "@/lib/utils"

type SectionDividerProps = {
  number: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionDivider({
  number,
  title,
  subtitle,
  className,
}: SectionDividerProps) {
  return (
    <TitleSlide className={cn("gap-6", className)}>
      <TitleSlide.Meta className="text-lg font-medium tracking-widest uppercase text-primary">
        {number}
      </TitleSlide.Meta>
      <TitleSlide.Heading className="max-w-4xl text-5xl md:text-6xl">
        {title}
      </TitleSlide.Heading>
      {subtitle && (
        <TitleSlide.SubHeading className="max-w-2xl">{subtitle}</TitleSlide.SubHeading>
      )}
    </TitleSlide>
  )
}
