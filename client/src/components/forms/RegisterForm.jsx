import React, { useState, useContext } from 'react'
import ToastsContext from '../../ToastsContext'
import {
    Button,
    FlexBox,
    Form,
    FormItem,
    MessageStrip,
    Title,
    Input,
    InputType,
} from '@ui5/webcomponents-react'
import '@ui5/webcomponents/dist/features/InputElementsFormSupport.js'

import { useMutation, gql } from '@apollo/client'
import { useForm } from 'react-hook-form'

const REQUEST_USER_ACCESS = gql`
    mutation requestUserAccess($email: String!) {
        requestUserAccess(data: { email: $email }) {
            id
            username
            email
            record_create_date
        }
    }
`

export default function RegisterForm() {
    const {
        handleSubmit,
        getValues,
        register,
        formState: { errors },
    } = useForm()
    const [requestUserAccess, { error, data }] =
        useMutation(REQUEST_USER_ACCESS)
    const [messageText, setMessageText] = useState('')
    const { setToastsMessage } = useContext(ToastsContext)

    if (error) {
        setMessageText(error)
    }

    const submitHandler = () => {
        if (!errors.email) {
            requestUserAccess({
                variables: { email: getValues('email') },
            })
            setToastsMessage(`Access has been requested.`)
        }
    }

    return (
        <FlexBox direction="Column">
            <Title level="H1">Request access</Title>
            <Form
                style={{ gridTemplateColumns: '1fr' }}
                onSubmit={handleSubmit(submitHandler)}
            >
                <FormItem>
                    <Input
                        style={{ width: '100%', marginTop: '2rem' }}
                        placeholder="SAP email address"
                        type={InputType.Email}
                        {...register('email', {
                            required: 'Please enter an email address.',
                            pattern: {
                                value: /^[a-z0-9.-]+@sap.com$/,
                                message: 'Not an @sap.com email address.',
                            },
                        })}
                    />
                </FormItem>
                <FormItem>
                    <Button
                        design="Emphasized"
                        onClick={handleSubmit(submitHandler)}
                        style={{ width: '100%', margin: '1.5rem 0 2rem 0' }}
                    >
                        Request access
                    </Button>
                </FormItem>
                <FormItem>
                    {errors?.email && (
                        <MessageStrip hideCloseButton="true" design="Negative">
                            {errors.email.message}
                        </MessageStrip>
                    )}
                </FormItem>
            </Form>
        </FlexBox>
    )
}
