import React, { useState, useEffect, useContext } from 'react'
import BreadCrumbContext from '../../BreadCrumbContext'
import CategoryScopeUpdateContext from '../../CategoryScopeUpdateContext'

import SortDescending from '../../img/icons/sort-descending.svg'
import SortAscending from '../../img/icons/sort-ascending.svg'
import EditIcon from '../../img/icons/fiori-edit.svg'
//import HttpRequest from '../../utils/HttpRequest';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import ProgressBar from '../progress/ProgressBar'
import { useHistory } from 'react-router-dom'
import './Tables.css'
import { ReactComponent as LEFTARROWICON } from '../../img/icons/left-arrow.svg'
import { ReactComponent as RIGHTARROWICON } from '../../img/icons/right-arrow.svg'
export default function SubCategories(props) {
    const { categoryScopeUpdate, setCategoryScopeUpdate } = useContext(
        CategoryScopeUpdateContext
    )
    // const { breadcrumb, setBreadCrumb } = useContext(BreadCrumbContext);
    // const history = useHistory();
    const [subCategories, setSubCategories] = useState([])
    const [sortTypeASC, setSortTypeASC] = useState(false)
    const [clickedColumn, setClickedColumn] = useState('totalSpend')
    const [curpage, setCurPage] = useState(1)
    const [maxpages, setmaxPages] = useState(1)
    const [maxrows, setmaxRows] = useState(10)

    useEffect(() => {
        setSubCategories(props.subCategories)
        setmaxPages(Math.ceil(props.subCategories.length / maxrows))
        ;(async () => {
            // const httpRequest = new HttpRequest();
            // let resp = await httpRequest.getAssessmentCatagorySpend();
            // setCategories(resp.data);
        })()
    }, [props.subCategories])

    const sort = (e) => {
        const ID = e.target.id
        subCategories.sort((a, b) => {
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
        setSubCategories(subCategories)
        setClickedColumn(ID)
        setSortTypeASC(!sortTypeASC)
    }

    function nav(ID) {
        setCurPage(ID)
    }
    function paginatedItems() {
        if (subCategories.length >= 0)
            return subCategories.slice(
                (curpage - 1) * maxrows,
                curpage * maxrows
            )
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
    const onEditClick = (event, category) => {
        event.stopPropagation()
        //setCategoryScopeUpdate(category);
        props.onEditClick(category)
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
                    Top 20 Sub-Categories by Spend
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
                                width: '30%',
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
                                width: '15%',
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
                        <th scope="col" style={{ width: '10px' }}></th>
                    </tr>
                </thead>
                <tbody style={{ height: '300px', maxHeight: '600px' }}>
                    {paginatedItems().map((elm, i) => {
                        return (
                            <tr
                                style={{
                                    cursor: 'pointer',
                                    maxHeight: '40px',
                                    background:
                                        JSON.stringify(categoryScopeUpdate) ===
                                        JSON.stringify(elm)
                                            ? '#EBF8FF'
                                            : 'transparent',
                                }}
                                key={i}
                                onClick={() => {
                                    props.onSubCategoryClick(elm)
                                }}
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
                                <td onClick={(e) => onEditClick(e, elm)}>
                                    {' '}
                                    <img
                                        src={EditIcon}
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                        }}
                                        alt="EditIcon"
                                    />{' '}
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
