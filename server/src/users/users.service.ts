import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { User, Prisma } from '@prisma/client'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        })
    }

    async users(params: {
        skip?: number
        take?: number
        cursor?: Prisma.UserWhereUniqueInput
        where?: Prisma.UserWhereInput
        orderBy?: Prisma.UserOrderByWithRelationInput
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        })
    }

    async updateUser(data: UpdateUserInput): Promise<User> {
        return this.prisma.user.update({
            data: data,
            where: { id: data.id },
        })
    }

    async requestUserAccess(data: CreateUserInput): Promise<User> {
        const userExists = await this.user({
            email: data.email,
        })

        if (userExists) {
            return userExists
        }

        const user = {
            username: data.email.split('@')[0],
            email: data.email,
        }

        return this.prisma.user.create({
            data: user,
        })
    }
}
