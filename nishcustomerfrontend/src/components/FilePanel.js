import * as ReactBootStrap from 'react-bootstrap';
import * as service from '../service/FetchFileService';
import Button from 'react-bootstrap/Button'
import '../style/CustomStyle.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore, faFileEdit, faCloudDownload } from "@fortawesome/free-solid-svg-icons";
import FileEditPanel from './FileEditPanel';

function FilePanel(props) {

  const [isEditPopupOpen, setEditPopup] = useState(false);
  const [fileInfo, setFileInfo] = useState({ id: '', userId: '', customerId: '', fileName: '', lastModifiedDate: '' })


  const deleteFileById = async (id) => {
    await service.deleteFileById(id);
    props.refreshTableParam();
  }

  const downloadFile = async (fileId) => {
    window.open("http://localhost:8080/file/downloadFile/" + fileId);
  }

  const refreshTableData = () => {
    props.refreshTableParam();
  }

  const editCustomer = async (id, userId, customerId) => {
    setFileInfo({id: id, userId: userId, customerId: customerId})
    setEditPopup(true);
  }

  return (
    <>
    <ReactBootStrap.Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Creator User Id</th>
          <th>Customer Id</th>
          <th>File Name</th>
          <th>Last Modified Date</th>
          <th>Edit</th>
          <th>Download</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.param &&
          props.param.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.userId}</td>
              <td>{item.customerId}</td>
              <td>{item.fileName}</td>
              <td>{item.lastModifiedDate}</td>
              <td><Button className='editButton' onClick={() => editCustomer(item.id, item.userId, item.customerId)} ><FontAwesomeIcon icon={faFileEdit} /></Button></td>
              <td><Button className='deleteButton' onClick={() => downloadFile(item.id)} ><FontAwesomeIcon icon={faCloudDownload} /></Button></td>
              <td><Button className='deleteButton' onClick={() => deleteFileById(item.id)} ><FontAwesomeIcon icon={faTrashRestore} /></Button></td>
            </tr>
          ))}
      </tbody>
      
    </ReactBootStrap.Table>
    {
        isEditPopupOpen && <FileEditPanel fileInfo={fileInfo} refreshTableParam={refreshTableData}/>
    }
    </>
    
  )
}

export default FilePanel;