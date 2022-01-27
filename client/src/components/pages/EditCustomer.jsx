import React from 'react' //, {useState}
import { CustomerForm } from '../forms'
import { Card } from '@ui5/webcomponents-react'

export default function EditCustomer() {
    return (
        <div className="container">
            <Card>
                <ui5-card-header slot="header" title-text="Edit Customer" />
                <CustomerForm />
            </Card>
        </div>
    )
}
