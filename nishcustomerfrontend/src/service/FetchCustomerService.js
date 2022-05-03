import axios from 'axios';

export async function getCustomerList() {

    let jwtTok = localStorage.getItem("jwtToken");
    
    return (await axios({
        method: "get",
        url: "http://localhost:8080/customer/list",
        headers: {
            'Authorization': 'Bearer ' + jwtTok
        },
    }))
}

export async function getJwtToken() {

    let raw = {
        username: "qqqq",
        password: "qwer"
    };

    return axios.post("http://localhost:8080/authenticate", raw)
}

export async function deleteCustomerById(id) {
    return (await axios({
        method: "delete",
        url: "http://localhost:8080/customer/" + id,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
        },
    }))
}

export async function editCustomer(id, name, surname) {
    return (await axios({
        method: "put",
        url: "http://localhost:8080/customer",
        data: {id : id, firstName: name, lastName: surname},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
        },
    }))
}

export async function addCustomer(name, surname) {

    return (await axios({
        method: "post",
        url: "http://localhost:8080/customer",
        data: {firstName: name, lastName: surname},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
        },
    }))
}
