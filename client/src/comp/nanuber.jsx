import React from 'react';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import  { Suspense } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar'; 
const LazyTodo = React.lazy(()=>import('.//alltodo'))
const LazyUsers = React.lazy(()=>import('.//allusers'))
const LazyPosts = React.lazy(()=>import('.//allposts'))

const Menu = () => {
    const navigate = useNavigate();

    const items = [
        {  
            label: 'Todos',
            icon: 'pi pi-check',
            command: () => {
                navigate('/todos')
            }
        },
        {
            label: 'Users',
            icon: 'pi pi-user',
            command: () => {
                navigate('/users')
          
            }
        },
        {
            label: 'Posts',
            icon: 'pi pi-file-edit',
            command: () => {
                navigate('/posts')
          
            }
        },
     
    ];

    const start = <img alt="logo" onClick={()=>{navigate('/')}} src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

    return (
        <div className="card">
            <Menubar model={items} start={start}/>
       <Routes>
        <Route path='/todos' element={<Suspense fallback="loading..."><LazyTodo /></Suspense> } />
        <Route path='/users' element={<Suspense fallback="loading..."><LazyUsers /></Suspense> } />
        <Route path='/posts' element={<Suspense fallback="loading..."><LazyPosts /></Suspense> } />

      </Routes>
        </div>

    )
}
export default Menu