//לא מקבל את הטגס
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { MultiSelect } from 'primereact/multiselect';
import axios from "axios";
    const tag = [
        'houseworks',
        'appointments',
        'shopping',
        'homework',
        'working at the office'
    ];


const NewDialog = (props) => {
    const [visible, setVisible] = useState(true);
    const[newTodo,setNewTodo]=useState({
        title:"title",
        completed:false,
        tags:"tags"
    })
    const creatTodo = async () => {
       
        try{
        const res = await axios.post(`http://localhost:8090/api/todos`,newTodo)    
        props.settodosData(res.data)}
        catch(a){
            console.log("server error",a);
        }
        setVisible(false)
        props.sethelpp(false)
    }

    const [color, setcolor] = useState("gray");
    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                modal
                onHide={() => {if (!visible) return; setVisible(false); }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700))' }}>
                       
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                title*
                            </label>
                            <InputText id="username" label="Title"  onChange={(e)=>setNewTodo({...newTodo,title:e.target.value})} className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                        </div>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                tags
                            </label>
                            

                            <InputText id="password" label="Password"  onChange={(e)=>setNewTodo({...newTodo,tags:e.target.value.split(",")})} className="bg-white-alpha-20 border-none p-3 text-primary-50" ></InputText>
                        </div>

                        <div className="flex align-items-center gap-2">
                            <Button label="Creat" onClick={creatTodo} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            <Button label="Cancel" onClick={(e) => {hide(e)
                                setVisible(false)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        </div>
                    </div>
                )}
            ></Dialog>
        </div>
    )
}
export default  NewDialog