
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ToggleButton } from 'primereact/togglebutton';
import { InputText } from "primereact/inputtext";
import axios from "axios";
const UpdateDialogPosts = (props) => {
    const [visible, setVisible] = useState(true);
    const[newPosts,setNewPosts]=useState({
        title:props.title,
        body:props.body
    })
    const update2Posts = async () => {
        const id = props.id
        try{
        const res = await axios.put(`http://localhost:8090/api/posts/${id}`,newPosts)     
        props.setpostsData(res.data)
    }
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
                        <label htmlFor="title" className="text-primary-50 font-semibold">
                        title
                        </label>
                        <InputText id="title" label="Title" value={newPosts.title} onChange={(e)=>setNewPosts({...newPosts,title:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                    </div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="body" className="text-primary-50 font-semibold">
                       body
                        </label>
                        <InputText id="body" label="Body" value={newPosts.body} onChange={(e)=>setNewPosts({...newPosts,body:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                    </div>
                    <div className="flex align-items-center gap-2">
                    <Button label="Update" onClick={update2Posts} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>
                </div>
                )}
            ></Dialog>
        </div>
    )
}
export default  UpdateDialogPosts
        