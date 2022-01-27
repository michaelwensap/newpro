import 'reflect-metadata'
import { ObjectType, Field } from '@nestjs/graphql'
import { User } from '../../users/entities/user.entity'

@ObjectType()
export class Customer {
    id: number
    customer_name: string
    customer_info: string

    @Field({ nullable: true })
    sap_crm_bp_id: number

    @Field({ nullable: true })
    capiq_company: number

    customer_status: string

    @Field((type) => Date, { nullable: true })
    record_create_date: Date

    @Field((type) => Date, { nullable: true })
    record_update_date: Date

    record_update_user: User

    @Field((type) => User, { nullable: true })
    create_user: User
}
