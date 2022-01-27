import { Test, TestingModule } from '@nestjs/testing'
import { OpportunityAssessmentsResolver } from './opportunity-assessments.resolver'
import { OpportunityAssessmentsService } from './opportunity-assessments.service'

describe('OpportunityAssessmentsResolver', () => {
    let resolver: OpportunityAssessmentsResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OpportunityAssessmentsResolver,
                OpportunityAssessmentsService,
            ],
        }).compile()

        resolver = module.get<OpportunityAssessmentsResolver>(
            OpportunityAssessmentsResolver
        )
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
