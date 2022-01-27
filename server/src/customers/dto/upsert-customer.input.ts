import { InputType } from '@nestjs/graphql'

@InputType()
export class UpsertCustomerInput {
    id?: number
    customer_name: string
    sap_crm_bp_id?: number
    capiq_company?: number
    customer_info?: string
    customer_status?: string
    create_user_id: number
}
