"use client"

import { UnitTestsDemo } from "@/components/ui/slide-cn/unit-tests-demo"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"

export function ValidationUnitTestsSlide() {
  return (
    <HeaderWithContent className="h-full min-h-0 gap-4 md:gap-6">
      <HeaderWithContent.Header className="shrink-0 text-2xl md:text-4xl lg:text-5xl">
        <span className="text-emerald-600 dark:text-emerald-400">03.1</span>
        <span className="text-muted-foreground"> · </span>
        Testes unitários com IA
      </HeaderWithContent.Header>
      <HeaderWithContent.Content className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <UnitTestsDemo />
      </HeaderWithContent.Content>
    </HeaderWithContent>
  )
}
