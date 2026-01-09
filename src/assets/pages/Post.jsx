import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Post = () => {
    const [post, setPost] = useState()
    const { slug } = useParams()
    const [size, setObject] = useState('cover')
    const [aspect, setAspect] = useState('md:h-[64dvh] md:w-[80dvh]')

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/post/${slug}`)
            .then(data => {
                const fetched = data.data
                setPost(fetched)
            })
    }, [])
    const imageLink = `http://127.0.0.1:8000/${post?.image}`
    const handleResize = () => {
        if (size == 'cover') {
            setObject('contain')
        } else {
            setObject('cover')
        }
    }
    const handleAspect = () => {
        if (aspect == 'md:h-[64dvh] md:w-[80dvh]') {
            setAspect('md:h-[80dvh] md:w-[64dvh]')
        } else {
            setAspect('md:h-[64dvh] md:w-[80dvh]')
        }
    }
    return (
        <>
            <div className="flex gap-8">

                <div className="">
                    {/* <img src={imageLink} alt="" className='object-contain image-post rounded-2xl min-w-[50dvw] mb-4 bg-black' /> */}
                    <div className={`w-[24dvh] ${aspect} flex justify-end items-end rounded-2xl mb-4 p-4 bg-black transition-all duration-500`}
                        style={{
                            backgroundImage: `url("${imageLink}")`,
                            backgroundSize: size,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}>
                        <div className="flex justify-between w-full">
                            <button type="button" className='w-8 h-8 text-black usernameBox rounded-full aspect-square backdrop-blur-sm hover:opacity-80'
                                onClick={() => handleAspect()}>
                                <i className='bi bi-aspect-ratio'></i>
                            </button>
                            <button type="button" className='w-8 h-8 text-black usernameBox rounded-full aspect-square backdrop-blur-sm hover:opacity-80'
                                onClick={() => handleResize()}>
                                <i className='bi bi-arrows-angle-contract'></i>
                            </button>
                        </div>
                    </div>
                    <div className={`bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-2xl p-2 ${aspect} transition-all
                rounded-2xl border border-white duration-500 max-h-fit`}>
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
                        <span>@{post?.user.username}</span><br />
                        <span className="text-gray-600 dark:text-gray-300 md:text-base text-xs">{post?.caption}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 max-h-dvh overflow-y-scroll p-2 pt-0" style={{ scrollbarWidth:'none' }}>
                    {post?.comment?.map((c) => {
                        return (
                            <div className='text-gray-600 dark:text-gray-300 p-2 rounded-xl min-w-[20dvw] shadow border border-gray-600 dark:border-gray-300'>
                                <span className='me-2 font-light text-base'>@{c?.user?.username}</span>
                                <span className='text-[8px] font-light'>{c?.formattedTime}</span><br />
                                <span>
                                    {c.comment}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Post