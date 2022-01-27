import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Customer } from '../../customers/entities/customer.entity'
import { User } from '../../users/entities/user.entity'
import { SpendFile } from './spend-file.entity'

@ObjectType()
export class OpportunityAssessment {
    id: number
    customer_id?: Customer
    opportunity_name: string
    sa_owner_user: User
    opportunity_start_date: Date
    opportunity_end_date: Date
    opportunity_status?: string
    spend_file: SpendFile
    record_create_date: Date
    record_update_date: Date
    record_update_user: User
}
