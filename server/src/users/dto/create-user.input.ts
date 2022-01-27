import { InputType } from '@nestjs/graphql'
import { Matches, IsEmail } from 'class-validator'

@InputType()
export class CreateUserInput {
    @IsEmail()
    @Matches('^[a-z0-9.-]+@sap.com$')
    email: string
}
