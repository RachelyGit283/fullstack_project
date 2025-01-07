import React from 'react'; 
import axios from 'axios'
import { useReducer, useState ,useEffect} from "react"
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
// import Dialog from './dialog';
import { ToggleButton } from 'primereact/togglebutton';
import UpdateDialog from './dialog';
const TODO = (props) => {
    const [checked, setChecked] = useState(props.comp);
    const [updateVisible,setUpdateVisible]=useState(false)
 const deleteTodo = async () => {
        const id = props.id
        const res = await axios.delete(`http://localhost:8090/api/todos/${id}`)
        props.settodosData(res.data)
    }
    const header = (
        <div>{props.at}</div>
    );

    const updateTodo = async () => {
        const id = props.id
        const res = await axios.put(`http://localhost:8090/api/todos/comp/${id}`)     
        props.settodosData(res.data)
    }
   
    const footer = (
         <>      
            <div className="card flex justify-content-center">
         <ToggleButton invalid onIcon="pi pi-check" offIcon="pi pi-times"  offLabel="uncomp" onLabel="complited" style={{width:"50px"}}  checked={checked} onChange={(e) =>{setChecked(e.value);updateTodo()} } className="w-8rem" />
     </div>
            <Button onClick={()=>setUpdateVisible(true)} style={{ backgroundColor: 'blue',marginLeft: '0.5em' }} label="update" icon="pi pi-pencil"/>
            <Button onClick={deleteTodo} style={{ backgroundColor: 'red' ,marginLeft: '0.5em' }}label="Cancel" severity="secondary" icon="pi pi-trash" />
        </>
    );
   

    return (
        <div className="card flex justify-content-center">
          
            <Card title={props.title} footer={footer} header={header} className="md:w-25rem">
                <p className="m-0">
               { props.tags?.map((tag)=>tag+" ")}
                </p>
            </Card>


      {updateVisible?<UpdateDialog settodosData={props.settodosData}title={props.title} setChecked={setChecked} checked={checked}  comp={props.completed} id={props.id} setUpdateVisible={setUpdateVisible}/>:<></>}
        </div>
    )
}
export default TODO