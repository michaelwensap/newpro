import React, { useState } from 'react'
import './SpendFileDetails.css'
import INFO from '../../img/icons/info.svg'
import SYSTEM from '../../img/icons/class-system.svg'
import STANDARD from '../../img/icons/class-standard.svg'
import DESCRIPTION from '../../img/icons/description.svg'
import CURRENCY from '../../img/icons/currency.svg'
import PRODATE from '../../img/icons/processed-date.svg'
import FNAME from '../../img/icons/spend-file-name.svg'
export default function SpendFileDetails({
    classificationStandard,
    classificationSystem,
    percClassified,
    percInScopeSpend,
    processedDate,
    spendCurrency,
    spendFileDesc,
    spendFileName,
    totalInScopeSpend,
    totalSpend,
}) {
    const [show, setShow] = useState(false)
    return (
        <>
            <div className="spend-file-details-wraper">
                <div
                    onClick={() => {
                        setShow(!show)
                    }}
                    className="wrap-icon"
                >
                    <img
                        src={INFO}
                        width="18px"
                        height="18px"
                        className="d-inline-block align-top"
                        alt="info"
                    />
                    <div style={{ paddingLeft: '4px', display: 'inline' }}>
                        Spend File Details
                    </div>
                </div>
                {show ? (
                    <div
                        className="spend-file-details-wrap-list"
                        onPointerLeave={() => {
                            setShow(!show)
                        }}
                    >
                        <div
                            style={{
                                border: 'solid',
                                borderColor: '#F5F6F7',
                                height: '66px',
                            }}
                        >
                            <div
                                className="bl"
                                style={{
                                    position: 'absolute',
                                    color: '#354A5F',
                                    fontSize: '16px',
                                    top: '6%',
                                    left: '6%',
                                }}
                            >
                                Spend File Details
                            </div>
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <img
                                    src={FNAME}
                                    width="18px"
                                    height="18px"
                                    className="d-inline-block align-top"
                                    alt="name"
                                />
                                <div
                                    className="list-group-item-key bl"
                                    style={{ marginLeft: '12px' }}
                                >
                                    Spend File Name:
                                </div>
                                <div className="list-group-item-value">
                                    {spendFileName}
                                </div>
                            </li>
                            <li className="list-group-item">
                                <span style={{ display: 'inline-block' }}>
                                    <img
                                        src={DESCRIPTION}
                                        width="18px"
                                        height="18px"
                                        className="d-inline-block align-top"
                                        alt="dec"
                                    />
                                </span>
                                <span style={{ marginLeft: '12px' }}>
                                    <div className="list-group-item-key bl">
                                        Description:
                                    </div>
                                    <div className="list-group-item-value">
                                        {spendFileDesc}
                                    </div>
                                </span>
                            </li>
                            <li className="list-group-item">
                                <img
                                    src={CURRENCY}
                                    width="18px"
                                    height="18px"
                                    className="d-inline-block align-top"
                                    alt="cur"
                                />
                                <div
                                    className="list-group-item-key bl"
                                    style={{ marginLeft: '12px' }}
                                >
                                    Standard Currency:{' '}
                                </div>
                                <div className="list-group-item-value">
                                    {spendCurrency}
                                </div>
                            </li>
                            <li className="list-group-item">
                                <img
                                    src={SYSTEM}
                                    width="18px"
                                    height="18px"
                                    className="d-inline-block align-top"
                                    alt="sys"
                                />
                                <div
                                    className="list-group-item-key bl"
                                    style={{ marginLeft: '12px' }}
                                >
                                    Classification System:{' '}
                                </div>
                                <div className="list-group-item-value">
                                    {classificationSystem}
                                </div>
                            </li>
                            <li className="list-group-item">
                                <img
                                    src={STANDARD}
                                    width="18px"
                                    height="18px"
                                    className="d-inline-block align-top"
                                    alt="std"
                                />
                                <div
                                    className="list-group-item-key bl"
                                    style={{ marginLeft: '12px' }}
                                >
                                    Classification Standard:{' '}
                                </div>
                                <div className="list-group-item-value">
                                    {classificationStandard}
                                </div>
                            </li>
                            <li className="list-group-item">
                                <img
                                    src={PRODATE}
                                    width="18px"
                                    height="18px"
                                    className="d-inline-block align-top"
                                    alt="date"
                                />
                                <div
                                    className="list-group-item-key bl"
                                    style={{ marginLeft: '12px' }}
                                >
                                    Processed Date:{' '}
                                </div>
                                <div className="list-group-item-value">
                                    {processedDate}
                                </div>
                            </li>
                        </ul>
                    </div>
                ) : null}
            </div>
        </>
    )
}
