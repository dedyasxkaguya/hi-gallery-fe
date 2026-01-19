import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Post = () => {
    const [post, setPost] = useState()
    const { slug } = useParams()
    const [size, setObject] = useState('cover')
    const [aspect, setAspect] = useState('h-[64dvw] w-full md:h-[64dvh] md:w-[80dvh]')
    const [aspectComment, setAspectComment] = useState('min-h-[64dvw] md:min-h-[64dvh] max-h-[64dvw] md:max-h-[64dvh]')
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
        if (aspect == 'h-[64dvw] w-full md:h-[64dvh] md:w-[80dvh]') {
            setAspect('h-[64dvw] w-full md:h-[80dvh] md:w-[64dvh]')
            setAspectComment('min-h-[64dvw] md:min-h-[80dvh] max-h-[64dvw] md:max-h-[80dvh]')
            console.log(aspectComment)
        } else {
            setAspect('h-[64dvw] w-full md:h-[64dvh] md:w-[80dvh]')
            setAspectComment('min-h-[64dvw] md:min-h-[64dvh] max-h-[64dvw] md:max-h-[64dvh]')
            console.log(aspectComment)
        }
    }
    return (
        <>
            <Navbar />
            <div className="flex mt-16 flex-row min-h-dvh justify-center">
                <div className="">
                    {/* <img src={imageLink} alt="" className='object-contain image-post rounded-2xl min-w-[50dvw] mb-4 bg-black' /> */}
                    <div className={`w-[24dvh] ${aspect} flex justify-end items-end rounded-s-2xl mb-4 p-4 bg-black transition-all duration-500`}
                        style={{
                            backgroundImage: `url("${imageLink}")`,
                            backgroundSize: size,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}>
                        <div className="flex justify-between w-full">
                            <button type="button" className='w-8 h-8 text-black usernameBox rounded-full aspect-square backdrop-blur-sm hover:opacity-80 hidden md:block'
                                onClick={() => handleAspect()}>
                                <i className='bi bi-aspect-ratio'></i>
                            </button>
                            <button type="button" className='w-8 h-8 text-black usernameBox rounded-full aspect-square backdrop-blur-sm hover:opacity-80'
                                onClick={() => handleResize()}>
                                <i className='bi bi-arrows-angle-contract'></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 shadow-2xl p-2 pb-0 transition-all ps-4
                rounded-e-xl duration-500 flex flex-col justify-between max-w-[40dvw] ${aspectComment} overflow-scroll`} style={{ scrollbarWidth:'none' }}>
                    <section>
                        <div className='flex items-center md:text-base text-xs text-gray-600 dark:text-gray-300 gap-6 mb-1'>
                            <img src={`http://127.0.0.1:8000/${post?.user["profile-image"]}`} alt="" className='w-8 aspect-square object-cover inline rounded-full' />
                            <Link to={'/'} className='font-semibold cursor-pointer duration-500 hover:opacity-75'>
                                @{post?.user.username}
                            </Link>
                            <Link to={'/'} className='font-semibold cursor-pointer duration-500 hover:opacity-75 flex items-center gap-2'>
                                <i className='bi bi-circle-fill text-[8px]'></i>
                                <span className='text-blue-700'>Follow</span>
                            </Link>
                        </div>
                        <div className="mt-4">
                            <div className="flex gap-4 items-start">
                                <img src={`http://127.0.0.1:8000/${post?.user["profile-image"]}`} alt="" className='w-8 aspect-square object-cover inline me-2 rounded-full' />
                                <div className="">
                                    <Link to={'/'} className='font-semibold cursor-pointer duration-500 hover:opacity-75'>
                                        @{post?.user.username}
                                    </Link>
                                    <span className="text-gray-600 dark:text-gray-300 md:text-base text-xs "> {post?.caption}</span>
                                </div>
                            </div>
                            <div className="overflow-y-scroll" style={{ scrollbarWidth: 'none' }}>
                                {post?.comment?.map((c) => {
                                    return (
                                        <div className="flex items-center mt-2">
                                            <img src={`http://127.0.0.1:8000/${c?.user['profile-image']}`} alt="" className='w-8 aspect-square rounded-full me-2' />
                                            <div className='p-4'>
                                                <span className='font-semibold me-2'>@{c?.user?.username}</span>
                                                <span className='font-light'>{c?.comment}</span><br />
                                                <span className='text-xs font-extralight opacity-75'>{c.formattedTime}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                    <div className="flex gap-2 flex-col sticky bottom-0 left-0 z-10 bg-gray-900 py-2">
                        <div className="flex gap-2">
                            <span>
                                <i className='bi bi-heart me-2'></i>
                                {post?.likeCount}
                            </span>
                            <span>
                                <i className='bi bi-chat me-2'></i>
                                {post?.commentCount}
                            </span>
                        </div>
                        <div className="w-full flex justify-between px-4 p-2">
                            <input type="text" name="" id="" placeholder='Add a comment' className='outline-none w-full' />
                            <Link to={''}>Post</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-2xl p-2 ${aspect} transition-all min-h-fit
                rounded-2xl border duration-500`}>
                <div className='flex items-center md:text-base text-xs text-gray-600 dark:text-gray-300 gap-2 mb-1'>
                    <div className={`w-[24dvh] ${aspect} flex justify-end items-end rounded-2xl mb-4 p-4 bg-black transition-all duration-500`}
                        style={{
                            backgroundImage: `url("${imageLink}")`,
                            backgroundSize: size,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}>
                        <div className="flex justify-between w-full">
                            <button type="button" className='w-8 h-8 text-black usernameBox rounded-full aspect-square backdrop-blur-sm hover:opacity-80 hidden md:block'
                                onClick={() => handleAspect()}>
                                <i className='bi bi-aspect-ratio'></i>
                            </button>
                            <button type="button" className='w-8 h-8 text-black usernameBox rounded-full aspect-square backdrop-blur-sm hover:opacity-80'
                                onClick={() => handleResize()}>
                                <i className='bi bi-arrows-angle-contract'></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <span className='cursor-pointer duration-500 hover:opacity-75'>
                        <i className='bi bi-heart me-2'></i>
                        {post?.likeCount}
                    </span>
                    <span className='cursor-pointer duration-500 hover:opacity-75'>
                        <i className='bi bi-chat me-2'></i>
                        {post?.commentCount}
                    </span><br />
                </div>
                <img src={`http://127.0.0.1:8000/${post?.user["profile-image"]}`} alt="" className='w-4 aspect-square object-cover inline me-2 rounded-full' />
                <Link to={'/'} className='font-semibold cursor-pointer duration-500 hover:opacity-75'>
                    @{post?.user.username}
                </Link>
                <span className="text-gray-600 dark:text-gray-300 md:text-base text-xs font-light"> {post?.caption}</span>
            </div>

            {/* <div className="flex flex-col gap-2 max-h-dvh overflow-y-scroll pt-0" style={{ scrollbarWidth: 'none' }}>
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
                </div> */}
        </>
    )
}

export default Post