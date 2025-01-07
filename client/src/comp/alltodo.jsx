import { useReducer, useState ,useEffect} from "react"
import axios from 'axios'
import TODO from "./todo";
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import NewDialog from "./newDialog";
import { InputText } from 'primereact/inputtext';


const ALLTODOS = () => {
    const [obj, setObj] = useState("")
    const [todosData, settodosData] = useState([])
    const [helpp, sethelpp] = useState(false)

    useEffect(() => {
        getTodo()
    }, [obj])

 const getTodo = async () => {
try {
 const res = await axios.get('http://localhost:8090/api/todos')
    if (res.status === 200) {
        settodosData(res.data)
        }
  } catch (e) {
    settodosData([])
    }
     }
     const getFTodo = async () => {
        try {
            const uf = todosData.filter((e) => e.title.startsWith(obj))
            settodosData(uf)
        } catch (e) {
            settodosData([])
        }
    }   
return (
        <>
         <div className="p-inputgroup flex-1">
                <Button className="p-inputgroup-addon" onClick={
                    getFTodo
                }>
                    
                    <i className="pi pi-search"></i>
                </Button>
                <InputText placeholder="Search" onChange={(e) => {setObj(e.target.value)
                    
                }} />
            </div>



         <div className="flex flex-wrap justify-content-center gap-3 mb-4">
                <Button onClick={()=>{sethelpp(true)}} icon="pi pi-plus" rounded outlined aria-label="Filter" />
            </div>
            {helpp&&<NewDialog settodosData={settodosData} sethelpp={sethelpp}/>}
          {
                todosData.sort(function(a, b) {
                    return a.title.localeCompare(b.title);
                }).map((element) => {
        
              return  <TODO title={element.title} tags={element.tags} comp={element.completed} at={element.createdAt} id={element._id}  settodosData={settodosData}/>
           
            })

             }

        </>
    )
}

export default ALLTODOS