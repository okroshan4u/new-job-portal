import React, { useState } from 'react'
import Navbar from './Shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobsTable from './AppliedJobsTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetAllAppliedJobs from './hooks/useGetAllAppliedJobs'


const Profile = () => {
    const isResume = true;
    const [open , setOpen] = useState(false)
    const {user} = useSelector(store=>store.auth)
    useGetAllAppliedJobs();

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 '>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={()=> setOpen(true)} variant="outline"> <Pen /></Button>
                </div>
                <div className='ml-6'>
                    <div className='flex items-center gap-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Contact />
                        <span>+91 {user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='mt-4 ml-6'>
                    <h1>Skills</h1>
                    <div>
                        {
                            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className='mr-2'>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='mt-1 ml-6 flex flex-col'>
                    <Label>Resume</Label>
                    {
                        isResume ? <a target='_blank' href={user?.profile.resume}>{user?.profile.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-7xl mx-auto'>
                <h1>Applied Jobs</h1>
                <AppliedJobsTable/>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
