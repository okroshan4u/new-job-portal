import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { LogOut, User2 } from 'lucide-react'
import React from 'react'
import { Link, Links, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'





const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }


    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div className="logo">
                    <h1 className='text-2xl font-bold'>JobHunt</h1>
                </div>
                <div className="nav-link flex gap-5">
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role == "recruiter" ? (
                                <>
                                    <li> <Link to={"/admin/companies"}>Companies</Link> </li>
                                    <li><Link to={"/admin/jobs"}>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li> <Link to={"/"}>Home</Link> </li>
                                    <li><Link to={"/jobs"}>Jobs</Link></li>
                                    <li><Link to={"/browse"}>Browse</Link></li>
                                </>
                            )
                        }

                    </ul>
                    {
                        !user ? (
                            <div className='flex gap-5'>
                                <Link to={"/login"}><Button variant="outline">Login</Button></Link>
                                <Link to={"/signup"}><Button className='bg-[#3853d5] hover:bg-[#3852d5c5]' >Signup</Button></Link>


                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={user?.profile?.profileImage} alt='@shadcn' className="w-10 h-10 rounded-full object-cover" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className=' flex flex-col gap-5 shadow-lg p-5'>
                                    <div className='flex gap-5 mt-2 items-center'>
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage src={user?.profile?.profileImage} alt='@shadcn' className="w-10 h-10 rounded-full object-cover cursor-pointer" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h2>{user?.fullname}</h2>
                                            <p className='text-sm text-muted-foreground'>{user?.profile.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        {
                                            user && user.role == "student" && (
                                                <div className='flex gap-5 items-center cursor-pointer'>
                                                    <User2 />
                                                    <h2><Link to={"/profile"}>View Profile</Link> </h2>
                                                </div>
                                            )

                                        }

                                        <div className='flex gap-5 items-center cursor-pointer'>
                                            <LogOut />
                                            <h2 onClick={handleLogout} variant="Link"><Link>Logout</Link> </h2>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar
