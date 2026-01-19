import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const Navbar = () => {
    const { id } = useParams()
    const [user, setUser] = useState(false)
    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:8000/api/user/${id}`)
                .then(data => {
                    const fetched = data.data
                    console.log(fetched)
                    setUser(fetched)
                })
        }
    }, [])
    const location = useLocation().pathname
    if (location.includes('post')) {
        return (
            <nav className='w-dvw fixed top-0 left-0 p-2 bg-lime-500 flex justify-between items-center'>
                <Link type='button' className='p-2 duration-500 hover:bg-lime-700 rounded-xl text-white' to={`/${id}`}>
                    <i className='bi bi-chevron-left me-2'></i>
                    Back
                </Link>
                {user && (
                    <>
                        <p className='me-4'>@{user?.username}</p>
                    </>
                )}
            </nav>
        )
    }
    return (
        <nav className='w-dvw fixed top-0 left-0 p-4 bg-lime-500 flex justify-between items-center'>
            <p className='cursor-pointer'>Dashboard</p>
            {user && (
                <>
                    <p className='me-4'>@{user?.username}</p>
                </>
            )}
            {
                !user && (
                    <div className='flex gap-4 px-4'>
                        <Link to={'/'}>Login</Link>
                        <Link to={'/'}>Register</Link>
                    </div>
                )
            }
        </nav>
    )
}

export default Navbar