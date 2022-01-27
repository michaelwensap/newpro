import React from 'react'
import { useHistory } from 'react-router-dom' //useLocation,
import { Customers, Users } from '../tables'
import {
    Title,
    TabContainer,
    Tab,
    FlexBox,
    Button,
} from '@ui5/webcomponents-react'
import '@ui5/webcomponents-icons/dist/customer.js'
import '@ui5/webcomponents-icons/dist/user-edit.js'
import '@ui5/webcomponents-icons/dist/Icon/add.svg'

export default function Admin(props) {
    const history = useHistory()

    const createCustomer = () => {
        history.push('new-customer')
    }

    const tabSelectEvent = (e) => {
        const currentPath = props.match.path

        switch (e.detail.tabIndex) {
            case 0: // Customers
                history.push(`${currentPath}/customers`)
                break
            default:
                // Users
                history.push(`${currentPath}/users`)
        }
    }

    return (
        <main>
            <Title level="H2">Admin</Title>
            <TabContainer onTabSelect={tabSelectEvent}>
                <Tab
                    text="Customers"
                    icon="customer"
                    selected={
                        props.location.pathname === '/admin/customers' ||
                        props.location.pathname === '/admin'
                    }
                >
                    <FlexBox justifyContent="End">
                        <Button icon="add" onClick={createCustomer}>
                            New Customer
                        </Button>
                    </FlexBox>
                    <Customers />
                </Tab>
                <Tab
                    text="Users"
                    icon="user-edit"
                    selected={props.location.pathname === '/admin/users'}
                >
                    <Users />
                </Tab>
            </TabContainer>
        </main>
    )
}
