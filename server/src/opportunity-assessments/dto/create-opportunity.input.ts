import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateOpportunityAssessmentInput {
    opportunity_name: string
    opportunity_start_date!: Date
    opportunity_end_date!: Date
    spend_file_name: string
    spend_file_desc: string
}
