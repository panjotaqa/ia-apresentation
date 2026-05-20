"use client"

import { Deck } from "@/components/ui/slide-cn/deck"
import { Slide } from "@/components/ui/slide-cn/slide"
import { AboutMeSlide } from "@/slides/about-me"
import { AgendaSlide } from "@/slides/agenda"
import { ClosingAiOverviewSlide } from "@/slides/closing-ai-overview"
import { ClosingSlide } from "@/slides/closing"
import { DesignImplementationSlide } from "@/slides/design-implementation"
import { DesignImplementationDatabaseSlide } from "@/slides/design-implementation-database"
import { DesignImplementationDevelopmentSlide } from "@/slides/design-implementation-development"
import { DesignImplementationGitlabSlide } from "@/slides/design-implementation-gitlab"
import { DesignImplementationCodeReviewSlide } from "@/slides/design-implementation-code-review"
import { EvolutionCodeSmellSlide } from "@/slides/evolution-code-smell"
import { EvolutionOverviewSlide } from "@/slides/evolution-overview"
import { EvolutionRegressionImpactSlide } from "@/slides/evolution-regression-impact"
import { SectionDivider } from "@/slides/section-divider"
import { SpecificationSlide } from "@/slides/specification"
import { ValidationOverviewSlide } from "@/slides/validation-overview"
import { ValidationFunctionalTestsSlide } from "@/slides/validation-functional-tests"
import { ValidationTestMappingSlide } from "@/slides/validation-test-mapping"
import { ValidationUnitTestsSlide } from "@/slides/validation-unit-tests"
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
        <DesignImplementationCodeReviewSlide />
      </Slide>

      <Slide>
        <SectionDivider
          number="03"
          title="Validação de Software"
          subtitle="Software Validation"
        />
      </Slide>

      <Slide>
        <ValidationOverviewSlide />
      </Slide>

      <Slide>
        <ValidationUnitTestsSlide />
      </Slide>

      <Slide>
        <ValidationTestMappingSlide />
      </Slide>

      <Slide>
        <ValidationFunctionalTestsSlide />
      </Slide>

      <Slide>
        <SectionDivider
          number="04"
          title="Evolução de Software"
          subtitle="Software Evolution"
        />
      </Slide>

      <Slide>
        <EvolutionOverviewSlide />
      </Slide>

      <Slide>
        <EvolutionCodeSmellSlide />
      </Slide>

      <Slide>
        <EvolutionRegressionImpactSlide />
      </Slide>

      <Slide>
        <SectionDivider
          number="05"
          title="Encerramento"
          subtitle="Closing"
        />
      </Slide>

      <Slide>
        <ClosingAiOverviewSlide />
      </Slide>

      <Slide>
        <ClosingSlide />
      </Slide>
    </Deck>
  )
}

export default App
