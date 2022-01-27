import React, { useState, useEffect } from 'react'
import { MetricCard, Card } from '../cards'
import { SpendFileDetails } from '../lists'
import Categories from '../tables/Categories'
import Suppliers from '../tables/Suppliers'
import HttpRequest from '../../utils/HttpRequest'
import SearchFieldDropdown from '../dropdown/SearchFieldDropdown'

export default function Assessment() {
    const [assesment, setAssessment] = useState({})
    const [assesmentDetails, setAssessmentDetails] = useState({})
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
    })

    useEffect(() => {
        ;(async () => {
            const httpRequest = new HttpRequest()
            const asm = JSON.parse(localStorage.getItem('assessment'))
            setAssessment(asm)
            setParams((params) => {
                return { ...params, opportunityID: asm.ID }
            })
            let resp = await httpRequest.getAssessmentDetails(asm.ID)
            let regn = await httpRequest.getAssessmentRegions(asm.ID)
            let supplierSpend = await httpRequest.getAssessmentSupplierSpend(
                asm.ID,
                'all',
                'all',
                'all',
                'all'
            )
            let catagorySpend = await httpRequest.getAssessmentCatagorySpend(
                asm.ID,
                '1',
                'all',
                'all',
                'all',
                'all'
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
    }) {
        const httpRequest = new HttpRequest()
        let supplierSpend = await httpRequest.getAssessmentSupplierSpend(
            opportunityID,
            scope,
            region,
            bunit,
            spend
        )
        let catagorySpend = await httpRequest.getAssessmentCatagorySpend(
            opportunityID,
            level,
            scope,
            region,
            bunit,
            spend
        )
        catagorySpend = calPer(catagorySpend.data)
        supplierSpend = calPer(supplierSpend.data)
        setCategories(catagorySpend)
        setSuppliers(supplierSpend)
    }
    function onLevelSelect(level) {
        setParams({ ...params, level: level })
        const copy = Object.assign({}, params)
        copy.level = level.split(' ')[2]
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
    }

    return (
        <div className="container-fluid">
            <div className="row" style={{ marginTop: '100px' }}>
                <div className="col-sm-10">
                    <p
                        className="bl"
                        style={{ color: '#354A5F', fontSize: '32px' }}
                    >
                        {' '}
                        {assesment.name}
                    </p>
                </div>
                <div className="col-sm-2">
                    <SpendFileDetails {...assesmentDetails} />
                </div>
            </div>

            <div className="row" style={{ marginTop: '3%' }}>
                <div className="col-6">
                    <MetricCard
                        amount={convert(assesmentDetails.totalSpend)}
                        text="Total Spend"
                        subtext={`${
                            String(assesmentDetails.percClassified).split(
                                '.'
                            )[0]
                        }% Classified`}
                        theme="blue4"
                    />
                </div>
                <div className="col-6">
                    <div style={{ float: 'right', width: '100%' }}>
                        <MetricCard
                            amount={convert(assesmentDetails.totalInScopeSpend)}
                            text="In Scope Spend"
                            subtext={`${
                                String(assesmentDetails.percInScopeSpend).split(
                                    '.'
                                )[0]
                            }% of Total Spend`}
                            theme="blue5"
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
                <div className="col-6">
                    <Card padding="pad--xsmall" size="card--xlarge">
                        <Categories
                            categories={categories}
                            levels={catLevels}
                            selectedLevel={params.level}
                            onLevelSelect={onLevelSelect}
                        />
                    </Card>
                </div>
                <div className="col-6">
                    <Card padding="pad--xsmall" size="card--xlarge">
                        <Suppliers
                            title="Top 20 Suppliers by Spend"
                            suppliers={suppliers}
                            maxrows={10}
                        />
                    </Card>
                </div>
            </div>

            {/* <div className='row' style={{ marginTop: '2%' }}>
        <div className='col'>
          <Card padding='pad--xsmall' size='card--xlarge'>
            <Categories categories = {categories} levels={catLevels} selectedLevel= {params.level} onLevelSelect = {onLevelSelect} />
          </Card>
        </div>
      </div>

      <div className='row' style={{ marginTop: '2%' }}>
        <div className='col'>
          <Card padding='pad--xsmall' size='card--xlarge'>
              <Suppliers title = 'Top 20 Suppliers by Spend' suppliers = {suppliers} maxrows = {10}/>
          </Card>
        </div>
      </div> */}
        </div>
    )
}
