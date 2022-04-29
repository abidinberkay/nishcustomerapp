import React from 'react'
import Button from 'react-bootstrap/Button';
import * as service from '../service/FetchFileService';
import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';

function FileAddFooter(props) {

    const [userId, setUserId] = useState('');
    const [customerId, setCustomerId] = useState('');


    var fileObject = {
        selectedFile: null
    }

    var isButtonDisabled = false;

    // (userId.length < 1 || customerId.length < 1 || file == null) ? isButtonDisabled = true : isButtonDisabled = false;

    const handleUpload = (event) => {
        fileObject.selectedFile = event.target.files[0];
    }


    const addNewFile = () => {
        service.addFile(userId, customerId, fileObject.selectedFile)
            .then((response) => {
                console.log(response.data.name + " is uploaded for user with userId " + response.data.userId);
                props.refreshTableParam();
            }).catch((error) => {
                console.log("Error on file upload")
            }
            );
    }

    return (
        <>
            <Card className='buttonFooter'>
                <Form className='buttonFooter'>
                    <input type="text" placeholder="userId" value={userId} onChange={e => setUserId(e.target.value)}></input>
                    <input type="text" placeholder="customerId" value={customerId} onChange={e => setCustomerId(e.target.value)}></input>
                    <input type="file" onChange={e => handleUpload(e)}></input>
                    <Button disabled={isButtonDisabled} onClick={() => addNewFile()} className='addButton'>Add</Button>
                </Form>
            </Card>

        </>
    );
}

export default FileAddFooter;