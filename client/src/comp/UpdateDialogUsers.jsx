
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ToggleButton } from 'primereact/togglebutton';
import { InputText } from "primereact/inputtext";
import axios from "axios";
const UpdateDialogUsers = (props) => {
    const [visible, setVisible] = useState(true);
    const[newUsers,setNewUsers]=useState({
        name:props.name,
        username:props.username,
         email:props.email, 
         address:props.address,
          phone:props.phone
    })
    const update2Users = async () => {
        const id = props.id
        try{
        const res = await axios.put(`http://localhost:8090/api/users/${id}`,newUsers)     
        props.setusersData(res.data)}
        catch(a){
            console.log("server error",a);
        }
        setVisible(false)
        props.setUpdateVisible(false)
    
    }
    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                modal
                onHide={() => {if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                       
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="name" className="text-primary-50 font-semibold">
                        name
                        </label>
                        <InputText id="name" label="Name" value={newUsers.name} onChange={(e)=>setNewUsers({...newUsers,name:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="email" className="text-primary-50 font-semibold">
                       email
                        </label>
                        <InputText id="email" label="Email" value={newUsers.email} onChange={(e)=>setNewUsers({...newUsers,email:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="address" className="text-primary-50 font-semibold">
                        address
                        </label>
                        <InputText id="address" label="Address" value={newUsers.address} onChange={(e)=>setNewUsers({...newUsers,address:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="phone" className="text-primary-50 font-semibold">
                        phone
                        </label>
                        <InputText id="phone" label="Phone" value={newUsers.phone} onChange={(e)=>setNewUsers({...newUsers,phone:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                    </div>
                    <div className="flex align-items-center gap-2">
                    <Button label="Update" onClick={update2Users} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>
                </div>
                )}
            ></Dialog>
        </div>
    )
}
export default  UpdateDialogUsers
        