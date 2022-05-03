import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import UserPanel from '../components/UserPanel';

import UserAddPanel from '../components/UserAddPanel';
import * as service from '../service/FetchCustomerService';
import React, { useEffect, useState } from 'react';
import '../style/CustomStyle.css';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function CustomerPage() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {

        const fetchPostList = async () => {
            let jwtTok = await (await service.getJwtToken()).data.jwtToken;
            localStorage.setItem("jwtToken", jwtTok);
            const response = await service.getCustomerList();
            setCustomers(response.data);
        };
        fetchPostList()
    }, []);

    const refreshTableData = () => {
        const fetchPostList = async () => {
            const response = await service.getCustomerList();
            setCustomers(response.data);
        };
        fetchPostList()
    }
    return (

        <div className='App'>
            <Card className='card-section'>
                <h1>Customer List</h1>
            </Card>
            <Card className='card-section'>
                <UserPanel param={customers} refreshTableParam={refreshTableData} />
            </Card>
            <Card className='card-section'>
                <UserAddPanel refreshTableParam={refreshTableData} />
            </Card>
            <Card className='card-section'>
                <Link to='/file'>Click to see file list</Link>
            </Card>
        </div>

    );
}

export default CustomerPage;
