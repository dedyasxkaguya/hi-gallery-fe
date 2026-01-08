import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Post = () => {
    const [post, setPost] = useState()
    const { slug } = useParams()

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/post/${slug}`)
            .then(data => {
                const fetched = data.data
                console.log(fetched)
                setPost(fetched)
            })
    }, [])
    const imageLink = `http://127.0.0.1:8000/${post?.image}`
    return (
        <>
            <div className="w-dvw h-dvh flex justify-center items-center gap-4">
                <div className="rounded-2xl shadow-lg overflow-hidden flex flex-row justify-end max-w-[48dvw]">
                    <img src={imageLink} alt="" className='max-h-[80dvh]' />
                    {/* <div className="h-[24dvh] md:h-[64dvh] flex items-end"
                        style={{
                            backgroundImage: `url("${imageLink}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                        <div className="usernameBox p-2 backdrop-blur-xs w-100 hidden md:block">@{post?.user.username}</div>
                    </div> */}
                    <div className="bg-white dark:bg-gray-800 md:p-4 p-2 h-[80dvh] flex flex-col justify-between">
                        <div className="">
                            <div className="text-gray-600 dark:text-gray-300 shadow-2xl mb-2 pb-2">
                                <span>@{post?.user.username}</span><br />
                                <span className="text-gray-600 dark:text-gray-300 md:text-base text-xs">{post?.title}</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {post?.comment?.map((c) => {
                                    return (
                                        <div className='text-gray-600 dark:text-gray-300 p-2 shadow-2xl rounded-2xl border border-lime-500'>
                                            <span className='me-2 font-light text-sm'>@{c?.user?.username}</span>
                                            <span className='text-[8px] font-light'>{c?.formattedTime}</span><br />
                                            {c.comment}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="">
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
                            {/* <p className="text-gray-600 dark:text-gray-300 md:text-base text-xs">{post?.caption}</p> */}
                            <p className='text-[8px] text-gray-600 dark:text-gray-300 mb-2'>{post?.formattedTime}</p>
                            <div class="max-w-sm">
                                <input type="email" placeholder="Add a comment" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 outline-none transition-all dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-lime-800 dark:placeholder-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post