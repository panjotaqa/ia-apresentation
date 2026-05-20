"use client"

import { Deck } from "@/components/ui/slide-cn/deck"
import { Slide } from "@/components/ui/slide-cn/slide"
import { AboutMeSlide } from "@/slides/about-me"
import { AgendaSlide } from "@/slides/agenda"
import { ClosingSlide } from "@/slides/closing"
import { DesignImplementationSlide } from "@/slides/design-implementation"
import { DesignImplementationDatabaseSlide } from "@/slides/design-implementation-database"
import { DesignImplementationDevelopmentSlide } from "@/slides/design-implementation-development"
import { DesignImplementationGitlabSlide } from "@/slides/design-implementation-gitlab"
import { DesignImplementationUnitTestsSlide } from "@/slides/design-implementation-unit-tests"
import { EvolutionSlide } from "@/slides/evolution"
import { SectionDivider } from "@/slides/section-divider"
import { SpecificationSlide } from "@/slides/specification"
import { ValidationSlide } from "@/slides/validation"
import { WorkshopTitleSlide } from "@/slides/workshop-title"

export function App() {
  return (
    <Deck>
      <Slide>
        <WorkshopTitleSlide />
      </Slide>

      <Slide>
        <AboutMeSlide />
      </Slide>

      <Slide>
        <AgendaSlide />
      </Slide>

      <Slide>
        <SectionDivider
          number="01"
          title="Especificação de Software"
          subtitle="Software Specification"
        />
      </Slide>

      <Slide>
        <SpecificationSlide />
      </Slide>

      <Slide>
        <SectionDivider
          number="02"
          title="Projeto e Implementação"
          subtitle="Software Design and Implementation"
        />
      </Slide>

      <Slide>
        <DesignImplementationSlide />
      </Slide>

      <Slide>
        <DesignImplementationGitlabSlide />
      </Slide>

      <Slide>
        <DesignImplementationDatabaseSlide />
      </Slide>

      <Slide>
        <DesignImplementationDevelopmentSlide />
      </Slide>

      <Slide>
        <DesignImplementationUnitTestsSlide />
      </Slide>

      <Slide>
        <SectionDivider
          number="03"
          title="Validação de Software"
          subtitle="Software Validation"
        />
      </Slide>

      <Slide>
        <ValidationSlide />
      </Slide>

      <Slide>
        <SectionDivider
          number="04"
          title="Evolução de Software"
          subtitle="Software Evolution"
        />
      </Slide>

      <Slide>
        <EvolutionSlide />
      </Slide>

      <Slide>
        <ClosingSlide />
      </Slide>
    </Deck>
  )
}

export default App
