import axios from 'axios'
import Auth from './Auth'

//const API = axios.create({
//    baseURL: process.env.URL,
//})

export default class HttpRequest {
    async loadCategoryScopeInfo({ opportunityID, categoryCode }) {
        const config = {
            headers: { Authorization: `Bearer ${Auth.getToken()}` },
        } //opportunityID,level,scope,region,bunit,spend
        const resp = await axios.get(
            `/category/scopeinfo?opportunityID=${opportunityID}&categoryCode=${categoryCode}`,
            config
        )
        return resp
    }
    async getSubCategorys(opportunityID, catCode) {
        const config = {
            headers: { Authorization: `Bearer ${Auth.getToken()}` },
        } //opportunityID,level,scope,region,bunit,spend
        const resp = await axios.get(
            `/category/subcategorys?opportunityID=${opportunityID}&categoryCode=${catCode}`,
            config
        )
        return resp
    }
    async getCategoryLevels(catCode, spendFileClassStandard) {
        const config = {
            headers: { Authorization: `Bearer ${Auth.getToken()}` },
        } //opportunityID,level,scope,region,bunit,spend
        const resp = await axios.get(
            `/category/levels?spendFileClassStandard=${spendFileClassStandard}&categoryCode=${catCode}`,
            config
        )
        return resp
    }
    async getCategoryKPIDetails(opportunityID, catCode) {
        const config = {
            headers: { Authorization: `Bearer ${Auth.getToken()}` },
        } //opportunityID,level,scope,region,bunit,spend
        const resp = await axios.get(
            `/category?opportunityID=${opportunityID}&categoryCode=${catCode}`,
            config
        )
        return resp
    }
    async getAssessmentSupplierSpend(
        opportunityID,
        scope,
        region,
        bunit,
        spend,
        catCode
    ) {
        const config = {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }
        const params = catCode
            ? `opportunityID=${opportunityID}&scope=${scope}&region=${region}&bunit=${bunit}&spend=${spend}&categoryCode=${catCode}`
            : `opportunityID=${opportunityID}&scope=${scope}&region=${region}&bunit=${bunit}&spend=${spend}`
        const resp = await axios.get(
            `/assessments/spend/supplier?${params}`,
            config
        )
        return resp
    }
    async getAssessmentCatagorySpend(
        opportunityID,
        level,
        scope,
        region,
        bunit,
        spend,
        catCode
    ) {
        const config = {
            headers: { Authorization: `Bearer ${Auth.getToken()}` },
        } //opportunityID,level,scope,region,bunit,spend
        const params = catCode
            ? `opportunityID=${opportunityID}&level=${level}&scope=${scope}&region=${region}&bunit=${bunit}&spend=${spend}&categoryCode=${catCode}`
            : `opportunityID=${opportunityID}&level=${level}&scope=${scope}&region=${region}&bunit=${bunit}&spend=${spend}`
        const resp = await axios.get(
            `/assessments/spend/catagory?${params}`,
            config
        )
        return resp
    }
    async getAssessmentRegions(ID) {
        const config = {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }
        const resp = await axios.get(`/assessments/regions/${ID}`, config)
        return resp
    }
    async getAssessmentDetails(ID) {
        const config = {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }
        const resp = await axios.get(`/assessments/${ID}`, config)
        return resp
    }
    async loadCustomers() {
        // const source = axios.CancelToken.source();
        // const resp = await axios.get(`/customers`,{ cancelToken: source.token});
        // source.cancel();
        const config = {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }
        const resp = await axios.get(`/customers`, config)
        return resp
    }
    async loadUsers() {
        const config = {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }
        const resp = await axios.get(`/users`, config)
        return resp
    }
    async createCustomer(cust) {
        const config = {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }
        const resp = await axios.post(`/customers`, cust, config)
        return resp
    }
    async updateCustomer(cust) {
        const config = {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }
        const resp = await axios.put(`/customers`, cust, config)
        return resp
    }
    async logIn(form) {
        const resp = await axios.post(`/login`, form)
        return resp
    }
    async register(form) {
        const resp = await axios.post(`/users`, form)
        return resp
    }
    async updateOA(form) {
        const config = {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }
        const resp = await axios.put(`/customers/oas`, form, config)
        return resp
    }
    async createOA(form) {
        const config = {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }
        const resp = await axios.post(`/customers/oas`, form, config)
        return resp
    }
    async getOA(id) {
        const config = {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }
        let resp = []
        resp = await axios.get(`/customers/oas/${id}`, config)
        return resp
    }
    //getCategories returns all top categories on OA page
    async getCategories() {
        const resp = await axios.get(`/categories`)
        return resp
    }
    //getSuppliers returns all top suppliers on OA page
    async getSuppliers() {
        const resp = await axios.get(`/suppliers`)
        return resp
    }
    //getUnits returns the values for All Units dropdown on OA page
    async getUnits() {
        const resp = await axios.get(`/units`)
        return resp
    }
    //getRegions returns the values for All Regions dropdown on OA page
    async getRegions() {
        const resp = await axios.get(`/regions`)
        return resp
    }
    //getSpends returns the values for All Spend dropdown on OA page
    async getSpends() {
        const resp = await axios.get(`/regions`)
        return resp
    }
    //getEligible returns the values for Sourcing Eligible dropdown on OA page
    async getEligible() {
        const resp = await axios.get(`/regions`)
        return resp
    }
    //getTotalSpends returns the total spend for an OA
    async getTotalSpends() {
        const resp = await axios.get(`/regions`)
        return resp
    }
    //updateUser updates the current user
    async updateUser(user) {
        const config = {
            headers: {
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        }
        const resp = await axios.put(`/users`, user, config)
        return resp
    }
    //resetRequest request to reset the password
    async resetRequest(email) {
        const resp = await axios.get(`/users/rest?email=${email}`)
        return resp
    }
    //resetPassword changes the current password
    async resetPassword(form) {
        const resp = await axios.put(`/users/rest`, form)
        return resp
    }
}
