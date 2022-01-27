import React, { useEffect, useContext } from 'react' //, {useState,useEffect}
import { useHistory, useParams } from 'react-router-dom'
import ToastsContext from '../../ToastsContext'
import {
    Card,
    CardHeader,
    Title,
    FlexBox,
    Grid,
    Select,
    Button,
    Option,
    Form,
    FormItem,
    Input,
    InputType,
} from '@ui5/webcomponents-react'
import '@ui5/webcomponents/dist/features/InputElementsFormSupport.js'
import { useMutation, useQuery, gql } from '@apollo/client'
import { useForm, Controller } from 'react-hook-form'

const UPDATE_USER = gql`
    mutation updateUser(
        $id: Int!
        $username: String!
        $email: String!
        $status: String!
    ) {
        updateUser(
            data: {
                id: $id
                username: $username
                email: $email
                status: $status
            }
        ) {
            id
        }
    }
`

const GET_USER = gql`
    query User($id: Int!) {
        user(id: $id) {
            id
            username
            email
            status
        }
    }
`

export default function EditUser() {
    const history = useHistory()
    const { id } = useParams()
    const userId = parseInt(id)

    const { data } = useQuery(GET_USER, {
        variables: { id: userId },
    })

    const { setToastsMessage } = useContext(ToastsContext)

    const {
        handleSubmit,
        getValues,
        setValue,
        register,
        control,
        reset,
        formState: { errors },
    } = useForm()

    const [updateUser] = useMutation(UPDATE_USER)

    const goBack = (e) => {
        history.push('/admin/users')
    }

    useEffect(() => {
        if (data) {
            reset({
                username: data.user.username,
                email: data.user.email,
                status: data.user.status,
            })
        }
    }, [data])

    const submitHandler = async () => {
        if (!errors.email) {
            try {
                await updateUser({
                    variables: {
                        id: parseInt(id),
                        username: getValues('username'),
                        email: getValues('email'),
                        status: document.forms[0].status.value, // Not getting select value from getValues() for some reason so using document.forms here.
                    },
                })
                setToastsMessage(`User updated.`)
            } catch (e) {
                setToastsMessage(`Error updating user.`)
            }
        }
    }

    return (
        <main className="container">
            <Card>
                <ui5-card-header
                    slot="header"
                    title-text="Edit User"
                    subtitle-text={data?.user.username}
                ></ui5-card-header>
                <Form className="mt-5" onSubmit={handleSubmit(submitHandler)}>
                    <FormItem label="User Name">
                        <Input
                            type={InputType.Text}
                            {...register('username')}
                        />
                    </FormItem>
                    <FormItem label="Email">
                        <Input
                            type={InputType.Email}
                            {...register('email', { required: true })}
                        />
                    </FormItem>
                    <FormItem label="Status">
                        <Select name="status" {...register}>
                            <Option
                                value="approved"
                                selected={getValues('status') === 'approved'}
                            >
                                Approved
                            </Option>
                            <Option
                                value="pending"
                                selected={getValues('status') === 'pending'}
                            >
                                Pending
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="">
                        <FlexBox direction="Row" className="my-4">
                            <div className="me-4">
                                <Button onClick={goBack} design="Transparent">
                                    Go Back
                                </Button>
                            </div>
                            <div>
                                <Button
                                    design="Emphasized"
                                    onClick={handleSubmit(submitHandler)}
                                >
                                    Update
                                </Button>
                            </div>
                        </FlexBox>
                    </FormItem>
                </Form>
            </Card>
        </main>
    )
}
