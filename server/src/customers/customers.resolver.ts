import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CustomersService } from './customers.service'
import { Customer } from './entities/customer.entity'
import { UpsertCustomerInput } from './dto/upsert-customer.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql-auth.guard'
import { UserEntity } from '../auth/user.decorator'
import { User } from '../users/entities/user.entity'
import { Public } from '../auth/public.decorator'

@Resolver(() => Customer)
export class CustomersResolver {
    constructor(private readonly customersService: CustomersService) {}

    @Public()
    @UseGuards(GqlAuthGuard)
    @Query(() => [Customer], { name: 'customers' })
    customers() {
        return this.customersService.customers({})
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Customer, { name: 'customer' })
    customer(@Args('id') id: number) {
        return this.customersService.customer({ id: id })
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Customer)
    async upsertCustomer(
        @UserEntity() user: User,
        @Args('data') data: UpsertCustomerInput
    ) {
        const customer: UpsertCustomerInput = {
            ...data,
            create_user_id: user.id,
        }

        return this.customersService.upsertCustomer(customer)
    }
}
