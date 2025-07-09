import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import axios from 'axios'
import { DialogDescription } from '@radix-ui/react-dialog'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || "",

    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const ChangefileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNum", input.phoneNum);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
        setOpen(false)
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px] " onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                        <DialogDescription>
                            Update your profile information below.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid grid-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4 py-4'>
                                <Label htmlFor='name'>Name</Label>
                                <input type="text" id='name' name='name' value={input.fullname} onChange={changeEventHandler} className='col-span-3 border ' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4 py-4'>
                                <Label htmlFor='email'>Email</Label>
                                <input type="text" id='email' name='email' value={input.email} onChange={changeEventHandler} className='col-span-3 border' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4 py-4'>
                                <Label htmlFor='number'>Number</Label>
                                <input type="text" id='number' name='number' value={input.phoneNumber} onChange={changeEventHandler} className='col-span-3 border' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4 py-4'>
                                <Label htmlFor='bio'>Bio</Label>
                                <input type="text" id='bio' name='bio' value={input.bio} onChange={changeEventHandler} className='col-span-3 border' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4 py-4'>
                                <Label htmlFor='skills'>Skills</Label>
                                <input type="text" id='skills' name='skills' value={input.skills} onChange={changeEventHandler} className='col-span-3 border' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4 py-4'>
                                <Label htmlFor='file'>Resume</Label>
                                <input type="file" id='file' name='file' accept='application/pdf' onChange={ChangefileHandler} className='col-span-3 border' />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button>
                                    : <Button type="submit" className="w-full my-4">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog
