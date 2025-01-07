import { useReducer, useState ,useEffect} from "react"
import axios from 'axios'
import Posts from "./posts";
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import NewDialogPosts from "./NewDialogPosts";
import { InputText } from 'primereact/inputtext';

const AllPosts = () => {
    const [postsData, setpostsData] = useState([])
    const [helpp, sethelpp] = useState(false)
    const [obj, setObj] = useState("")

    useEffect(() => {
        getPosts()
    }, [obj])

 const getPosts = async () => {
try {
 const res = await axios.get('http://localhost:8090/api/posts')
    if (res.status === 200) {
        setpostsData(res.data)
        }
  } catch (e) {
    setpostsData([])
    }
     }
     const getFPosts = async () => {
        try {
            const uf = postsData.filter((e) => e.title.startsWith(obj))
            setpostsData(uf)
        } catch (e) {
            setpostsData([])
        }
    }
return (
        <>
         <div className="p-inputgroup flex-1">
                <Button className="p-inputgroup-addon" onClick={
                    getFPosts
                }>
                    
                    <i className="pi pi-search"></i>
                </Button>
                <InputText placeholder="Search" onChange={(e) => {setObj(e.target.value)
                   
                }} />
            </div>
         <div className="flex flex-wrap justify-content-center gap-3 mb-4">
                <Button onClick={()=>{sethelpp(true)}} icon="pi pi-plus" rounded outlined aria-label="Filter" />
            </div>

            {helpp&&<NewDialogPosts setpostsData={setpostsData} sethelpp={sethelpp} postsData={postsData}/>}
          {
            
                postsData.sort(function(a, b) {
                        return a.title.localeCompare(b.title)
                    }).map((element) => {
              return  <Posts title ={element.title} body={element.body} at={element.createdAt} id={element._id}  setpostsData={setpostsData}/>
           
            })

             }

        </>
    )
}

export default AllPosts