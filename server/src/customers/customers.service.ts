import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { Customer, Prisma } from '@prisma/client'
import { UpsertCustomerInput } from './dto/upsert-customer.input'

@Injectable()
export class CustomersService {
    constructor(private prisma: PrismaService) {}

    async customer(
        customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput
    ): Promise<Customer | null> {
        return this.prisma.customer.findUnique({
            where: customerWhereUniqueInput,
        })
    }

    async customers(params: {
        skip?: number
        take?: number
        cursor?: Prisma.CustomerWhereUniqueInput
        where?: Prisma.CustomerWhereInput
        orderBy?: Prisma.CustomerOrderByWithRelationInput
    }): Promise<Customer[]> {
        const { skip, take, cursor, where, orderBy } = params
        return this.prisma.customer.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                create_user: true,
            },
        })
    }

    async upsertCustomer(
        upsertCustomerInput: UpsertCustomerInput
    ): Promise<Customer> {
        return this.prisma.customer.upsert({
            update: upsertCustomerInput,
            create: upsertCustomerInput,
            where: { id: upsertCustomerInput.id || 0 },
        })
    }
}
