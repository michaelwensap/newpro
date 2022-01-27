import { InputType } from '@nestjs/graphql'
import { CreateUserInput } from './create-user.input'

@InputType()
export class UpdateUserInput extends CreateUserInput {
    id: number
    username?: string

    status: string
}
