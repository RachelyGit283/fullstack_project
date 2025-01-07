import React from 'react'; 
import axios from 'axios'
import { useReducer, useState ,useEffect} from "react"
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Dialog from './dialog';
import { ToggleButton } from 'primereact/togglebutton';
import UpdateDialogUsers from './UpdateDialogUsers';
const Users = (props) => {
    const [checked, setChecked] = useState(props.comp);
    const [updateVisible,setUpdateVisible]=useState(false)
    //deleteTodo=deleteUsers
    //settodosData=setusersData
 const deleteUsers = async () => {
        const id = props.id
        try{
        const res = await axios.delete(`http://localhost:8090/api/users/${id}`)
        props.setusersData(res.data)}
        catch(a){
            console.log("server error",a);
        }
    }
    const header = (
        <div>{props.at}</div>
    );
   
    const footer = (
         <>      
            <Button onClick={()=>setUpdateVisible(true)} style={{ backgroundColor: 'blue',marginLeft: '0.5em' }} label="update" icon="pi pi-pencil"/>
            <Button onClick={deleteUsers} style={{ backgroundColor: 'red' ,marginLeft: '0.5em' }}label="Cancel" severity="secondary" icon="pi pi-trash" />
        </>
    );
    return (
        <div className="card flex justify-content-center">
          
            <Card title={props.name} footer={footer}  header={header} className="md:w-25rem">
                <div className="m-0">
                {"email: "+props.email}
                <br/>
                {" address: "+props.address}
                <br/>
                {" phone: "+props.phone}
                </div>
            </Card>
      {updateVisible?<UpdateDialogUsers setusersData={props.setusersData}name={props.name} setChecked={setChecked} checked={checked}  email={props.email} phone={props.phone} address={props.address}  id={props.id} setUpdateVisible={setUpdateVisible}/>:<></>}
        </div>
    )
}
export default Users