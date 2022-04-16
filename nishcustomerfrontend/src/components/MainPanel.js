import * as ReactBootStrap from 'react-bootstrap';
import * as service from '../service/FetchCustomerService';
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import EditUserPopup from './EditUserPopup';
import { useState } from 'react';
import '../style/CustomStyle.css';


function MainPanel(props) {

  const [isEditPopupOpen, setEditPopup] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ id: '', name: '', surname: '' })


  const deleteCustomer = async (id) => {
    await service.deleteCustomerById(id);
    props.refreshTableParam();
  }

  const editCustomer = async (id, firstName, lastName) => {
    setCustomerInfo({id: id, name: firstName, surname: lastName})
    setEditPopup(true);
  }

  const refreshTableData = () => {
    props.refreshTableParam();
  }

  return (
    <>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.param &&
            props.param.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td><Button className='editButton' onClick={() => editCustomer(item.id, item.firstName, item.lastName)}><FontAwesomeIcon icon={faUserEdit} /></Button></td>
                <td><Button className='deleteButton' onClick={() => deleteCustomer(item.id)}><FontAwesomeIcon icon={faTrashRestore} /></Button></td>
              </tr>
            ))}
        </tbody>
      </ReactBootStrap.Table>
      {
        isEditPopupOpen && <EditUserPopup customerInfo={customerInfo} refreshTableParam={refreshTableData}/>
      }

    </>
  );
}

export default MainPanel;