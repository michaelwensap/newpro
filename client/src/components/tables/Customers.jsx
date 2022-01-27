import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AnalyticalTable, Button } from '@ui5/webcomponents-react'
import '@ui5/webcomponents/dist/Icon/add.svg'
import { useQuery, gql } from '@apollo/client'

const CUSTOMERS = gql`
    query {
        customers {
            id
            customer_name
            create_user {
                email
            }
            record_update_date
        }
    }
`

export default function Customers() {
    const { loading, data, refetch } = useQuery(CUSTOMERS)
    const history = useHistory()

    const onRowClick = (customer) => {
        customer = customer.detail.row.original

        localStorage.setItem('customer', JSON.stringify(customer))
        history.push({
            pathname: `/customer/${customer.id}/oas`,
            state: {
                // location state
                customer: customer,
            },
        })
    }

    // Will refetch customers on every rerender. Useful when coming back from editing customer.
    useEffect(refetch)

    const onEditClick = (customer) => {
        localStorage.setItem('customer', JSON.stringify(customer))
        history.push({
            pathname: `/customer/${customer.id}`,
            state: {
                // location state
                customer: customer,
            },
        })
    }

    const tableColumns = [
        { Header: 'Name', accessor: 'customer_name' },
        { Header: 'SA Customer ID', accessor: 'id' },
        { Header: 'Created By', accessor: 'create_user.email' },
        { Header: 'Last Update', accessor: 'record_update_date' },
        {
            Header: 'Actions',
            id: 'actions',
            width: 100,
            disableResizing: true,
            Cell: ({ row }) => {
                return (
                    <Button
                        icon="edit"
                        onClick={() => onEditClick(row.original)}
                    />
                )
            },
        },
    ]

    return (
        <>
            <AnalyticalTable
                header="Customers"
                onRowClick={(row) => onRowClick(row)}
                style={{ cursor: 'pointer' }}
                columns={tableColumns}
                data={data?.customers}
                loading={loading}
            ></AnalyticalTable>
        </>
    )
}
