import React, { useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useSelector } from 'react-redux'
import useGetCompanyById from '../hooks/useGetCompanyById'

const ComapnySetUp = () => {
    const params = useParams()
    useGetCompanyById(params.id);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
    const {singleCompany} = useSelector(store=> store.company)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (res?.data?.success) {
                toast.success(res.data.message);
                navigate("/admin/companies")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description|| "",
            website:singleCompany.website|| "",
            location: singleCompany.location||"",
            file: singleCompany.file|| null
        })
         console.log("companysetup component is working/loading")
    }, [singleCompany])



    return (
        <div>
            <Navbar />
            <div className='max-w-4xl flex items-center mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex gap-5 items-center p-8'>
                        <Button variant="outline" className='flex items-center gap-2' onClick={()=>navigate("/admin/companies")}>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'> Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Comapany Name</Label>
                            <Input type='text' name="name" value={input.name} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type='text' name="description" value={input.description} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input type='text' name="website" value={input.website} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type='text' name="location" value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input type='file' accept="image/*" onChange={changeFileHandler} />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-4">Update</Button>
                    }

                </form>
            </div>
        </div>
    )
}

export default ComapnySetUp
