import React from 'react'
import Button from 'react-bootstrap/Button';
import * as service from '../service/FetchFileService';
import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';

function FileAddFooter() {

    const [userId, setUserId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [file, setFile] = useState('');


    var isButtonDisabled = false;

    (userId.length < 1 || customerId.length < 1 || file == null) ? isButtonDisabled = true : isButtonDisabled = false;

    const addNewFile = async (userId, customerId, file) => {
        await service.addFile(userId, customerId, file);
    }

    return (
        <>
            <Card className='buttonFooter'>
                <Form className='buttonFooter'>
                    <input type="text" placeholder="userId" value={userId} onChange={e => setUserId(e.target.value)}></input>
                    <input type="text" placeholder="customerId" value={customerId} onChange={e => setCustomerId(e.target.value)}></input>
                    <input type="file" value={file} onChange={e => setFile(e.target.value)}></input>
                    <Button disabled={isButtonDisabled} onClick={() => addNewFile(userId, customerId, file)} className='addButton'>Add</Button>
                </Form>
            </Card>

        </>
    );
}

export default FileAddFooter;