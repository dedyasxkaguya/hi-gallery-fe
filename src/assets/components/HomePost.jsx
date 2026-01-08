import React from 'react'

const HomePost = (data) => {
    const imageLink = data.data.image
    return (
        <div class="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden dark:bg-gray-800 flex flex-col justify-between blyat"
        style={{ backgroundImage:`url(${imageLink})` }}>
            <div className="">
                <img src={`http://127.0.0.1:8000/${data.data.image}`} alt="" className="aspect-square object-cover" />
                <div className="usernameBox p-2">blyaat</div>
                <div class="p-2 md:p-4">
                    <div className='flex items-center text-sm text-gray-600 dark:text-gray-300 gap-2'>
                        <span>
                            <i className='bi bi-heart me-2'></i>
                            {data.data.likeCount}
                        </span>
                        <span>
                            <i className='bi bi-chat me-2'></i>
                            {data.data.commentCount}
                        </span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 text-sm truncate">{data.data.title}</p>
                </div>
            </div>
            <span className='text-xs text-gray-600 dark:text-gray-300 m-2 md:m-4 mt-0'>{data.data.formattedTime}</span>
        </div>
    )
}

export default HomePost