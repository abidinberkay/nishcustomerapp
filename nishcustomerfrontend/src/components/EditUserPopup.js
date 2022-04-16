import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import '../style/CustomStyle.css';
import * as service from '../service/FetchCustomerService';

function EditUserPopup(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const initialName = props.customerInfo.name;
    const initialSurname = props.customerInfo.surname;

    var isButtonDisabled = false;

    (firstName.length <= 3 || lastName.length <= 3) ? isButtonDisabled = true : isButtonDisabled = false;


    const editCustomer = async () => {
        await service.editCustomer(props.customerInfo.id, firstName, lastName);
        
        window.location.reload();
    }

    return (
        <>

            <Card className='editCustomerFooter'>
            <span className='currentValueSpan'>Edit User</span>
                <Form className='editCustomerFooter'>
                    <div>
                        <span className='currentValueSpan'>Current Values</span>
                        <input type="text" disabled readOnly placeholder={initialName} value={initialName}></input>
                        <input type="text" disabled readOnly placeholder={initialSurname} value={initialSurname}></input>
                    </div>
                    
                    <div className='currentValueSpan'>
                    <span >New Values</span>
                        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}></input>
                        <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}></input>
                    </div>
                    <label hidden={!isButtonDisabled} className='labelStyle'>Field lengths must be at least 4 character</label>
                    <Button disabled={isButtonDisabled} onClick={() => editCustomer(firstName, lastName)} className='addButton'>Edit</Button>

                </Form>
            </Card>



        </>

    )
}

export default EditUserPopup;