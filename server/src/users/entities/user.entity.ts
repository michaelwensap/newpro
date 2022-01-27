// GraphQL entities
import { Field, ObjectType, HideField } from '@nestjs/graphql'
import { Customer } from '../../customers/entities/customer.entity'
import { OpportunityAssessment } from '../../opportunity-assessments/entities/opportunity-assessment.entity'
import { Exclude } from 'class-transformer'

@ObjectType()
export class User {
    id: number

    @Field({ nullable: true })
    username: string

    email: string

    @Field({ nullable: true })
    role: string

    status: string
    record_create_date: Date
    last_login_date: Date

    @Field((type) => [Customer], { nullable: true })
    createdCustomers: Customer[]

    @Field((type) => [Customer], { nullable: true })
    updatedCustomers: Customer[]

    @Field((type) => [OpportunityAssessment], { nullable: true })
    createdAssessments: OpportunityAssessment[]

    @Field((type) => [OpportunityAssessment], { nullable: true })
    updatedAssessments: OpportunityAssessment[]

    @HideField()
    @Exclude()
    password: string
}
