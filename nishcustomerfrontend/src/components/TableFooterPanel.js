import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import * as service from '../service/FetchCustomerService';
import '../style/CustomStyle.css';

function TableFooterPanel(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const addNewCustomer = async (name, surname) => {
        await service.addCustomer(name, surname);
        props.refreshTableParam();
        setFirstName('');
        setLastName('');
    }

    var isButtonDisabled = false;

    (firstName.length <= 3 || lastName.length <= 3) ? isButtonDisabled = true : isButtonDisabled = false;

    return (

        <>
            <Card className='buttonFooter'>
                <Form className='buttonFooter'>
                    <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}></input>
                    <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}></input>
                    <label hidden={!isButtonDisabled} className='labelStyle'>Field lengths must be at least 4 character</label>
                    <Button disabled={isButtonDisabled} onClick={() => addNewCustomer(firstName, lastName)} className='addButton'>Add</Button>
                </Form>
            </Card>



        </>

    );

}
export default TableFooterPanel;