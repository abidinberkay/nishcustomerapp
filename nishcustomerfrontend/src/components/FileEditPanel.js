import React from 'react';
import * as service from '../service/FetchFileService';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import '../style/CustomStyle.css';

function FileEditPanel(props) {

    const [userId, setUserId] = useState('');
    const [customerId, setCustomerId] = useState('');

    const initialId = props.fileInfo.id;
    const initialUserId = props.fileInfo.userId;
    const initialCustomerId = props.fileInfo.customerId;

    var isButtonDisabled = false;
    // const [fileInfo, setFileInfo] = useState({ id: '', userId: '', customerId: '', fileName: '', lastModifiedDate: '' })
    // (firstName.length <= 3 || lastName.length <= 3) ? isButtonDisabled = true : isButtonDisabled = false;

    var fileObject = {
        selectedFile: null
    }


    // const editFile = async () => {
    //     await service.editFile(initialId, userId, customerId);
        
    //     window.location.reload();
    // }

    const editFile = async () => {
        service.editFile(initialId, userId, customerId, fileObject.selectedFile)
            .then((response) => {
                console.log("file edited");
                props.refreshTableParam();
            }).catch((error) => {
                console.log("Error on file upload")
            }
            );
    }


    const handleUpload = (event) => {
        fileObject.selectedFile = event.target.files[0];
    }

  return (
    
<>

<Card className='editCustomerFooter'>
<span className='currentValueSpan'>Edit User</span>
    <Form className='editCustomerFooter'>
        <div>
            <span className='currentValueSpan'>Current Values</span>
            <input type="text" disabled readOnly placeholder={initialId} value={initialId}></input>
            <input type="text" disabled readOnly placeholder={initialUserId} value={initialUserId}></input>
            <input type="text" disabled readOnly placeholder={initialCustomerId} value={initialCustomerId}></input>
        </div>
        
        <div className='currentValueSpan'>
        <span >New Values</span>
        <input type="text" disabled readOnly placeholder={initialId} value={initialId}></input>
            <input type="text" placeholder="User Id" value={userId} onChange={e => setUserId(e.target.value)}></input>
            <input type="text" placeholder="Customer Id" value={customerId} onChange={e => setCustomerId(e.target.value)}></input>
            <input type="file" onChange={e => handleUpload(e)}></input>
        </div>
        <br></br>
        <label hidden={!isButtonDisabled} className='labelStyle'>Field lengths must be at least 4 character</label>
        <Button disabled={isButtonDisabled} onClick={() => editFile(initialId ,userId, customerId)} className='addButton'>Edit</Button>

    </Form>
</Card>



</>


  )
}

export default FileEditPanel