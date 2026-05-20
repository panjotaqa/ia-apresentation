"use client"

import { GitlabDevDemo } from "@/components/ui/slide-cn/gitlab-dev-demo"
import { HeaderWithContent } from "@/components/ui/slide-cn/header-with-content"

export function DesignImplementationGitlabSlide() {
  return (
    <HeaderWithContent className="h-full min-h-0 gap-4 md:gap-5">
      <HeaderWithContent.Header className="shrink-0 text-2xl md:text-4xl lg:text-5xl">
        <span className="text-violet-600 dark:text-violet-400">02.1</span>
        <span className="text-muted-foreground"> · </span>
        IA + GitLab — desenvolvimento assistido
      </HeaderWithContent.Header>
      <HeaderWithContent.Content className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <GitlabDevDemo />
      </HeaderWithContent.Content>
    </HeaderWithContent>
  )
}
