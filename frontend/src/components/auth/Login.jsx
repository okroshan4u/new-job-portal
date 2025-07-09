import React, { useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import store from '@/redux/store'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading } = useSelector(store => store.auth);



    const [input, setInput] = useState({
        email: " ",
        password: "",
        role: "",
    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate("/");
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false))
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [])
    return (
        <>
            <div>
                <Navbar />
                <div className='flex flex-col items-center '>
                    <form onSubmit={submitHandler} className='w-1/3 my-3 border-2 rounded-md p-5 '>
                        <h1 className='text-2xl font-bold'>Login</h1>
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
                        <div className='my-3 flex gap-2'>
                            <RadioGroup defaultValue="student" className='my-3 flex gap-2'>
                                <div className="flex items-center gap-3">
                                    <Input type='radio'
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        name="role" value="student" className="cursor-pointer" />
                                    <Label htmlFor="r1">Student</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Input type='radio' checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        name="role" value="recruiter" className="cursor-pointer" />
                                    <Label htmlFor="r2">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        {
                            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-4">Login</Button>
                        }

                        <span className='text-sm'>Already have an account <Link to={"/signup"} className="text-blue-600">Signup</Link></span>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
