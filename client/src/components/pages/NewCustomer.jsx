import React from 'react' //, {useState}
import { CustomerForm } from '../forms'
import { Title, FlexBox, Card } from '@ui5/webcomponents-react'

export default function NewCustomer() {
    return (
        <main className="container">
            <Card>
                <ui5-card-header
                    slot="header"
                    title-text="New Customer"
                ></ui5-card-header>
                <CustomerForm />
            </Card>
        </main>
    )
}
