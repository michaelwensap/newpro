import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Auth } from '../../utils'
import {
    Button,
    FlexBox,
    Form,
    FormItem,
    Title,
} from '@ui5/webcomponents-react'
import ToastsContext from '../../ToastsContext'

import { useMutation, gql } from '@apollo/client'

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(data: { email: $email, password: $password }) {
            accessToken
            refreshToken
        }
    }
`

export default function LoginForm() {
    const [login, { data }] = useMutation(LOGIN)
    const history = useHistory()
    const { setToastsMessage } = useContext(ToastsContext)

    const submit = async (e) => {
        e.preventDefault()
        /*window.location.replace(
            `https://accounts400.sap.com/oauth2/authorize?response_type=code&scope=openid+email+profile&client_id=f74ddbf2-a4ce-4aa7-9d53-183cd9ed4fae&state=state&redirect_uri=${window.location.href}`*/
        try {
            await login({
                variables: {
                    email: 'bob.doe@sap.com',
                    password: 'testing123',
                },
            })
        } catch (e) {
            setToastsMessage('Authentication failed.')
        }
    }

    if (data) {
        Auth.setToken(data.login.accessToken)
        history.push('/admin')
    }

    return (
        <FlexBox direction="Column">
            <Title level="H2">Log in to your account</Title>
            <Form style={{ gridTemplateColumns: '1fr' }}>
                <FormItem>
                    <Button
                        design="Emphasized"
                        style={{ width: '100%', margin: '1.5rem 0 2rem 0' }}
                        onClick={submit}
                    >
                        Log in via SSO
                    </Button>
                </FormItem>
            </Form>
        </FlexBox>
    )
}
