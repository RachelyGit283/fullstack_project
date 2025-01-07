
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ToggleButton } from 'primereact/togglebutton';
import { InputText } from "primereact/inputtext";
import axios from "axios";
const UpdateDialog = (props) => {
    const [visible, setVisible] = useState(true);
    const[newTodo,setNewTodo]=useState({
        title:props.title,
        completed:props.comp,    
        tags:props.tags
    })
    const update2Todo = async () => {
        const id = props.id
        try{
        const res = await axios.put(`http://localhost:8090/api/todos/${id}`,newTodo)     
        props.settodosData(res.data)}
        catch(a){
            console.log("server error",a);
        }
        setVisible(false)
        props.setUpdateVisible(false)
    }
    const updateTodo = async () => {
        setNewTodo({...newTodo,completed:true})     
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
                            <InputText id="title" label="Title" value={newTodo.title} onChange={(e)=>setNewTodo({...newTodo,title:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="tags" className="text-primary-50 font-semibold">
                                tags
                            </label>
                            <InputText id="tags" label="Tags" value={newTodo.tags}onChange={(e)=>setNewTodo({...newTodo,tags:e.target.value.split(",")})} className="bg-white-alpha-20 border-none p-3 text-primary-50" ></InputText>
                            
                        </div>
                        <div className="card flex justify-content-center">
         <ToggleButton invalid onIcon="pi pi-check"  offLabel="uncomp" onLabel="complited" offIcon="pi pi-times"  checked={props.checked} onChange={(e) =>{props.setChecked(e.value);updateTodo()} } className="w-8rem" />
     </div>

                        <div className="flex align-items-center gap-2">
                            <Button label="Update" onClick={update2Todo} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
export default  UpdateDialog
        