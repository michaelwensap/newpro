import React, { useState } from 'react' //, {useState,useEffect}
import { useHistory } from 'react-router-dom'
import { HttpRequest } from '../../utils'
export default function Reset() {
    const history = useHistory()
    const [messageText, setMessageText] = useState('')
    const secques = [
        'What is the name of your favorite book?',
        'What is the name of the road you grew up on?',
        'What is your mother’s maiden name?',
        'What was the name of your first/current/favorite pet?',
        'What was the first company that you worked for?',
        'Where did you meet your spouse?',
        'Where did you go to high school/college?',
        'What is your favorite food?',
        'What city were you born in?',
        'Where is your favorite place to vacation?',
    ]
    const [resetForm, setResetForm] = useState({ email: '' })
    const [passwordForm, setPasswordForm] = useState({
        password: '',
        cpassword: '',
        email: '',
        securityQuestion: secques[0],
        securityAnswer: '',
    })
    const [showReset, setShowReset] = useState(true)

    const submit = async (e) => {
        setMessageText('')
        const httpRequest = new HttpRequest()
        e.preventDefault()
        //form.password = Buffer.from(form.password).toString('base64');
        try {
            const { status, data } = await httpRequest.resetRequest(
                resetForm.email
            )
            if (status === 200) {
                //setMessageText(data);
                setShowReset(false)
                setPasswordForm({
                    email: data.email,
                    password: '',
                    securityQuestion: data.securityQuestion,
                    securityAnswer: '',
                })
            } else {
                setMessageText(data)
            }
        } catch (error) {
            setMessageText(e)
        }
    }
    const onSubmit = async (e) => {
        setMessageText('')
        const httpRequest = new HttpRequest()
        e.preventDefault()
        const cpw = Buffer.from(passwordForm.password).toString('base64')
        const csa = Buffer.from(passwordForm.securityAnswer).toString('base64')
        try {
            const { status, data } = await httpRequest.resetPassword({
                password: cpw,
                email: passwordForm.email,
                securityAnswer: csa,
            })
            if (status === 200) {
                setPasswordForm({
                    password: '',
                    cpassword: '',
                    email: '',
                    securityQuestion: secques[0],
                    securityAnswer: '',
                })
                setMessageText(data)
                history.push('/')
            } else {
                setPasswordForm({
                    password: '',
                    cpassword: '',
                    email: '',
                    securityQuestion: secques[0],
                    securityAnswer: '',
                })
                setMessageText(data)
            }
        } catch (error) {
            setMessageText(e)
        }
    }
    const onCancle = () => {
        history.push('/admin')
    }

    const rForm = (
        <form onSubmit={submit} style={{ paddingTop: '30px' }}>
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={resetForm.email}
                    onChange={(e) => {
                        setResetForm({ ...resetForm, email: e.target.value })
                    }}
                />
            </div>

            <div className="mb-3">
                <button
                    type="button"
                    onClick={onCancle}
                    className="btn btn-light"
                    style={{ width: '100%', float: 'left' }}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', float: 'right' }}
                >
                    Request Password Reset
                </button>
            </div>
        </form>
    )

    const pForm = (
        <form style={{ paddingTop: '30px' }}>
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Confirm email"
                    value={passwordForm.email}
                    onChange={(e) => {
                        setPasswordForm({
                            ...passwordForm,
                            email: e.target.value,
                        })
                    }}
                />
            </div>
            <div className="mb-3">
                <label>Security Question</label>
            </div>
            <div className="mb-3">
                <select
                    id="squestions"
                    className="form-control"
                    value={passwordForm.securityQuestion}
                    onChange={(e) => {
                        setPasswordForm({
                            ...passwordForm,
                            securityQuestion: e.target.value,
                        })
                    }}
                    disabled
                >
                    {secques.map((elm, i) => {
                        return <option key={i}>{elm}</option>
                    })}
                </select>
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="answer"
                    placeholder="Answer"
                    value={passwordForm.securityAnswer}
                    onChange={(e) => {
                        setPasswordForm({
                            ...passwordForm,
                            securityAnswer: e.target.value,
                        })
                    }}
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="New Password"
                    value={passwordForm.password}
                    onChange={(e) => {
                        setPasswordForm({
                            ...passwordForm,
                            password: e.target.value,
                        })
                    }}
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    placeholder="Confirm New Password"
                    value={passwordForm.cpassword}
                    onChange={(e) => {
                        setPasswordForm({
                            ...passwordForm,
                            cpassword: e.target.value,
                        })
                    }}
                />
            </div>
            <div className="mb-3">
                <button
                    type="button"
                    onClick={onCancle}
                    className="btn btn-light"
                    style={{ width: '100%', float: 'left' }}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onSubmit}
                    style={{ width: '100%', float: 'right' }}
                >
                    Reset
                </button>
            </div>
        </form>
    )
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div
                        style={{
                            marginTop: '100px',
                            width: '500px',
                            marginLeft: '300px',
                        }}
                    >
                        <h5 style={{ fontWeight: 'bold' }}> Reset Password</h5>
                        {showReset ? rForm : pForm}
                    </div>
                </div>
                {messageText.length > 0 ? (
                    <p style={{ color: '#FF0000', marginLeft: '300px' }}>
                        {' '}
                        {messageText}{' '}
                    </p>
                ) : null}
            </div>
        </div>
    )
}
