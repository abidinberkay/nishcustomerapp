import * as ReactBootStrap from 'react-bootstrap';
import * as service from '../service/FetchFileService';
import Button from 'react-bootstrap/Button'
import '../style/CustomStyle.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore, faFileEdit } from "@fortawesome/free-solid-svg-icons";

function FilePanel(props) {

  const [isEditPopupOpen, setEditPopup] = useState(false);
  const [fileInfo, setFileInfo] = useState({ id: '', userId: '', customerId: '', fileName: '', lastModifiedDate: '' })


  const deleteFileById = async (id) => {
    await service.deleteFileById(id);
    props.refreshTableParam();
  }

  const refreshTableData = () => {
    props.refreshTableParam();
  }

  return (
    <ReactBootStrap.Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Creator User Id</th>
          <th>Customer Id</th>
          <th>File Name</th>
          <th>Last Modified Date</th>
          <th>Edit</th>
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
              <td><Button className='editButton' ><FontAwesomeIcon icon={faFileEdit} /></Button></td>
                <td><Button className='deleteButton' onClick={() => deleteFileById(item.id)} ><FontAwesomeIcon icon={faTrashRestore} /></Button></td>
            </tr>
          ))}
      </tbody>
    </ReactBootStrap.Table>
  );
}

export default FilePanel;