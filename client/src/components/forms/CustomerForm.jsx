import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation, useQuery, gql } from '@apollo/client'
import { useForm } from 'react-hook-form'
import ToastsContext from '../../ToastsContext'
import { Form, FormItem, Input, Button } from '@ui5/webcomponents-react'
import { useParams } from 'react-router-dom'

const UPSERT_CUSTOMER = gql`
    mutation upsertCustomer(
        $id: Int
        $customer_name: String!
        $sap_crm_bp_id: Int
        $capiq_company: Int
    ) {
        upsertCustomer(
            data: {
                id: $id
                create_user_id: 0
                customer_name: $customer_name
                sap_crm_bp_id: $sap_crm_bp_id
                capiq_company: $capiq_company
            }
        ) {
            id
        }
    }
`

const GET_CUSTOMER = gql`
    query Customer($id: Int!) {
        customer(id: $id) {
            id
            customer_name
            sap_crm_bp_id
            capiq_company
        }
    }
`

export default function CustomerForm() {
    const { id } = useParams()
    const cusId = parseInt(id)

    const [upsertCustomer] = useMutation(UPSERT_CUSTOMER)
    const { error, loading, data } = useQuery(GET_CUSTOMER, {
        variables: { id: cusId },
    })

    const { setToastsMessage } = useContext(ToastsContext)
    const history = new useHistory()

    const {
        handleSubmit,
        getValues,
        setValue,
        register,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (data) {
            setValue('customer_name', data.customer.customer_name)
            setValue('sap_crm_bp_id', data.customer.sap_crm_bp_id || undefined)
            setValue('capiq_company', data.customer.capiq_company || undefined)
        }
    }, data)

    const submitHandler = async () => {
        if (!errors.customer_name) {
            const variables = {
                id: id ? parseInt(id) : undefined,
                customer_name: getValues('customer_name'),
                sap_crm_bp_id:
                    getValues('sap_crm_bp_id') !== ''
                        ? getValues('sap_crm_bp_id')
                        : null,
                capiq_company:
                    getValues('capiq_company') !== ''
                        ? getValues('capiq_company')
                        : null,
            }

            try {
                const { response } = await upsertCustomer({
                    variables,
                })

                if (id) {
                    setToastsMessage(`Customer updated.`)
                } else {
                    setToastsMessage(`Customer created.`)
                }
            } catch (e) {
                if (id) {
                    setToastsMessage(`Error updating customer.`)
                } else {
                    setToastsMessage(`Error creating customer.`)
                }
            }
        }
    }

    const backToAdmin = () => {
        history.push('/admin')
    }

    return (
        <Form style={{ gridTemplateColumns: '1fr', margin: '2rem 4rem' }}>
            <FormItem>
                <Input
                    placeholder="Customer Name*"
                    name="customer_name"
                    {...register('customer_name', { required: true })}
                    style={{ width: '100%', marginTop: '1rem' }}
                />
            </FormItem>
            <FormItem>
                <Input
                    placeholder="Customer BP ID"
                    name="sap_crm_bp_id"
                    type="Number"
                    {...register('sap_crm_bp_id', { valueAsNumber: true })}
                    style={{ width: '100%', marginTop: '1rem' }}
                />
            </FormItem>
            <FormItem>
                <Input
                    placeholder="CapIQ Company ID"
                    name="capiq_company"
                    type="Number"
                    {...register('capiq_company', { valueAsNumber: true })}
                    style={{ width: '100%', marginTop: '1rem' }}
                />
            </FormItem>
            <FormItem>
                <div
                    style={{
                        textAlign: 'right',
                        width: '100%',
                        marginTop: '1rem',
                    }}
                >
                    <Button
                        design="Transparent"
                        style={{ marginRight: '1rem' }}
                        onClick={backToAdmin}
                    >
                        Cancel
                    </Button>
                    <Button
                        design="Emphasized"
                        onClick={handleSubmit(submitHandler)}
                    >
                        Save
                    </Button>
                </div>
            </FormItem>
        </Form>
    )
}
