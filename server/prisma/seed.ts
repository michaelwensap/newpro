import { PrismaClient } from '@prisma/client'
let users = require('./seeds/users.json')
let customers = require('./seeds/customers.json')
let classifications = require('./seeds/classification_all.json')
let opportunity_assessments = require('./seeds/opportunity_assessments.json')

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding users...')
    await prisma.user.deleteMany()
    await prisma.user.createMany(users)

    console.log('Seeding customers...')
    await prisma.customer.deleteMany()
    await prisma.customer.createMany(customers)

    console.log('Seeding classifications...')
    await prisma.classification.deleteMany()
    await prisma.classification.createMany(classifications)

    /* Don't need to seed opportunity assessments for now as need to sort out spend file process
    console.log('Seeding opportunity assessments...')
    await prisma.opportunityAssessment.deleteMany()
    await prisma.opportunityAssessment.createMany(opportunity_assessments)
    */
}

main()
    .catch((e) => console.log(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
