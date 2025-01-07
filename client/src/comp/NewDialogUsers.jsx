import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import axios from "axios";


const NewDialogUsers = (props) => {
    const [visible, setVisible] = useState(true);
    const[newUsers,setNewUsers]=useState({
        name:"name",
         username:"username",
          email:"email", 
          address:"address",
           phone:"phone"
    })
    const creatUsers = async () => {
      const x=  props.usersData.filter((e)=>newUsers.username==e.username)
        if(x.length>0){
            alert("duplicate userName")
        }
        
        else{
            try{
        const res = await axios.post(`http://localhost:8090/api/users`,newUsers)
        props.setusersData(res.data)
    }
    catch(a){
        console.log("server error",a);
    }
        setVisible(false)
        props.sethelpp(false)}
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
                            name*
                            </label>
                            <InputText id="name" label="Name"  onChange={(e)=>setNewUsers({...newUsers,name:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                            username*
                            </label>
                            <InputText id="username" label="Username"  onChange={(e)=>setNewUsers({...newUsers,username:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50" ></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="email" className="text-primary-50 font-semibold">
                           email
                            </label>
                            <InputText id="email" label="Email"  onChange={(e)=>setNewUsers({...newUsers,email:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="address" className="text-primary-50 font-semibold">
                            address
                            </label>
                            <InputText id="address" label="Address"  onChange={(e)=>setNewUsers({...newUsers,address:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="phone" className="text-primary-50 font-semibold">
                            phone
                            </label>
                            <InputText id="phone" label="Phone"  onChange={(e)=>setNewUsers({...newUsers,phone:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="Creat" onClick={creatUsers} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) =>{hide(e) 
                                setVisible(false)} } text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
export default  NewDialogUsers