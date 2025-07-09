import React, { useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar'
import { TableCaption } from '../ui/table'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import {  setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompanies();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
    console.log("Companies component is working/loading")
  }, [input])


  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5 gap-2'>
          <Input placeholder="Filter by Name" onChange={(e) => setInput(e.target.value)} />
          <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
        </div>
        <CompanyTable />
      </div>
    </div>
  )
}

export default Companies
