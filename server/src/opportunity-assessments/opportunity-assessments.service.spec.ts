import { Test, TestingModule } from '@nestjs/testing'
import { OpportunityAssessmentsService } from './opportunity-assessments.service'

describe('OpportunityAssessmentsService', () => {
    let service: OpportunityAssessmentsService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OpportunityAssessmentsService],
        }).compile()

        service = module.get<OpportunityAssessmentsService>(
            OpportunityAssessmentsService
        )
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
