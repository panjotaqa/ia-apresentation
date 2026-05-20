"use client"

import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"

export type DesignImplementationTopicSlideProps = {
  number: string
  title: string
  children: React.ReactNode
}

export function DesignImplementationTopicSlide({
  number,
  title,
  children,
}: DesignImplementationTopicSlideProps) {
  return (
    <HeaderWithContent>
      <HeaderWithContent.Header className="text-2xl md:text-4xl lg:text-5xl">
        <span className="text-violet-600 dark:text-violet-400">{number}</span>
        <span className="text-muted-foreground"> · </span>
        {title}
      </HeaderWithContent.Header>
      <HeaderWithContent.Content className="flex flex-col gap-6 overflow-y-auto text-base md:text-lg">
        {children}
      </HeaderWithContent.Content>
    </HeaderWithContent>
  )
}
