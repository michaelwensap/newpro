import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom' //useLocation
import moment from 'moment'
import { AnalyticalTable, Button } from '@ui5/webcomponents-react'
import { useQuery, gql } from '@apollo/client'

const USERS = gql`
    query {
        users {
            id
            username
            role
            email
            status
        }
    }
`

export default function Users() {
    const { loading, data, refetch } = useQuery(USERS)
    const history = useHistory()

    const onEditClick = (e) => {
        history.push({
            pathname: `/user/${e.id}`,
            state: {
                user: e,
            },
        })
    }

    // Will refetch users on every rerender. Useful when come back to page from editing user.
    useEffect(refetch)

    const formatData = (data) => {
        data.map((e) => {
            e.status = formatStatus(e.status)
            e.lastLoginDate = dateFormat(e.lastLoginDate)
        })
    }

    const dateFormat = (e) => {
        return moment(e).format('MMMM Do YYYY, h:mm A')
    }

    const formatStatus = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1)
    }

    const tableColumns = [
        { Header: 'Name', accessor: 'username' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Role', accessor: 'role' },
        { Header: 'Last Login', accessor: 'user_id' },
        { Header: 'Status', accessor: 'status' },
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
                header="Users"
                columns={tableColumns}
                data={data?.users}
                loading={loading}
            ></AnalyticalTable>
        </>
    )
}
