import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { CustomersModule } from './customers/customers.module'
import { OpportunityAssessmentsModule } from './opportunity-assessments/opportunity-assessments.module'
import { PrismaModule } from 'nestjs-prisma'
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphqlConfig } from './configs/config.interface'
import config from './configs/config'
import { DateScalar } from './configs/date.scalar'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [config] }),
        UsersModule,
        GraphQLModule.forRootAsync({
            useFactory: async (configService: ConfigService) => {
                const graphqlConfig =
                    configService.get<GraphqlConfig>('graphql')
                return {
                    installSubscriptionHandlers: true,
                    buildSchemaOptions: {
                        numberScalarMode: 'integer',
                    },
                    sortSchema: graphqlConfig.sortSchema,
                    autoSchemaFile:
                        graphqlConfig.schemaDestination || 'schema.graphql',
                    debug: graphqlConfig.debug,
                    cors: {
                        origin: process.env.CORS_ORIGIN,
                        credentials: true,
                    },
                    playground: graphqlConfig.playgroundEnabled,
                    context: ({ req }) => ({ req }),
                }
            },
            inject: [ConfigService],
        }),
        CustomersModule,
        OpportunityAssessmentsModule,
        PrismaModule.forRoot({
            isGlobal: true,
            prismaServiceOptions: {
                prismaOptions: { log: ['query', 'info', 'warn', 'error'] },
                explicitConnect: true,
            },
        }),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService, DateScalar],
})
export class AppModule {}
