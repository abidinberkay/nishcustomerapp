import '../App.css';
import FilePanel from '../components/FilePanel'
import * as service from '../service/FetchFileService';
import React, { useEffect, useState } from 'react';
import FileAddFooter from '../components/FileAddFooter';
import { Link } from 'react-router-dom';


function FilePage() {

    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFileList = async () => {
            const response = await service.getFileList();
            setFiles(response.data);
        };
        fetchFileList()
    }, []);

    const refreshTableData = () => {
        const fetchFileList = async () => {
            const response = await service.getFileList();
            setFiles(response.data);
        };
        fetchFileList()
    }

    return (
        <>
            <div className="App">
                <h1>File List</h1>

                <FilePanel param={files} refreshTableParam={refreshTableData} />
                <br></br>{/* TODO: remove this br's and use css <br></br> */}
                <br></br>{/* TODO: remove this br's and use css <br></br> */}
                <br></br>{/* TODO: remove this br's and use css <br></br> */}
                <FileAddFooter refreshTableParam={refreshTableData}></FileAddFooter>
                <br></br>{/* TODO: remove this br's and use css <br></br> */}
                <br></br>{/* TODO: remove this br's and use css <br></br> */}
                <br></br>{/* TODO: remove this br's and use css <br></br> */}
                <Link to='/'>Click to see customer list</Link>
            </div>



        </>


    )
}

export default FilePage