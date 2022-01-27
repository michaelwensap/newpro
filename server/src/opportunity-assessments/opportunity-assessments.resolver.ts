import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { OpportunityAssessmentsService } from './opportunity-assessments.service'
import { OpportunityAssessment } from './entities/opportunity-assessment.entity'
import { SpendFile } from './entities/spend-file.entity'
import { Public } from 'src/auth/public.decorator'
import { CreateOpportunityAssessmentInput } from './dto/create-opportunity.input'
import { GqlAuthGuard } from '../auth/gql-auth.guard'
import { UserEntity } from '../auth/user.decorator'
import { User } from '../users/entities/user.entity'
import { UseGuards } from '@nestjs/common'

@Resolver(() => OpportunityAssessment)
export class OpportunityAssessmentsResolver {
    constructor(
        private readonly opportunityAssessmentsService: OpportunityAssessmentsService
    ) {}

    @Query(() => [OpportunityAssessment], { name: 'companyAssessments' })
    companyAssessments(@Args('customer_id') customer_id: number) {
        return this.opportunityAssessmentsService.opportunityAssessments({
            where: { customer_id },
        })
    }

    @Query(() => OpportunityAssessment)
    opportunityAssessment(@Args('id', { type: () => Int }) id: number) {
        return this.opportunityAssessmentsService.opportunityAssessment({
            id: id,
        })
    }

    @Query(() => [SpendFile])
    spendFiles() {
        return this.opportunityAssessmentsService.spendFiles({})
    }

    @Public()
    @UseGuards(GqlAuthGuard)
    @Mutation(() => OpportunityAssessment)
    async createOpportunityAsessment(
        @UserEntity() user: User,
        @Args('data') data: CreateOpportunityAssessmentInput
    ) {
        const opportunityAsessment = {
            ...data,
            User: user,
        }
        return this.opportunityAssessmentsService.createOpportunity(data)
    }
}
