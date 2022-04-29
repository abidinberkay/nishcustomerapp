import axios from 'axios';


export async function getFileList() {
    return axios.get("http://localhost:8080/file/fileInfoList");
}

export async function deleteFileById(id) {
    return axios.delete("http://localhost:8080/file/" + id)
}

export function addFile(userId, customerId, file) {

    let bodyFormData = new FormData();
    bodyFormData.append("userId", userId); //integer
    bodyFormData.append("customerId", customerId); //integer
    bodyFormData.append("file", file); //file

    return axios({
        method: "post",
        url: "http://localhost:8080/file",
        // params: {userId, customerId},
        data: bodyFormData,
        processData: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
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
        },
        enctype: "multipart/form-data",
        contentType: false,
        cache: false,
    })
    
    // return axios.put('http://localhost:8080/file', {
    //     id,
    //     userId: userId,
    //     customerId: customerId,
    //     multipartFile: file
    // })
}