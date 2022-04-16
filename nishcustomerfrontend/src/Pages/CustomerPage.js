import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import MainPanel from '../components/MainPanel';

import TableFooterPanel from '../components/TableFooterPanel';
import * as service from '../service/FetchCustomerService';
import React, { useEffect, useState } from 'react';
import '../style/CustomStyle.css';
import { Link } from 'react-router-dom';

function CustomerPage() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchPostList = async () => {
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
            <h1>Customer List</h1>
            <MainPanel param={customers} refreshTableParam={refreshTableData} />
            <br></br>{/* TODO: remove this br's and use css <br></br> */}
            <br></br> {/* TODO: remove this br's and use css <br></br> */}
            <br></br>{/* TODO: remove this br's and use css <br></br> */}
            <TableFooterPanel refreshTableParam={refreshTableData} />
            <br></br>{/* TODO: remove this br's and use css <br></br> */}
            <br></br>{/* TODO: remove this br's and use css <br></br> */}
            <br></br>{/* TODO: remove this br's and use css <br></br> */}
            <Link to='/file'>Click to see file list</Link>
        </div>

    );
}

export default CustomerPage;
