import axios from 'axios';


export async function getFileList() {
    return (await axios({
        method: "get",
        url: "http://localhost:8080/file/fileInfoList",
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
        },
    }))
}

export function downloadFile(id) {
    return (axios({
        method: "get",
        url: "http://localhost:8080/file/downloadFile/" + id,
        responseType: 'blob',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
        },
        
    }))
}

export async function deleteFileById(id) {

    return (await axios({
        method: "delete",
        url: "http://localhost:8080/file/" + id,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
        },
    }))
}

export function addFile(userId, customerId, file) {

    let bodyFormData = new FormData();
    bodyFormData.append("userId", userId); //integer
    bodyFormData.append("customerId", customerId); //integer
    bodyFormData.append("file", file); //file

    return axios({
        method: "post",
        url: "http://localhost:8080/file",
        data: bodyFormData,
        processData: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
        },
        enctype: "multipart/form-data",
        contentType: false,
        cache: false,
    })
}

export async function editFile(id, userId, customerId, file) {
    let bodyFormData = new FormData();
    bodyFormData.append("id", id); //integer
    bodyFormData.append("userId", userId); //integer
    bodyFormData.append("customerId", customerId); //integer
    bodyFormData.append("file", file); //file

    return axios({
        method: "put",
        url: "http://localhost:8080/file",
        data: bodyFormData,
        processData: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
        },
        enctype: "multipart/form-data",
        contentType: false,
        cache: false,
    })
}