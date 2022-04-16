import axios from 'axios';


export async function getFileList() {
    return axios.get("http://localhost:8080/file/fileInfoList");
}

export async function deleteFileById(id) {
    return axios.delete("http://localhost:8080/file/" + id)
}

export async function addFile(userId, customerId, file) {

    let bodyFormData = new FormData();
    bodyFormData.append("file", file); //file
    // bodyFormData.append("userId", userId); //integer
    // bodyFormData.append("customerId", customerId); //integer


    return await axios({
        method: "post",
        url: "http://localhost:8080/file",
        params: {userId, customerId},
        data: bodyFormData,
        processData: false,
        // content

        // headers: {
        //     'Content-Type': 'false',
        //     'Access-Control-Allow-Origin': '*',
        //     'processData' : 'false'

        // }

        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
            // Accept: "application/json"
        },
        enctype: "multipart/form-data",
        contentType: false,
        cache: false,
    })



    // return axios.post(url = 'http://localhost:8080/file',
    //     cache = false,
    //     processData = false, // Important!
    //     contentType = false,
    //     cache = false,
    //     enctype: "multipart/form-data",
    //     headers = {
    //         Accept: "application/json",
    //     },
    //     {
    //         userId: user,
    //         customerId: customer,
    //     })
}
