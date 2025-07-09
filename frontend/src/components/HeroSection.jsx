import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchHandler = ()=>{
        dispatch(setSearchQuery(query))
        navigate("/browse")
    }

    return (
        <div className='text-center my-10'>
            <span className='px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'> No. 1 Job Hunt Website</span>
            <h1 className='text-5xl font-bold mt-5 mb-3'>Search , Apply & <br /> Get Your <span className='text-[#3853D5]'>Dream Job</span></h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis nam aliquam earum fuga ab eveniet soluta est. Dicta commodi</p>
            <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center mx-auto  gap-4 mt-5'>
                <input type="text" onChange={(e)=> setQuery(e.target.value)} placeholder='Find your dream job' className='outline-none border-none w-full' />

                <Button onClick={searchHandler} className='rounded-r-full bg-[#3853D5]'>
                    <Search />
                </Button>
            </div>
        </div>
    )
}

export default HeroSection
