import React, { useState, useEffect, useContext } from 'react' //, {useState}
import { useHistory } from 'react-router-dom'
import HttpRequest from '../../utils/HttpRequest'
import moment from 'moment'
import BreadCrumbContext from '../../BreadCrumbContext'
import ToastsContext from '../../ToastsContext'

export default function AssessmentForm({ formType, formAssessment }) {
    const history = new useHistory()
    const httpRequest = new HttpRequest()
    const [type, setType] = useState('new')
    const [form, setForm] = useState({
        customerID: '',
        name: '',
        owner: '',
        opportunityStartDate: '',
        opportunityEndDate: '',
        spendFileName: '',
        spendFileDesc: '',
        spendFileID: '',
        spendFileClassSystem: '',
        spendFileClassStandard: '',
        spendFileProcessedDate: '',
        spendFileStdCur: '',
    })
    const [customer, setCustomer] = useState({})
    const [owners, setOwners] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const systems = [
        { label: '', value: '0' },
        { label: 'RUN DMC', value: '1' },
        { label: 'Spend Analysis', value: '2' },
        { label: 'Other', value: '3' },
    ]
    //const owners = [{label:'',value:'0'},{label:'SA Owner',value:'1'},{label:'Toyota',value:'2'}];
    const standards = [
        { label: '', value: '0' },
        { label: 'GICS', value: '1' },
        { label: 'UNSPSC', value: '2' },
    ]
    const spendFileStdCur = [
        { label: '', value: '0' },
        { label: 'USD', value: '1' },
        { label: 'EUR', value: '2' },
    ]
    const { breadcrumb, setBreadCrumb } = useContext(BreadCrumbContext)
    const { setToastsMessage } = useContext(ToastsContext)

    useEffect(() => {
        setType(formType)
        setCustomer(JSON.parse(localStorage.getItem('customer')))
        ;(async () => {
            const httpRequest = new HttpRequest()
            let response = await httpRequest.loadUsers()
            setOwners(response.data)
            if (formAssessment) {
                formAssessment.owner = formAssessment.owner.ID
                setForm(formAssessment)
            }
        })()
    }, [formType, formAssessment])

    const submit = async (e) => {
        e.preventDefault()
        if (isValidForm() === false) return
        let resp
        try {
            if (type === 'edit') {
                form.customerID = customer.ID
                resp = await httpRequest.updateOA(form)
            } else {
                form.customerID = customer.ID
                resp = await httpRequest.createOA(form)
            }
            if (resp.status === 200) {
                setToastsMessage(
                    `Assessment has been ${
                        type === 'edit' ? 'updated' : 'created'
                    }`
                )
                goBack()
            }
        } catch (e) {
            goBack()
            console.log(e)
        }
    }
    const onCancle = () => {
        goBack()
    }
    const goBack = () => {
        breadcrumb.pop()
        setBreadCrumb(breadcrumb)
        history.push('/customer')
    }
    const isValidForm = () => {
        if (
            form.name.length === 0 ||
            form.opportunityStartDate.length === 0 ||
            form.opportunityEndDate.length === 0
        ) {
            setErrorMessage(
                'Opportunity Name, Planned Start Date and Expected Completion are all required fields'
            )
            return false
        }
        return true
    }

    return (
        <>
            <p className="bl" style={{ color: '#354A5F', fontSize: '16px' }}>
                Opportunity Assessment Details
            </p>
            <form onSubmit={submit}>
                <div className="mb-3" style={{ display: 'inline' }}>
                    <p
                        style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            float: 'left',
                            color: '#354A5F',
                        }}
                    >
                        Customer:
                    </p>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#354A5F',
                            marginLeft: '70px',
                        }}
                    >
                        {' '}
                        {customer.name}
                    </p>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        style={{ boarder: 'none' }}
                        id="name"
                        placeholder="Opportunity Name*"
                        value={form.name}
                        onChange={(e) => {
                            setForm({ ...form, name: e.target.value })
                        }}
                    />
                    <label>Opportunity Name*</label>
                </div>
                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        value={form.owner}
                        onChange={(e) => {
                            setForm({ ...form, owner: e.target.value })
                        }}
                    >
                        <option key={'default'} value={''}></option>
                        {owners.map(({ name, ID }, i) => {
                            return (
                                <option key={i} value={ID}>
                                    {name}
                                </option>
                            )
                        })}
                    </select>
                    <label>SA Owner</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="date"
                        className="form-control"
                        id="psd"
                        placeholder="Planned Start Date"
                        value={moment(form.opportunityStartDate).format(
                            'YYYY-MM-DD'
                        )}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                opportunityStartDate: e.target.value,
                            })
                        }}
                    />
                    <label>Planned Start Date*</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Expected Completion Date"
                        value={moment(form.opportunityEndDate).format(
                            'YYYY-MM-DD'
                        )}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                opportunityEndDate: e.target.value,
                            })
                        }}
                    />
                    <label>Expected Completion Date*</label>
                </div>
                <div className="mb-3">
                    <p
                        className="bl"
                        style={{ fontSize: '14px', color: '#354A5F' }}
                    >
                        Spend File Details
                    </p>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Spend File Name"
                        value={form.spendFileName}
                        onChange={(e) => {
                            setForm({ ...form, spendFileName: e.target.value })
                        }}
                    />
                    <label>Spend File Name</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Spend File Description"
                        value={form.spendFileDesc}
                        onChange={(e) => {
                            setForm({ ...form, spendFileDesc: e.target.value })
                        }}
                        style={{ height: '100px' }}
                    ></textarea>
                    <label>Spend File Description</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        min="0"
                        placeholder="Spend File ID"
                        value={form.spendFileID}
                        onChange={(e) => {
                            setForm({ ...form, spendFileID: e.target.value })
                        }}
                    />
                    <label>Spend File ID</label>
                </div>
                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        value={form.spendFileStdCur}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                spendFileStdCur: e.target.value,
                            })
                        }}
                    >
                        {spendFileStdCur.map(({ label }, i) => {
                            return (
                                <option key={i} value={label}>
                                    {label}
                                </option>
                            )
                        })}
                    </select>
                    <label>Standard Currency</label>
                </div>
                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        value={form.spendFileClassSystem}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                spendFileClassSystem: e.target.value,
                            })
                        }}
                    >
                        {systems.map(({ label }, i) => {
                            return (
                                <option key={i} value={label}>
                                    {label}
                                </option>
                            )
                        })}
                    </select>
                    <label>Classification System</label>
                </div>
                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        value={form.spendFileClassStandard}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                spendFileClassStandard: e.target.value,
                            })
                        }}
                    >
                        {standards.map(({ label }, i) => {
                            return (
                                <option key={i} value={label}>
                                    {label}
                                </option>
                            )
                        })}
                    </select>
                    <label>Classification Standard</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="date"
                        className="form-control "
                        placeholder="Processed Date"
                        value={moment(form.spendFileProcessedDate).format(
                            'YYYY-MM-DD'
                        )}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                spendFileProcessedDate: e.target.value,
                            })
                        }}
                    />
                    <label>Processed Date</label>
                </div>
                {type === 'edit' ? (
                    <div style={{ fontSize: '14px', color: '#354A5F' }}>
                        {' '}
                        Opportunity Assessment ID: {form.ID}
                    </div>
                ) : null}
                <div className="mb-3">
                    <div style={{ float: 'right', display: 'inline-block' }}>
                        <button
                            type="button"
                            onClick={onCancle}
                            className="btn btn-light"
                            style={{ marginRight: '10px' }}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {' '}
                            {type === 'edit' ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            </form>
            {errorMessage.length > 0 ? (
                <div
                    style={{ marginTop: '20px' }}
                    className="alert alert-danger"
                >
                    {errorMessage}
                </div>
            ) : null}
        </>
    )
}
