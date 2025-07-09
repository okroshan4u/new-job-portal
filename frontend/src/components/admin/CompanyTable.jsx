import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'

const CompanyTable = () => {
    const { companies ,searchCompanyByText} = useSelector(store => store.company)
   

    const [filterCompany , setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })
        setFilterCompany(filteredCompany)
    },[companies,searchCompanyByText]);

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent regestered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <tr key={company?._id}>
                    
                                    <TableCell>
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage src={company.logo} />
                                            <AvatarFallback>company logo</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        {company.name}
                                    </TableCell>
                                    <TableCell>
                                        {company.createdAt.split("T")[0]}
                                    </TableCell>
                                    <TableCell className='text-right'>
                                        <Popover >
                                            <PopoverTrigger className='cursor-pointer'><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-36">
                                                <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center justify-between px-3 cursor-pointer'>
                                                    <Edit2 className='w-5 cursor-pointer' />
                                                    <span>Edit</span>
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

export default CompanyTable
