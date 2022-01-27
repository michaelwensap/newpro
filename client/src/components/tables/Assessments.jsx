import React, { useState, useEffect, useContext } from 'react'
import { AnalyticalTable, Button } from '@ui5/webcomponents-react'
import BreadCrumbContext from '../../BreadCrumbContext'
import { useQuery, gql } from '@apollo/client'
import { useParams, useHistory } from 'react-router-dom'

const ASSESSMENTS = gql`
    query CompanyAssessments($customer_id: Int!) {
        companyAssessments(customer_id: $customer_id) {
            id
            opportunity_name
            sa_owner_user {
                email
            }
            record_update_date
        }
    }
`

export default function Assessments() {
    const history = useHistory()
    const { id } = useParams()
    const customer_id = parseInt(id)

    const { data, loading } = useQuery(ASSESSMENTS, {
        variables: { customer_id },
    })

    const { breadcrumb, setBreadCrumb } = useContext(BreadCrumbContext)

    const onRowClick = (assessment) => {
        assessment = assessment.detail.row.original

        breadcrumb.push({ title: assessment.name, path: '/assessment' })

        setBreadCrumb(breadcrumb)
        history.push('/assessment')
    }

    const onEditClick = (assessment) => {
        breadcrumb.push('Edit Opportunity Assessment')
        setBreadCrumb(breadcrumb)
        history.push({
            pathname: `/assessment/${assessment.id}/edit`,
            assessment: assessment,
        })
    }

    const tableColumns = [
        { Header: 'Name', accessor: 'opportunity_name' },
        { Header: 'OA ID', accessor: 'id' },
        { Header: 'Owner', accessor: 'sa_owner_us.email' },
        { Header: 'Last Active', accessor: 'record_update_date' },
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
        <AnalyticalTable
            header="Assessments"
            columns={tableColumns}
            data={data?.assessments}
            style={{ cursor: 'pointer' }}
            loading={loading}
            onRowClick={(row) => onRowClick(row)}
        ></AnalyticalTable>
    )
}
