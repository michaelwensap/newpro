import { Scalar, CustomScalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'
import { format } from 'date-fns'

@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<number, Date> {
    description = 'Date custom scalar type'

    parseValue(value: number): Date {
        return new Date(value) // value from the client
    }

    serialize(value: Date): any {
        return format(value, 'MMMM do yyyy, h:m a')
    }

    parseLiteral(ast: ValueNode): Date {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value)
        }
        return null
    }
}
