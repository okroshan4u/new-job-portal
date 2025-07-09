import React, { useEffect, useState } from 'react'
import { RadioGroup ,RadioGroupItem} from './ui/radio-group'
// import { RadioGroupItem } from '@radix-ui/react-radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'


const filterData = [
    {
        filterType:"Location",
        array:["Bihar","Mumbai","Patna","Hydrabad","Banglore"]
    },
    {
        filterType:"Job Type",
        array:["FrontEnd Developer","Backend Developer","FullStack Developer","DevOps"]
    },
    {
        filterType:"Salary",
        array:["0-40k","40-1 lakh","1lakh - 5lakh"]
    },
]

const FilterCard = () => {
    const dispatch = useDispatch()
    const [selectedValue , setSelectedValue] = useState('')

    const changeHandler = (value)=>{
        setSelectedValue(value)
    }
    useEffect(()=>{
       dispatch(setSearchQuery(selectedValue))

    },[selectedValue])

  return (
    <div>
      <div>
        <h1>Filter Jobs</h1>
        <hr className='mt-3'/>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
                filterData.map((data, index)=>(
                    <div key={index}>
                        <h1>{data.filterType}</h1>
                        {
                            data.array.map((item, idx)=>{
                                const itemId = `id${index}-${idx}`
                                return (
                                    <div className='flex items-center space-x-2 my-2' key={idx}>
                                        <RadioGroupItem value={item} id={itemId}/>
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
      </div>
    </div>
  )
}

export default FilterCard
