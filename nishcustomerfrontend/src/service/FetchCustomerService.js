import axios from 'axios';


export async function getCustomerById(id) {
    return axios.get("http://localhost:8080/customer", { params: { customerId: 1 } });
}

export async function getCustomerList(jwtTok) {

    // let tok = (await getJwtToken()).data.jwtToken;

    // let tok = localStorage.getItem("jwtToken");
    

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
    return axios.delete("http://localhost:8080/customer/" + id)
}

export async function editCustomer(id, name, surname) {
    return axios.put('http://localhost:8080/customer', {
        id,
        firstName: name,
        lastName: surname
    })
}

export async function addCustomer(name, surname) {
    return axios.post('http://localhost:8080/customer', {
        firstName: name,
        lastName: surname
    })
}
