import { Module } from '@nestjs/common'
import { OpportunityAssessmentsService } from './opportunity-assessments.service'
import { OpportunityAssessmentsResolver } from './opportunity-assessments.resolver'
import { PrismaService } from '../prisma.service'

@Module({
    providers: [
        OpportunityAssessmentsResolver,
        OpportunityAssessmentsService,
        PrismaService,
    ],
})
export class OpportunityAssessmentsModule {}
