import React, { useState, useEffect, useContext } from 'react'
import HttpRequest from '../../utils/HttpRequest'
import Draggable from 'react-draggable'
import CLOSEICON from '../../img/icons/close.svg'
import './CategoryScopeUpdate.css'
import CategoryScopeUpdateContext from '../../CategoryScopeUpdateContext'
import ToastsContext from '../../ToastsContext'
export default function CategoryScopeUpdate() {
    const { categoryScopeUpdate, setCategoryScopeUpdate } = useContext(
        CategoryScopeUpdateContext
    )
    const [info, setInfo] = useState({
        avgInvoiceSupplier: '',
        avgSpendSupplier: '',
        categoryDesc: '',
        categoryLevel: '',
        percInScope: '',
        spendCurrency: '',
        totalCategorySuppliers: '',
        totalCategorySpend: '',
        totalCategoryInvoice: '',
        totalCategoryInScopeSuppliers: '',
        reason: '',
        categoryID: '',
        opportunityID: '',
        inOutScope: '',
        comments: [],
        reasons: [],
    })
    const [showRadio, setShowRadio] = useState(false)
    const [savedChanges, updateSavedChangeds] = useState({
        scope: '',
        reason: '',
        comment: '',
    })
    const [scope, setScope] = useState('')
    const [comment, setComment] = useState('')
    const [reason, setReason] = useState('')
    const { setToastsMessage } = useContext(ToastsContext)

    useEffect(() => {
        ;(async () => {
            if (categoryScopeUpdate.categoryName) {
                const httpRequest = new HttpRequest()
                const resp = await httpRequest.loadCategoryScopeInfo(
                    categoryScopeUpdate
                )
                console.log('resp', resp)
                setInfo(resp.data)
            }
        })()
    }, [categoryScopeUpdate.categoryName])

    function onClose() {
        reset()
    }
    function convert(n) {
        if (n) {
            let num = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format((Number(n) / 1000000).toFixed(1))
            return `${num.substring(0, num.length - 1)} M`
        }
    }
    async function onApply() {
        const httpRequest = new HttpRequest()
        await httpRequest.updateCategoryScopeInfo({
            scope: scope,
            reason: reason,
            comment: comment,
            opportunityID: categoryScopeUpdate.opportunityID,
            categoryID: categoryScopeUpdate.categoryCode,
        })
        reset()
        setToastsMessage('Category has been updated')
    }
    function reset() {
        setComment('')
        setScope('')
        setReason('')
        setCategoryScopeUpdate({})
    }
    return (
        <section
            id="catscope"
            style={{
                display:
                    JSON.stringify(categoryScopeUpdate) !== '{}'
                        ? 'inherit'
                        : 'none',
            }}
        >
            <Draggable defaultPosition={{ x: 500, y: -1000 }}>
                <div className="scope">
                    <div className="scope-header bl">
                        <div className="scope-header-title">
                            {info.categoryDesc}
                        </div>
                        <div className="scope-header-close" onClick={onClose}>
                            {' '}
                            <img
                                src={CLOSEICON}
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    cursor: 'pointer',
                                }}
                                alt="CLOSEICON"
                            />{' '}
                        </div>
                    </div>
                    <div className="scope-info">
                        <div className="row">
                            <div className="col">
                                <div className="info b">
                                    Total Category Spend:{' '}
                                </div>
                            </div>
                            <div className="col">
                                <div className="info">
                                    {convert(info.totalCategorySpend)}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="info b">% In Scope Spend:</div>
                            </div>
                            <div className="col">
                                <div className="info">{`${info.percInScope}%`}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="info b">
                                    In Scope Suppliers:
                                </div>
                            </div>
                            <div className="col">
                                <div className="info">
                                    {info.totalCategoryInScopeSuppliers} of{' '}
                                    {info.totalCategorySuppliers}{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="scope-radio">
                        <div
                            className="row"
                            style={{
                                display: !showRadio ? 'inline' : 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <div
                                className="scope-radio-btn b"
                                onClick={() => {
                                    setShowRadio(!showRadio)
                                }}
                            >
                                Change Scope
                            </div>
                        </div>
                        <div
                            className="row"
                            style={{
                                display: showRadio ? 'inline' : 'none',
                                cursor: 'pointer',
                                paddingLeft: '5px',
                            }}
                        >
                            <div className="col">
                                <div
                                    className="scope-radio-title"
                                    onClick={() => {
                                        setScope('')
                                        setShowRadio(!showRadio)
                                    }}
                                >
                                    {' '}
                                    Change Scope
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault1"
                                        value="1"
                                        checked={scope === '1'}
                                        onChange={() => {
                                            setScope('1')
                                        }}
                                    />
                                    <label className="form-check-label">
                                        All in-scope
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault2"
                                        value="2"
                                        checked={scope === '2'}
                                        onChange={() => {
                                            setScope('2')
                                        }}
                                    />
                                    <label className="form-check-label">
                                        {' '}
                                        All out-of-scope{' '}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="scope-reason"
                        style={{
                            paddingLeft: '10px',
                            paddingTop: '5px',
                            paddingBottom: '5px',
                        }}
                    >
                        <div className="row">
                            <div>Out-of-scope reason*</div>
                        </div>
                        <div className="row">
                            <div style={{ maxWidth: '280px' }}>
                                <select
                                    className="form-select"
                                    aria-label="Select a reason"
                                    onChange={(e) => {
                                        setReason(e.target.value)
                                    }}
                                >
                                    <option value="" selected={reason === ''}>
                                        Select a reason
                                    </option>
                                    {info.reasons.map((item, i) => {
                                        return (
                                            <option
                                                value={item}
                                                key={i}
                                                selected={reason === `${item}`}
                                            >
                                                {' '}
                                                {item}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div
                        className="scope-comment"
                        style={{
                            paddingLeft: '10px',
                            paddingTop: '5px',
                            paddingBottom: '5px',
                        }}
                    >
                        <div className="row">
                            <div>Comment</div>
                        </div>
                        <div className="row">
                            <div style={{ width: '280px' }}>
                                <textarea
                                    className="form-control"
                                    placeholder="Enter Comment"
                                    style={{ height: '64px' }}
                                    value={comment}
                                    onChange={(e) => {
                                        setComment(e.target.value)
                                    }}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="scope-comment-list">
                        {info.comments.map((infoComment) => {
                            return (
                                <div className="row">
                                    <div className="scope-comment-details">
                                        <div className="row">
                                            <div className="col">
                                                {infoComment.username}
                                            </div>
                                            <div className="col">
                                                {infoComment.recordUpdateDate}
                                            </div>
                                        </div>
                                        <div className="row">
                                            {infoComment.comments}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="scope-footer">
                        <div className="row">
                            <div className="scope-footer-button">
                                <div
                                    style={{ top: '5px', position: 'relative' }}
                                >
                                    <button
                                        type="button"
                                        onClick={onApply}
                                        disabled={
                                            comment.length === 0 ? true : false
                                        }
                                        className="btn btn-act"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
        </section>
    )
}
