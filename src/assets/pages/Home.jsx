import axios from 'axios'
import React, { useEffect, useState } from 'react'
import HomePost from '../components/HomePost'
import { Link } from 'react-router-dom'

const Home = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/posts')
            .then(data => {
                const fetched = data.data
                console.log(fetched)
                setPosts(fetched)
            })
    }, [])
    return (
        <>
            <div className="p-4 flex flex-col items-center">
                <div className="w-[90dvw] dark:bg-gray-800 p-4 mb-4 rounded-2xl">
                    <span className='font-semibold text-2xl text-white'>Welcome to HI-Gallery</span>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-2 gap-2 w-[90dvw]">
                    {posts.map((post) => {
                        const imageLink = `http://127.0.0.1:8000/${post?.image}`
                        return (
                            <div className="max-w-sm rounded-xl shadow-lg overflow-hidden flex flex-col justify-end">
                                <div className="bg-white dark:bg-gray-800 md:p-4 p-2 text-xs text-gray-600 dark:text-gray-300 block md:hidden">
                                    @{post?.user?.username}
                                </div>
                                <div className="h-[24dvh] md:h-[64dvh] flex items-end"
                                    style={{
                                        backgroundImage: `url("${imageLink}")`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}>
                                    <div className="usernameBox p-2 backdrop-blur-xs w-100 hidden md:block">@{post?.user?.username}</div>
                                </div>
                                <div className="">
                                    <div className="bg-white dark:bg-gray-800 md:p-4 p-2">
                                        <div className='flex items-center md:text-base text-xs text-gray-600 dark:text-gray-300 gap-2 mb-1'>
                                            <span>
                                                <i className='bi bi-heart me-2'></i>
                                                {post?.likeCount}
                                            </span>
                                            <span>
                                                <i className='bi bi-chat me-2'></i>
                                                {post?.commentCount}
                                            </span>
                                        </div>
                                        <Link to={`/post/${post.slug}`} className='text-gray-600 dark:text-gray-300 md:text-base text-xs truncate'>
                                            {post.title}
                                        </Link>
                                        <span className='text-[8px] text-gray-600 dark:text-gray-300'>{post.formattedTime}</span>
                                    </div>
                                </div>
                            </div>
                        )
                        // return (
                        //     <HomePost data={post}/>
                        // )
                    })}
                </div>
            </div>

        </>
    )
}

export default Home