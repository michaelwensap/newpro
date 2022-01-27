import React, { useState, useEffect, useContext } from 'react'
import BreadCrumbContext from '../../BreadCrumbContext'
import SortDescending from '../../img/icons/sort-descending.svg'
import SortAscending from '../../img/icons/sort-ascending.svg'

//import HttpRequest from '../../utils/HttpRequest';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import ProgressBar from '../progress/ProgressBar'
import { useHistory } from 'react-router-dom'
import './Tables.css'
import { ReactComponent as LEFTARROWICON } from '../../img/icons/left-arrow.svg'
import { ReactComponent as RIGHTARROWICON } from '../../img/icons/right-arrow.svg'

export default function Categories(props) {
    const { breadcrumb, setBreadCrumb } = useContext(BreadCrumbContext)
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [levels, setLevels] = useState([])
    const [sortTypeASC, setSortTypeASC] = useState(false)
    const [clickedColumn, setClickedColumn] = useState('totalSpend')
    const [curpage, setCurPage] = useState(1)
    const [maxpages, setmaxPages] = useState(1)
    const [maxrows] = useState(10)

    useEffect(() => {
        setCategories(props.categories)
        setLevels(props.levels)
        setmaxPages(Math.ceil(props.categories.length / maxrows))
        ;(async () => {
            // const httpRequest = new HttpRequest();
            // let resp = await httpRequest.getAssessmentCatagorySpend();
            // setCategories(resp.data);
        })()
    }, [props.categories, props.levels])
    const onRowClick = (category) => {
        breadcrumb.push({ title: category.categoryName, path: '/assesment' })
        setBreadCrumb(breadcrumb)
        localStorage.setItem('category', JSON.stringify(category))
        history.push('/assessment-category')
    }

    const sort = (e) => {
        const ID = e.target.id
        categories.sort((a, b) => {
            if (ID !== 'categoryName') {
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
        setCategories(categories)
        setClickedColumn(ID)
        setSortTypeASC(!sortTypeASC)
    }

    // function formatAmount(amount) {
    //     // Create our number formatter.
    //     var formatter = new Intl.NumberFormat('en-US', {
    //         style: 'currency',
    //         currency: 'USD',

    //         // These options are needed to round to whole numbers if that's what you want.
    //         //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //         //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    //     });

    //     return formatter.format(amount); /* $2,500.00 */
    // }
    function nav(ID) {
        setCurPage(ID)
    }
    function paginatedItems() {
        if (categories.length >= 0)
            return categories.slice((curpage - 1) * maxrows, curpage * maxrows)
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
            <div style={{ width: '100%' }}>
                <div
                    className="bl"
                    style={{
                        color: '#354A5F',
                        fontSize: '16px',
                        marginLeft: '8px',
                        display: 'inline',
                    }}
                >
                    Top 20 Categories by Spend
                </div>
                <div
                    style={{
                        display: 'inline',
                        float: 'right',
                        width: '200px',
                        marginBottom: '2px',
                    }}
                >
                    <DropdownButton
                        id="dropdown-basic-button"
                        title={props.selectedLevel}
                        variant="light"
                    >
                        {levels.map(({ key, value }, i) => {
                            return (
                                <Dropdown.Item
                                    key={key}
                                    eventKey={value}
                                    onSelect={(eventKey) => {
                                        props.onLevelSelect(eventKey)
                                    }}
                                >{`${value}`}</Dropdown.Item>
                            )
                        })}
                    </DropdownButton>
                </div>
            </div>
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
                            id="categoryName"
                            onClick={sort}
                        >
                            {' '}
                            <img
                                id="categoryName"
                                src={
                                    sortTypeASC === true
                                        ? SortAscending
                                        : SortDescending
                                }
                                style={
                                    clickedColumn === 'categoryName'
                                        ? { width: '20px', height: '20px' }
                                        : {
                                              width: '20px',
                                              height: '20px',
                                              display: 'none',
                                          }
                                }
                                alt="SortDescending"
                            />{' '}
                            Category Name
                        </th>
                        <th
                            scope="col"
                            style={{
                                cursor: 'pointer',
                                fontWeight: 'normal',
                                width: '100px',
                                textAlign: 'center',
                            }}
                            id="supplierCount"
                            onClick={sort}
                        >
                            {' '}
                            <img
                                id="supplierCount"
                                src={
                                    sortTypeASC === true
                                        ? SortAscending
                                        : SortDescending
                                }
                                style={
                                    clickedColumn === 'supplierCount'
                                        ? { width: '20px', height: '20px' }
                                        : {
                                              width: '20px',
                                              height: '20px',
                                              display: 'none',
                                          }
                                }
                                alt="SortDescending"
                            />{' '}
                            Suppliers
                        </th>
                        <th
                            scope="col"
                            style={{
                                cursor: 'pointer',
                                fontWeight: 'normal',
                                width: '120px',
                                textAlign: 'center',
                            }}
                            id="totalSpendPerc"
                            onClick={sort}
                        >
                            {' '}
                            <img
                                id="totalSpendPerc"
                                src={
                                    sortTypeASC === true
                                        ? SortAscending
                                        : SortDescending
                                }
                                style={
                                    clickedColumn === 'totalSpendPerc'
                                        ? { width: '20px', height: '20px' }
                                        : {
                                              width: '20px',
                                              height: '20px',
                                              display: 'none',
                                          }
                                }
                                alt="SortDescending"
                            />
                            % Total Spend
                        </th>
                        <th
                            scope="col"
                            style={{
                                cursor: 'pointer',
                                fontWeight: 'normal',
                                width: '12%',
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
                            />
                            Category Spend
                        </th>
                        <th
                            scope="col"
                            style={{ cursor: 'pointer', fontWeight: 'normal' }}
                            id="totalSpend"
                            onClick={sort}
                        ></th>
                    </tr>
                </thead>
                <tbody style={{ height: '600px' }}>
                    {paginatedItems().map((elm, i) => {
                        return (
                            <tr
                                key={i}
                                onClick={() => onRowClick(elm)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>{elm.categoryName}</td>
                                <td align="right">
                                    {new Intl.NumberFormat('en-US', {
                                        maximumFractionDigits: 3,
                                    }).format(elm.supplierCount)}
                                </td>
                                <td align="right">{elm.totalSpendPerc}</td>
                                <td align="right">{convert(elm.totalSpend)}</td>
                                <td style={{ borderLeft: '0' }}>
                                    <ProgressBar
                                        percentage={elm.ajustedTotalSpendPerc}
                                        color={i}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                {/* <tfoot style={{ height:'40px' }}>
                    <tr aria-label="..." style={{ position: 'absolute', bottom: '0',right:'0'}}>
                        <td>
                            <ul className="pagination pagination-sm">
                                <li className={`page-item ${curpage === 1 ? 'active' : ''}`}><span id='1' onClick={(e) => { nav(Number(e.target.id)) }} className="page-link">1</span></li>
                                <li className={`page-item ${curpage === 2 ? 'active' : ''}`}><span id='2' onClick={(e) => { nav(Number(e.target.id)) }} className="page-link">2</span></li>
                            </ul>
                        </td>
                    </tr>
                </tfoot> */}
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
                {/* <ul className="pagination pagination-sm">
                        <li className={`page-item ${curpage === 1 ? 'active' : ''}`}><span id='1' onClick={(e) => { nav(Number(e.target.id)) }} className="page-link">1</span></li>
                        <li className={`page-item ${curpage === 2 ? 'active' : ''}`}><span id='2' onClick={(e) => { nav(Number(e.target.id)) }} className="page-link">2</span></li>
                    </ul> */}
            </section>
        </>
    )
}
