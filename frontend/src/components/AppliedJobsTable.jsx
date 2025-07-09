import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobsTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job)
   
  return (
    <div>
        <Table>
            <TableCaption>List of all of your applied Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                   allAppliedJobs?.length <= 0 ? <span>You have not applied for any job yet</span> : allAppliedJobs?.map((appliedjob)=>{
                    return(
                        <TableRow key={appliedjob._id}>
                            <TableCell>{appliedjob?.createdAt.split("T")[0]}</TableCell>
                            <TableCell>{appliedjob?.job?.title}</TableCell>
                            <TableCell>{appliedjob?.job?.company?.name}</TableCell>
                            <TableCell className="text-right"><Badge>{appliedjob?.status}</Badge></TableCell>
                        </TableRow>
                    )
                   })
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobsTable
