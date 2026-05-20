"use client"

import { TitleSlide } from "@/components/ui/slide-cn/title-slide"

export function ClosingSlide() {
  return (
    <TitleSlide>
      <TitleSlide.Heading className="text-5xl md:text-6xl">
        Vamos refinar juntos?
      </TitleSlide.Heading>
      <TitleSlide.SubHeading className="max-w-2xl">
        Este é o conteúdo inicial. Nas próximas iterações podemos aprofundar
        exemplos reais, demos ao vivo e histórias do seu dia a dia.
      </TitleSlide.SubHeading>
      <TitleSlide.Meta className="mt-6">Obrigado!</TitleSlide.Meta>
    </TitleSlide>
  )
}
