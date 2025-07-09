import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLYFORJOB_API_END_POINT } from '@/utils/constant'


const shortlistingStatus = ["Accepted", "Rejected"]

const ApplicantsTable = () => {

    const { applicants } = useSelector(store => store.application)
    
    const statusHandler = async( status, id)=>{
        try {
            const res = await axios.post(`${APPLYFORJOB_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true})
            if(res.data.success){
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        applicants && applicants?.application?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <TableCell>{item.applicant.fullname}</TableCell>
                                    <TableCell>{item.applicant.email}</TableCell>
                                    <TableCell>{item.applicant.phoneNumber}</TableCell>
                                    <TableCell>
                                        {
                                            item?.applicant?.profile?.resume?.length <= 0 ? <span>NA</span>: <div><a href={item.applicant.profile.resume} target='_blank'>{item.applicant.profile.resumeOriginalName}</a></div>
                                        }
                                        
                                        </TableCell>
                                    <TableCell>{item.applicant.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right">
                                        <Popover >
                                            <PopoverTrigger className='cursor-pointer'><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-46">
                                                <div className='flex flex-col items-center gap-5 px-3 cursor-pointer'>
                                                    {
                                                        shortlistingStatus.map((status, index) => {
                                                            return (
                                                                <div onClick={()=>statusHandler(status,item._id)} key={index}>
                                                                    {status}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>
                            )
                        })
                    }

                </TableBody>
            </Table>
        </div >
    )
}

export default ApplicantsTable
