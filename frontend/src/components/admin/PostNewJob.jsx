import React, { useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOBS_API_END_POINT } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'




const PostNewJob = () => {

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        position: "",
        location: "",
        experience: "",
        jobType: "",
        companyId: ""
    });
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { companies } = useSelector(store => store.company);
    const companyArray = []

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (value) => {
        const selectedCompany = companies?.find((company) => company?.name?.toLowerCase() == value)
        setInput({ ...input, companyId: selectedCompany?._id })
     
    }

 
    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true)
            const res = await axios.post(`${JOBS_API_END_POINT}/post`,input,{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data.message)
                navigate("/admin/jobs")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }finally{
            setLoading(false)
        }

    }


    return (
        <div>
            <Navbar />
            <div className='max-w-5xl mx-auto  my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input placeholder="Enter the job title" type="text" name="title" value={input.title} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input placeholder="Enter the job description" type="text" name="description" value={input.description} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input placeholder="Enter the job requirements" type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>salary in LPA</Label>
                            <Input placeholder="20 LPA" type="Number" name="salary" value={input.salary} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>No. of Positions</Label>
                            <Input min="0" placeholder="Enter the job positions" type="number" name="position" value={input.position} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input placeholder="Enter the job location" type="text" name="location" value={input.location} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>Experience</Label>
                            <Input placeholder="Enter the job experience" type="number" name="experience" value={input.experience} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            <Label>JobType</Label>
                            <Input placeholder="Enter the job jobType" type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1" />
                        </div>
                        <div>
                            {
                                companies.length > 0 && (
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="select a compnay" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Companies</SelectLabel>
                                                {
                                                    companies.map((company) => {
                                                        return (
                                                            <SelectItem value={company?.name?.toLowerCase()} key={company._id} >{company.name}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )
                            }
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-4">Post New job</Button>
                    }
                    {
                        companies.length <= 0 && <p className='text-red-700  text-sm font-bold'> *Pleae create a company first before posting a job</p>
                    }
                </form>

            </div>
        </div>
    )
}

export default PostNewJob
