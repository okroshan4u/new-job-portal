import React, { useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Label } from '../ui/label'
import Input_ from 'postcss/lib/input'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user ,loading} = useSelector(store => store.auth)


    const [input, setInput] = useState({
        fullname: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFiletHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if(input.file){
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true,
            });
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
             toast.error(error.response?.data?.message || "Something went wrong");
        } finally{
             dispatch(setLoading(false))
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/")
        }
    },[])

    return (
        <>
            <div>
                <Navbar />
                <div className='flex flex-col items-center '>
                    <form onSubmit={submitHandler} className='w-1/3 my-3 border-2 rounded-md p-5 '>
                        <h1 className='text-2xl font-bold'>Sign Up</h1>
                        <div className='my-2'>
                            <Label>Full Name</Label>
                            <Input type="text"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeEventHandler}
                                placeholder="Enter your full name" className='w-full' />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input type="email"

                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}

                                placeholder="example@gmail.com" className='w-full' />
                        </div>
                        <div>
                            <Label>Password</Label>
                            <Input type="password"

                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}

                                placeholder="Enter your password" className='w-full' />
                        </div>
                        <div>
                            <Label>Phone No.</Label>
                            <Input type="text"

                                value={input.phoneNumber}
                                name="phoneNumber"
                                onChange={changeEventHandler}

                                placeholder="Enter your Phone Number" className='w-full' />
                        </div>
                        <div className='my-3 flex gap-2'>
                            <RadioGroup defaultValue="student" className='my-3 flex gap-2'>
                                <div className="flex items-center gap-3">
                                    <Input type='radio' name="role" value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer" />
                                    <Label htmlFor="r1">Student</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Input type='radio' name="role" value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer" />
                                    <Label htmlFor="r2">Recruiter</Label>
                                </div>
                            </RadioGroup>
                            <div className='flex items-center ml-10 gap-2'>
                                <Label>Profile</Label>
                                <Input accept="image/*" type="file"
                                    onChange={changeFiletHandler}
                                    className="cursor-pointer" />
                            </div>
                        </div>

                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 animate-spin'/>Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
                    }
                        
                        <span className='text-sm'>Already have an account <Link to={"/login"} className="text-blue-600">Login</Link></span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
