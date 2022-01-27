import { Auth } from './entities/auth.entity'
import { Token } from './entities/token.entity'
import { LoginInput } from './dto/login.input'
import { Resolver, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { SignupInput } from './dto/signup.input'
import { RefreshTokenInput } from './dto/refresh-token.input'
import { Public } from 'src/auth/public.decorator'
import { User } from '../users/entities/user.entity'

@Resolver(() => Auth)
export class AuthResolver {
    constructor(private readonly auth: AuthService) {}

    @Public()
    @Mutation(() => Auth)
    async signup(@Args('data') data: SignupInput) {
        data.email = data.email.toLowerCase()
        const { accessToken, refreshToken } = await this.auth.createUser(data)
        return {
            accessToken,
            refreshToken,
        }
    }

    @Public()
    @Mutation(() => Auth)
    async login(@Args('data') { email, password }: LoginInput) {
        const { accessToken, refreshToken } = await this.auth.login(
            email.toLowerCase(),
            password
        )

        return {
            accessToken,
            refreshToken,
        }
    }

    @Mutation(() => Token)
    async refreshToken(@Args() { token }: RefreshTokenInput) {
        return this.auth.refreshToken(token)
    }

    @ResolveField('user', (returns) => User)
    async user(@Parent() auth: Auth) {
        return await this.auth.getUserFromToken(auth.accessToken)
    }
}
