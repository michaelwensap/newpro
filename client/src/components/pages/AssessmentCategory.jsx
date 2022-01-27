import React, { useState, useEffect, useContext } from 'react'
import BreadCrumbContext from '../../BreadCrumbContext'
import CategoryScopeUpdateContext from '../../CategoryScopeUpdateContext'
import EditIcon from '../../img/icons/fiori-edit.svg'
import { MetricCard, Card } from '../cards'
import { SpendFileDetails } from '../lists'
import Suppliers from '../tables/Suppliers'
import SearchFieldDropdown from '../dropdown/SearchFieldDropdown'
import HttpRequest from '../../utils/HttpRequest'
import CategoryLevelDropdown from '../dropdown/CategoryLevelDropdown'
import { SubCategories } from '../tables'

export default function AssessmentCategory() {
    const { breadcrumb, setBreadCrumb } = useContext(BreadCrumbContext)
    const { categoryScopeUpdate, setCategoryScopeUpdate } = useContext(
        CategoryScopeUpdateContext
    )
    const [category, setCategory] = useState({})
    const [categoryKPIDetails, setCategoryKPIDetails] = useState({})
    const [assesment, setAssessment] = useState({})
    const [assesmentDetails, setAssessmentDetails] = useState({})
    const [levels, setLevels] = useState([])
    const [selectedLevel, setSelectedLevel] = useState({
        categoryCode: '',
        categoryDesc: '',
        categoryLevel: '',
    })
    const [subCategories, setSubCategories] = useState([])
    const [bunit, setbunit] = useState([])
    const [regions, setRegions] = useState([])
    const [scopes, setScopes] = useState([])
    const [spends, setSpends] = useState([])
    const [catLevels, setCatLevels] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [categories, setCategories] = useState([])

    const [params, setParams] = useState({
        opportunityID: '',
        level: 'Category Level 1',
        scope: 'All Scope',
        region: 'All Regions',
        bunit: 'All Business Units',
        spend: 'All Spend',
        categoryCode: '',
    })

    useEffect(() => {
        ;(async () => {
            const httpRequest = new HttpRequest()
            const cate = JSON.parse(localStorage.getItem('category'))
            setCategory(cate)
            const asm = JSON.parse(localStorage.getItem('assessment'))
            setAssessment(asm)
            setParams((params) => {
                return {
                    ...params,
                    opportunityID: asm.ID,
                    categoryCode: cate.categoryCode,
                }
            })
            let resps = await httpRequest.getCategoryKPIDetails(
                asm.ID,
                cate.categoryCode
            )
            setCategoryKPIDetails(resps.data)
            let respLevels = await httpRequest.getCategoryLevels(
                cate.categoryCode,
                asm.spendFileClassStandard
            )
            setLevels(respLevels.data)
            setSelectedLevel(respLevels.data[respLevels.data.length - 1])
            // let subs = await httpRequest.getSubCategorys(asm.ID, cate.categoryCode);
            // setSubCategories(calPer(subs.data));
            let resp = await httpRequest.getAssessmentDetails(asm.ID)
            let regn = await httpRequest.getAssessmentRegions(asm.ID)
            let supplierSpend = await httpRequest.getAssessmentSupplierSpend(
                asm.ID,
                'all',
                'all',
                'all',
                'all',
                cate.categoryCode
            )
            let catagorySpend = await httpRequest.getAssessmentCatagorySpend(
                asm.ID,
                '1',
                'all',
                'all',
                'all',
                'all',
                cate.categoryCode
            )
            catagorySpend = calPer(catagorySpend.data)
            supplierSpend = calPer(supplierSpend.data)
            setCategories(catagorySpend)
            setSuppliers(supplierSpend)
            setAssessmentDetails(resp.data)
            setRegions(
                [{ key: 'All Regions', value: 'All Regions' }].concat(
                    regn.data.regions
                )
            )
            setbunit(
                [
                    { key: 'All Business Units', value: 'All Business Units' },
                ].concat(regn.data.businessUnit)
            )
            setCatLevels(regn.data.catagory)
            setScopes([
                { key: 'All Scope', value: 'All Scope' },
                { key: 'In Scope', value: 'In Scope' },
                { key: 'Out Of Scope', value: 'Out Of Scope' },
            ])
            setSpends([
                { key: 'All Spend', value: 'All Spend' },
                { key: 'Direct', value: 'Direct' },
                { key: 'Indirect', value: 'Indirect' },
            ])
        })()
    }, [assesment.name])
    function calPer(ary) {
        if (ary.length > 0) {
            let total = ary[0].totalSpend
            let resp = ary.map((itm) => {
                itm.ajustedTotalSpendPerc =
                    (Number(itm.totalSpend) / Number(total)) * 100
                return itm
            })
            return resp
        }
        return ary
    }

    async function search({
        opportunityID,
        level,
        scope,
        region,
        bunit,
        spend,
        categoryCode,
    }) {
        const httpRequest = new HttpRequest()
        let supplierSpend = await httpRequest.getAssessmentSupplierSpend(
            opportunityID,
            scope,
            region,
            bunit,
            spend,
            categoryCode
        )
        let catagorySpend = await httpRequest.getAssessmentCatagorySpend(
            opportunityID,
            level,
            scope,
            region,
            bunit,
            spend,
            categoryCode
        )
        catagorySpend = calPer(catagorySpend.data)
        supplierSpend = calPer(supplierSpend.data)
        setCategories(catagorySpend)
        setSuppliers(supplierSpend)
    }
    function onLevelSelect(level) {
        setParams({ ...params, level: level })
        const copy = Object.assign({}, params)
        copy.level = level
        search(copy)
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
    async function onCategorySelect(item) {
        const httpRequest = new HttpRequest()
        let newbreadcrumb = [...breadcrumb]
        newbreadcrumb.pop()
        newbreadcrumb.push({ title: item.categoryDesc, path: '/assesment' })
        setBreadCrumb(newbreadcrumb)
        let resps = await httpRequest.getCategoryKPIDetails(
            assesment.ID,
            item.categoryCode
        )
        setCategoryKPIDetails(resps.data)
        let respLevels = await httpRequest.getCategoryLevels(
            item.categoryCode,
            assesment.spendFileClassStandard
        )
        setLevels(respLevels.data)
        setSelectedLevel(respLevels.data[respLevels.data.length - 1])
        // let subs = await httpRequest.getSubCategorys(assesment.ID, item.categoryCode);
        // setSubCategories(subs.data);
        // let catagorySpend = await httpRequest.getAssessmentCatagorySpend(assesment.ID,'Category Level 1','all','all','all',item.categoryCode);
        // setCategories(calPer(catagorySpend.data));
        // let supplierSpend = await httpRequest.getAssessmentSupplierSpend(assesment.ID,'all','all','all','all',item.categoryCode);
        // setSuppliers(calPer(supplierSpend.data));
        setCategory(item)
        localStorage.setItem('category', JSON.stringify(item))
        setParams((params) => {
            return { ...params, categoryCode: item.categoryCode }
        })
        const copy = Object.assign({}, params)
        copy.categoryCode = item.categoryCode
        copy.level = item.categoryLevel
        search(copy)
    }
    async function onSubCategoryClick(item) {
        const httpRequest = new HttpRequest()
        let newbreadcrumb = [...breadcrumb]
        newbreadcrumb.pop()
        newbreadcrumb.push({ title: item.categoryName, path: '/assesment' })
        setBreadCrumb(newbreadcrumb)
        let resps = await httpRequest.getCategoryKPIDetails(
            assesment.ID,
            item.categoryCode
        )
        setCategoryKPIDetails(resps.data)
        let respLevels = await httpRequest.getCategoryLevels(
            item.categoryCode,
            assesment.spendFileClassStandard
        )
        setLevels(respLevels.data)
        setSelectedLevel(respLevels.data[respLevels.data.length - 1])
        setCategory(item)
        localStorage.setItem('category', JSON.stringify(item))
        setParams((params) => {
            return { ...params, categoryCode: item.categoryCode }
        })
        // let catagorySpend = await httpRequest.getAssessmentCatagorySpend(assesment.ID,'Category Level 1','all','all','all',item.categoryCode);
        // setCategories(calPer(catagorySpend.data));
        // let supplierSpend = await httpRequest.getAssessmentSupplierSpend(assesment.ID,'all','all','all','all',item.categoryCode);
        // setSuppliers(calPer(supplierSpend.data));
        const copy = Object.assign({}, params)
        copy.categoryCode = item.categoryCode
        copy.level = copy.level.split(' ')[2]
        search(copy)
    }
    function onEditClick(item) {
        if (item) {
            item['opportunityID'] = params.opportunityID
            setCategoryScopeUpdate(item)
        } else {
            category['opportunityID'] = params.opportunityID
            setCategoryScopeUpdate(category)
        }
    }
    return (
        <div className="container-fluid">
            <div className="row" style={{ marginTop: '97px' }}>
                <div className="col-12">
                    <CategoryLevelDropdown
                        selected={selectedLevel}
                        list={levels}
                        onSelect={onCategorySelect}
                    />
                </div>
            </div>
            <div className="row" style={{ marginTop: '10px' }}>
                <div className="col-sm-10">
                    <div
                        className="bl"
                        style={{
                            display: 'inline-block',
                            color: '#354A5F',
                            fontSize: '32px',
                        }}
                    >
                        {' '}
                        {selectedLevel.categoryDesc}
                    </div>
                    <div
                        className="ball"
                        style={{
                            marginLeft: '10px',
                            position: 'absolute',
                            display:
                                JSON.stringify(categoryScopeUpdate) ===
                                JSON.stringify(category)
                                    ? 'inline-block'
                                    : 'none',
                        }}
                    >
                        {' '}
                        <img
                            src={EditIcon}
                            style={{
                                width: '20px',
                                height: '20px',
                                margin: '10px',
                            }}
                            alt="EditIcon"
                        />{' '}
                    </div>
                    <div
                        onClick={(e) => onEditClick()}
                        style={{
                            cursor: 'pointer',
                            marginLeft: '10px',
                            position: 'absolute',
                            display:
                                JSON.stringify(categoryScopeUpdate) !==
                                JSON.stringify(category)
                                    ? 'inline-block'
                                    : 'none',
                        }}
                    >
                        {' '}
                        <img
                            src={EditIcon}
                            style={{
                                width: '20px',
                                height: '20px',
                                margin: '10px',
                            }}
                            alt="EditIcon"
                        />{' '}
                    </div>
                </div>
                <div className="col-sm-2">
                    <SpendFileDetails {...assesmentDetails} />
                </div>
            </div>

            <div className="row" style={{ marginTop: '3%' }}>
                <div className="col-4">
                    <MetricCard
                        amount={convert(categoryKPIDetails.totalCategorySpend)}
                        text="Total Category Spend"
                        subtext={`${categoryKPIDetails.percInScope}% In Scope Spend`}
                        theme="blue3"
                    />
                </div>
                <div className="col-4">
                    <MetricCard
                        amount={new Intl.NumberFormat('en-US', {
                            maximumFractionDigits: 0,
                        }).format(categoryKPIDetails.totalCategoryInvoice)}
                        text="Invoices"
                        subtext={`${new Intl.NumberFormat('en-US', {
                            maximumFractionDigits: 0,
                        }).format(
                            categoryKPIDetails.avgInvoiceSupplier
                        )} Average Invoices per Supplier`}
                        theme="blue5"
                    />
                </div>
                <div className="col-4">
                    <div style={{ float: 'right', width: '100%' }}>
                        <MetricCard
                            amount={new Intl.NumberFormat('en-US', {
                                maximumFractionDigits: 0,
                            }).format(
                                categoryKPIDetails.totalCategorySuppliers
                            )}
                            text="Suppliers"
                            subtext={`${new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                maximumFractionDigits: 0,
                            }).format(
                                categoryKPIDetails.avgSpendSupplier
                            )} Average Spend per Supplier`}
                            theme="blue7"
                        />
                    </div>
                </div>
            </div>

            <div className="row" style={{ marginTop: '2%' }}>
                <div className="col-12">
                    <div style={{ float: 'right' }}>
                        <div
                            className="selections-wrap"
                            style={{ float: 'right' }}
                        >
                            <div style={{ display: 'inline-block' }}>
                                <SearchFieldDropdown
                                    list={scopes}
                                    selected={params.scope}
                                    onSelect={(value) => {
                                        setParams({ ...params, scope: value })
                                        const copy = Object.assign({}, params)
                                        copy.scope = value
                                        copy.level = params.level.split(' ')[2]
                                        search(copy)
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'inline-block',
                                    paddingLeft: '10px',
                                }}
                            >
                                <SearchFieldDropdown
                                    list={spends}
                                    selected={params.spend}
                                    onSelect={(value) => {
                                        setParams({ ...params, spend: value })
                                        const copy = Object.assign({}, params)
                                        copy.spend = value
                                        copy.level = params.level.split(' ')[2]
                                        search(copy)
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'inline-block',
                                    paddingLeft: '10px',
                                }}
                            >
                                <SearchFieldDropdown
                                    list={regions}
                                    selected={params.region}
                                    onSelect={(value) => {
                                        setParams({ ...params, region: value })
                                        const copy = Object.assign({}, params)
                                        copy.region = value
                                        copy.level = params.level.split(' ')[2]
                                        search(copy)
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: 'inline-block',
                                    paddingLeft: '10px',
                                }}
                            >
                                <SearchFieldDropdown
                                    list={bunit}
                                    selected={params.bunit}
                                    onSelect={(value) => {
                                        setParams({ ...params, bunit: value })
                                        const copy = Object.assign({}, params)
                                        copy.bunit = value
                                        copy.level = params.level.split(' ')[2]
                                        search(copy)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row" style={{ marginTop: '2%' }}>
                <div className="col-sm-6">
                    <Card padding="pad--xsmall" size="card--xlarge">
                        <SubCategories
                            subCategories={categories}
                            onSubCategoryClick={onSubCategoryClick}
                            onEditClick={onEditClick}
                        />
                    </Card>
                </div>
                <div className="col-sm-6">
                    <Card padding="pad--xsmall" size="card--xlarge">
                        <Suppliers
                            title="Top 100 Suppliers by Spend"
                            suppliers={suppliers}
                            maxrows={10}
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}
