import { useReducer, useState, useEffect } from "react"
import axios from 'axios'
import Users from "./users";
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import NewDialog from "./newDialog";
import NewDialogUsers from "./NewDialogUsers";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
const AllUsers = () => {
    const [usersfData, setusersfData] = useState([])
    const [usersData, setusersData] = useState([])
    const [helpp, sethelpp] = useState(false)
    const [obj, setObj] = useState("")

    useEffect(() => {
        getUsers()
    }, [obj])

    const getUsers = async () => {
        try {
            const res = await axios.get('http://localhost:8090/api/users')
            if (res.status === 200) {
                setusersData(res.data)
            }
        } catch (e) {
            setusersData([])
        }
    }
    const getFUsers = async () => {
        try {
            const uf = usersData.filter((e) => e.name.startsWith(obj))
            setusersData(uf)
        } catch (e) {
            setusersData([])
        }
    }
    return (
        <>
            <div className="p-inputgroup flex-1">
                <Button className="p-inputgroup-addon" onClick={
                    getFUsers
                }>
                    
                    <i className="pi pi-search"></i>
                </Button>
                <InputText placeholder="Search" onChange={(e) => {setObj(e.target.value)
                }} />
            </div>



            <div className="flex flex-wrap justify-content-center gap-3 mb-4">
                <Button onClick={() => { sethelpp(true) }} icon="pi pi-plus" rounded outlined aria-label="Filter" />
            </div>
            {helpp && <NewDialogUsers setusersData={setusersData} sethelpp={sethelpp} usersData={usersData} />}


            {usersData.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            }).map((element) => {

                return <Users name={element.name} email={element.email} phone={element.phone} address={element.address} at={element.createdAt} id={element._id} setusersData={setusersData} />

            })

            }

        </>
    )
}

export default AllUsers