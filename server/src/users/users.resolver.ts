import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { ValidationPipe, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { Public } from 'src/auth/public.decorator'
import { GqlAuthGuard } from '../auth/gql-auth.guard'

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Public()
    @Query(() => [User], { name: 'users' })
    findAll() {
        return this.usersService.users({})
    }

    @Query(() => User, { name: 'user' })
    findOne(@Args('id') id: number) {
        return this.usersService.user({ id: id })
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => User, { name: 'updateUser' })
    async updateUser(@Args('data') data: UpdateUserInput) {
        return this.usersService.updateUser(data)
    }

    @Public()
    @Mutation(() => User)
    requestUserAccess(
        @Args('data', new ValidationPipe()) data: CreateUserInput
    ) {
        return this.usersService.requestUserAccess(data)
    }
}
