import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa6"

const Banner = () => {
  return (
    <div className='px-4 py-32 bg-black mx-auto'>
        <div className='text-white text-center'>
            <h1 className='text-5xl lg:text-7xl leading-snug font-bold mb-5'>
                welcome to blog
            </h1>
            <p className='text-gray-100 lg:w-3/5 mx-auto mb-5 font-serif'>How do you write a blog paragraph?
Paragraphs should also be short and sweet. The shorter the paragraph, the more likely your readers are to keep going. The “rules” of paragraph structure have been bent a little since web-based publishing became the norm, but try to keep individual ide</p>
            <div>
                <Link to="/" className='font-medium hover:text-green-500 inline-flex items-center'>Learn more <FaArrowRight className='mt-2 ml-2'/></Link>
            </div>
        </div>
    </div>
  )
}

export default Banner