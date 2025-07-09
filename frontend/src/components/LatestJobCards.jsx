import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='shadow-xl p-4 border border-gray-100 bg-white cursor-pointer rounded-sm'>
            <div>
                <h1 className='text-md font-medium'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500 '>India</p>
            </div>
            <div>
                <h1 className='text-lg font-bold'>{job?.title}</h1>
                <p>{job?.description}</p>
            </div>

            
            <div className="badges flex gap-2 my-2 items-center">
                <Badge variant='outline' className="text-blue-700">{job?.positions} Openings</Badge>
                <Badge variant='outline' className="text-green-700">{job?.jobType}</Badge>
                <Badge variant='outline' className="text-red-700">{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards
