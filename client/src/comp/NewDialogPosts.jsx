import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import axios from "axios";


const NewDialogPosts = (props) => {
    const [visible, setVisible] = useState(true);
    const[newPosts,setNewPosts]=useState({
        title:"title",
         body:"body"
    })
    const creatPosts = async () => {
try{
        const res = await axios.post(`http://localhost:8090/api/posts`,newPosts)
        props.setpostsData(res.data)
    }
        catch(a){
            console.log("server error",a);
        }
        setVisible(false)
        props.sethelpp(false)
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
                            <InputText id="title" label="Name"  onChange={(e)=>setNewPosts({...newPosts,title:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="body" className="text-primary-50 font-semibold">
                            body
                            </label>
                            <InputText id="body" label="Username"  onChange={(e)=>setNewPosts({...newPosts,body:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50" ></InputText>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="Creat" onClick={creatPosts} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) =>{ hide(e)
                                setVisible(false)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
export default  NewDialogPosts