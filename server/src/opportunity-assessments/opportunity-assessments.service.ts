import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { OpportunityAssessment, SpendFile, Prisma } from '@prisma/client'
import { CreateOpportunityAssessmentInput } from './dto/create-opportunity.input'

@Injectable()
export class OpportunityAssessmentsService {
    constructor(private prisma: PrismaService) {}

    async opportunityAssessment(
        OAWhereUniqueInput: Prisma.OpportunityAssessmentWhereUniqueInput
    ): Promise<OpportunityAssessment | null> {
        return this.prisma.opportunityAssessment.findUnique({
            where: OAWhereUniqueInput,
        })
    }

    async opportunityAssessments(params: {
        skip?: number
        take?: number
        cursor?: Prisma.OpportunityAssessmentWhereUniqueInput
        where?: Prisma.OpportunityAssessmentWhereInput
        orderBy?: Prisma.OpportunityAssessmentOrderByWithRelationInput
    }): Promise<OpportunityAssessment[]> {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.opportunityAssessment.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        })
    }

    async createOpportunity(
        data: CreateOpportunityAssessmentInput
    ): Promise<OpportunityAssessment> {
        return this.prisma.opportunityAssessment.create({
            data,
        })
    }

    async spendFiles(params: {
        skip?: number
        take?: number
        cursor?: Prisma.SpendFileWhereUniqueInput
        where?: Prisma.SpendFileWhereInput
        orderBy?: Prisma.SpendFileOrderByWithRelationInput
    }): Promise<SpendFile[]> {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.spendFile.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        })
    }
}
