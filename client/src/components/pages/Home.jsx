import React, { useState } from 'react'
import loginBG from '../../loginBG.svg'
import loginLogo from '../../img/loginLogo2.svg'
import LoginForm from '../forms/LoginForm'
import RegisterForm from '../forms/RegisterForm'
import { Auth } from '../../utils'
import { useHistory } from 'react-router-dom'
import { ResponsiveGridLayout, FlexBox, Title } from '@ui5/webcomponents-react'

export default function Home() {
    const history = useHistory()
    if (Auth.isAuthenticated()) history.push('/admin')
    //const [selectedForm, setSelectedForm] = useState("Login");
    const [showLogIn, setShowLogIn] = useState(true)
    const login = (
        <div>
            <LoginForm />
            <hr></hr>
            <FlexBox justifyContent="SpaceBetween">
                <div style={{ maxWidth: '420px', fontSize: '14px' }}>
                    Are you an SAP Employee and don't have an account yet?
                </div>
                <div
                    onClick={() => setShowLogIn(!showLogIn)}
                    className="bl"
                    style={{
                        color: '#1B90FF',
                        cursor: 'pointer',
                        fontSize: '14px',
                        textAlign: 'right',
                    }}
                >
                    Request an Account
                </div>
            </FlexBox>
        </div>
    )

    const register = (
        <div>
            <RegisterForm />
            <hr></hr>
            <p
                onClick={() => setShowLogIn(!showLogIn)}
                className="bl"
                style={{
                    color: '#1B90FF',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: '14px',
                }}
            >
                or Log in
            </p>
        </div>
    )
    return (
        <ResponsiveGridLayout
            style={{
                gridTemplateColumns: '40% 60%',
                gridGap: '26px',
                height: '100%',
            }}
        >
            <div style={{ marginTop: '8px' }}>
                <img
                    src={loginLogo}
                    alt="Logo"
                    style={{ position: 'relative', right: '17px' }}
                />
                <div style={{ marginTop: '145px' }}>
                    {showLogIn ? login : register}
                </div>
                <p
                    style={{
                        position: 'fixed',
                        bottom: '0',
                        fontSize: '11px',
                        color: '#5B738B',
                    }}
                >
                    © {new Date().getFullYear()} Source Agent by SAP. All Rights
                    Reserved.
                </p>
            </div>
            <div style={{ backgroundColor: '#EBF8FF' }}>
                <Title
                    level="H1"
                    className="bl"
                    wrappingType="Normal"
                    style={{
                        fontSize: '64px',
                        textAlign: 'center',
                        margin: 'auto',
                        paddingTop: '200px',
                        lineHeight: '72px',
                        width: '65%',
                    }}
                >
                    Great sourcing shouldn't be a secret
                </Title>
                <Title
                    level="H2"
                    wrappingType="Normal"
                    style={{
                        fontSize: '20px',
                        paddingTop: '64px',
                        width: '68%',
                        margin: 'auto',
                        lineHeight: '1.8rem',
                        textAlign: 'center',
                    }}
                >
                    Source Agent give you the <b>insights</b> and{' '}
                    <b>strategies</b> to address spend intelligently and{' '}
                    <b>wow your stakeholders</b>.
                </Title>
                <div
                    style={{
                        position: 'fixed',
                        bottom: '0',
                        width: '100%',
                        height: '270px',
                        backgroundImage: `url(${loginBG})`,
                    }}
                />
            </div>
        </ResponsiveGridLayout>
    )
}
