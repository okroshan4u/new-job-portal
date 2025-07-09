import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate, useParams } from 'react-router-dom'



const Job = ({job}) => {

    const daysagoFunction = (mongodbTime)=>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(24*60*60*1000))
    }

    const navigate= useNavigate()
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p>{daysagoFunction(job?.createdAt) == 0 ? "Today": `${daysagoFunction(job?.createdAt)}`} days ago</p>
                <Button variant="outline" className="rounded-full" size="icon"> <Bookmark /> </Button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size='icon'>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo}/>
                    </Avatar>
                </Button>
                <div>
                    <h1>{job?.company?.name}</h1>
                    <p>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className="badges flex gap-2 my-2 items-center">
                <Badge variant='outline' className="text-blue-700">{job?.position} Openings</Badge>
                <Badge variant='outline' className="text-green-700">{job?.jobType}</Badge>
                <Badge variant='outline' className="text-red-700">{job?.salary}LPA</Badge>
            </div>
            <div className='flex gap-3'>
                <Button onClick={()=>navigate(`/description/${job?._id}`) } variant="outline">Details</Button>
                <Button className="bg-blue-700">Save for Later</Button>
            </div>
        </div>
    )
}

export default Job
