import React, { useState, useEffect } from 'react'
import SortDescending from '../../img/icons/sort-descending.svg'
import SortAscending from '../../img/icons/sort-ascending.svg'

//import HttpRequest from '../../utils/HttpRequest';
import ProgressBar from '../progress/ProgressBar'
import './Tables.css'
import { ReactComponent as LEFTARROWICON } from '../../img/icons/left-arrow.svg'
import { ReactComponent as RIGHTARROWICON } from '../../img/icons/right-arrow.svg'

export default function Suppliers(props) {
    const [suppliers, setSuppliers] = useState([])
    const [sortTypeASC, setSortTypeASC] = useState(false)
    const [clickedColumn, setClickedColumn] = useState('totalSpend')
    const [curpage, setCurPage] = useState(1)
    const [maxpages, setmaxPages] = useState(1)
    const [maxrows, setmaxRows] = useState(10)
    useEffect(() => {
        setSuppliers(props.suppliers)
        setmaxPages(Math.ceil(props.suppliers.length / maxrows))
        setmaxRows(props.maxrows)
        ;(async () => {
            //const httpRequest = new HttpRequest();
            // let resp = await httpRequest.getAssessmentSupplierSpend();
            // setSuppliers(resp.data);
        })()
    }, [props.suppliers])
    const onRowClick = (assessment) => {
        // breadcrumb.push(assessment.name);
        // setBreadCrumb(breadcrumb);
        // localStorage.setItem('assessment', JSON.stringify(assessment));
        // history.push('/assessment');
    }

    const sort = (e) => {
        const ID = e.target.id
        suppliers.sort((a, b) => {
            if (ID !== 'supplierName') {
                if (!sortTypeASC) {
                    if (Number(a[ID]) < Number(b[ID])) {
                        return -1
                    }
                    if (Number(a[ID]) > Number(b[ID])) {
                        return 1
                    }
                } else {
                    if (Number(a[ID]) < Number(b[ID])) {
                        return 1
                    }
                    if (Number(a[ID]) > Number(b[ID])) {
                        return -1
                    }
                }
            } else {
                if (!sortTypeASC) {
                    if (a[ID] < b[ID]) {
                        return -1
                    }
                    if (a[ID] > b[ID]) {
                        return 1
                    }
                } else {
                    if (a[ID] < b[ID]) {
                        return 1
                    }
                    if (a[ID] > b[ID]) {
                        return -1
                    }
                }
            }

            return 0
        })
        setSuppliers(suppliers)
        setClickedColumn(ID)
        setSortTypeASC(!sortTypeASC)
    }

    // function nav(ID) {
    //     setCurPage(ID)
    // }
    function paginatedItems() {
        if (suppliers.length >= 0)
            return suppliers.slice((curpage - 1) * maxrows, curpage * maxrows)
    }
    function convert(n) {
        if (n) {
            let num = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format((Number(n) / 1000000).toFixed(1))
            return `${num.substring(0, num.length - 1)} M`
        }
        // if (n < 1e3) return n;
        // if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + " K";
        // if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + " M";
        // if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + " B";
        // if (n >= 1e12) return +(n / 1e12).toFixed(2) + " T";
    }

    return (
        <>
            <p
                className="bl"
                style={{
                    color: '#354A5F',
                    fontSize: '16px',
                    marginLeft: '8px',
                }}
            >
                {props.title}
            </p>
            <table
                className="table table-borderless table-sm"
                style={{ fontSize: '14px' }}
            >
                <thead className="table-light">
                    <tr>
                        <th
                            scope="col"
                            style={{
                                cursor: 'pointer',
                                fontWeight: 'normal',
                                width: '40%',
                            }}
                            id="supplierName"
                            onClick={sort}
                        >
                            {' '}
                            <img
                                id="supplierName"
                                src={
                                    sortTypeASC === true
                                        ? SortAscending
                                        : SortDescending
                                }
                                style={
                                    clickedColumn === 'supplierName'
                                        ? { width: '20px', height: '20px' }
                                        : {
                                              width: '20px',
                                              height: '20px',
                                              display: 'none',
                                          }
                                }
                                alt="SortDescending"
                            />{' '}
                            Supplier Name
                        </th>
                        <th
                            scope="col"
                            style={{
                                cursor: 'pointer',
                                fontWeight: 'normal',
                                width: '84px',
                                textAlign: 'center',
                            }}
                            id="invoiceCount"
                            onClick={sort}
                        >
                            {' '}
                            <img
                                id="invoiceCount"
                                src={
                                    sortTypeASC === true
                                        ? SortAscending
                                        : SortDescending
                                }
                                style={
                                    clickedColumn === 'invoiceCount'
                                        ? { width: '20px', height: '20px' }
                                        : {
                                              width: '20px',
                                              height: '20px',
                                              display: 'none',
                                          }
                                }
                                alt="SortDescending"
                            />{' '}
                            Invoices
                        </th>
                        <th
                            scope="col"
                            style={{
                                cursor: 'pointer',
                                fontWeight: 'normal',
                                width: '16%',
                                textAlign: 'center',
                            }}
                            id="totalSpend"
                            onClick={sort}
                        >
                            {' '}
                            <img
                                id="totalSpend"
                                src={
                                    sortTypeASC === true
                                        ? SortAscending
                                        : SortDescending
                                }
                                style={
                                    clickedColumn === 'totalSpend'
                                        ? { width: '20px', height: '20px' }
                                        : {
                                              width: '20px',
                                              height: '20px',
                                              display: 'none',
                                          }
                                }
                                alt="SortDescending"
                            />{' '}
                            Suppliers Spend
                        </th>
                        <th
                            scope="col"
                            style={{ cursor: 'pointer', fontWeight: 'normal' }}
                            id="totalSpend"
                            onClick={sort}
                        ></th>
                    </tr>
                </thead>
                <tbody style={{ height: '300px', maxHeight: '600px' }}>
                    {paginatedItems()
                        .slice(0, 10)
                        .map((elm, i) => {
                            return (
                                <tr
                                    key={i}
                                    onClick={() => onRowClick(elm)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>
                                        <div style={{ color: '#354A5F' }}>
                                            {elm.supplierName}
                                        </div>
                                        <div style={{ color: '#5B738B' }}>
                                            {elm.categoryDesc}
                                        </div>
                                    </td>
                                    <td align="right">
                                        {new Intl.NumberFormat('en-US', {
                                            maximumFractionDigits: 3,
                                        }).format(elm.invoiceCount)}
                                    </td>
                                    <td align="right">
                                        {convert(elm.totalSpend)}
                                    </td>
                                    <td style={{ borderLeft: '0' }}>
                                        <ProgressBar
                                            percentage={
                                                elm.ajustedTotalSpendPerc
                                            }
                                            color={i}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            <section className="dataTables_paginate">
                <span className="pag-text" style={{ marginRight: '20px' }}>
                    {curpage} of {maxpages}
                </span>
                <span
                    style={{ marginRight: '28px', cursor: 'pointer' }}
                    onClick={() => {
                        if (curpage > 1) {
                            setCurPage(curpage - 1)
                        }
                    }}
                >
                    <LEFTARROWICON />
                </span>
                <span
                    style={{ marginRight: '20px', cursor: 'pointer' }}
                    onClick={() => {
                        if (curpage < maxpages) {
                            setCurPage(curpage + 1)
                        }
                    }}
                >
                    <RIGHTARROWICON />
                </span>
            </section>
        </>
    )
}
