import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom'
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
//   } from "@/components/ui/card"
function Learn() {
    const history = useNavigate();
    const [uname,setname]=useState('')

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          
            history('/');
        } else {
            axios.get('http://127.0.0.1:8000/home/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setname(response.data.userid)
                console.log(response.data.userid);
            })
            .catch(error => {
                console.error('Home:', error);
                
                if (error.response && error.response.status === 401) {
                    history('/'); 
                }
            });
        }
    }); 

    function logout() {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://127.0.0.1:8000/logout/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                localStorage.removeItem('token'); 
                history('/'); 
                console.log(response.data);
            })
            .catch(error => {
                console.error('Logout:', error);
            });
        } else {
            
            console.error('Token not available');
        }
    }
  return (
    <div>
       <div className="flex fixed top-4 right-6 gap-4">
            <Button onClick={logout} className='bg-lime-500 py-3 px-4  text-xl rounded border border-lime-500 hover:text-lime-500 hover:bg-slate-950 '>Logout</Button>
            <a href='/profile' className='bg-lime-500 py-1 px-4  text-xl border border-lime-500 hover:text-lime-500 hover:bg-slate-950 rounded'>Hi.. {uname}!</a>
        </div>
     <div>
        
     </div>

    </div>
  )
}

export default Learn
