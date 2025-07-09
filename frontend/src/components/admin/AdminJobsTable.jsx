import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJob = allAdminJobs?.length >= 0 && allAdminJobs?.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        })
        setFilterJobs(filteredJob)
    }, [allAdminJobs, searchJobByText]);

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr key={job?._id}>
                                <TableCell>
                                    {job?.company?.name}
                                </TableCell>
                                <TableCell>
                                    {job?.title}
                                </TableCell>
                                <TableCell>
                                    {job?.createdAt.split("T")[0]}
                                </TableCell>
                                <TableCell className='text-right'>
                                    <Popover >
                                        <PopoverTrigger className='cursor-pointer'><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-46">
                                            <div>
                                                <div onClick={() => navigate(`/admin/companies/${job?._id}`)} className='flex items-center gap-5 px-3 cursor-pointer'>
                                                    <Edit2 className='w-5 cursor-pointer' />
                                                    <span>Edit</span>
                                                </div>
                                                <div onClick={() => navigate(`/admin/companies/${job?._id}/applicants`)} className='flex items-center justify-between px-3 cursor-pointer'>
                                                    <Eye className='w-8 cursor-pointer' />
                                                    <span>Applicants</span>
                                                </div>
                                            </div>

                                        </PopoverContent>
                                    </Popover>
                                </TableCell>

                            </tr>

                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
