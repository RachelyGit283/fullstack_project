import React from 'react'; 
import axios from 'axios'
import { useState } from "react"
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Dialog from './dialog';
import { ToggleButton } from 'primereact/togglebutton';
import UpdateDialogPosts from './UpdateDialogPosts';
const Posts = (props) => {
    const [checked, setChecked] = useState(props.comp);
    const [updateVisible,setUpdateVisible]=useState(false)

 const deletePosts = async () => {
        const id = props.id
        try{
        const res = await axios.delete(`http://localhost:8090/api/posts/${id}`)
        props.setpostsData(res.data)}
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
            <Button onClick={deletePosts} style={{ backgroundColor: 'red' ,marginLeft: '0.5em' }}label="Cancel" severity="secondary" icon="pi pi-trash" />
        </>
    );
    return (
        <div className="card flex justify-content-center">
          
            <Card title={props.title} footer={footer}  header={header} className="md:w-25rem">
                <div className="m-0">
                {"title: "+props.title}
                <br/>
                {"body: "+props.body}
                </div>
            </Card>
      {updateVisible?<UpdateDialogPosts setpostsData={props.setpostsData} title={props.title} setChecked={setChecked} checked={checked} body={props.body} id={props.id} setUpdateVisible={setUpdateVisible}/>:<></>}
        </div>
    )
}
export default Posts