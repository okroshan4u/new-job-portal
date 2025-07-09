import React, { useEffect, useState } from 'react'
import Navbar from './Shared/Navbar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '@/redux/jobSlice'
import store from '@/redux/store'
import { APPLYFORJOB_API_END_POINT, JOBS_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'


const JobDescription = () => {

    const params = useParams();
    const jobid = params.id;
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth)
    const { singleJob } = useSelector(store => store.job)
    const isInitaillyApplied = singleJob?.application?.some(application => application.applicant == user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitaillyApplied);
   

    const appliedJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLYFORJOB_API_END_POINT}/apply/${jobid}`, { withCredentials: true })
       
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, application: [...singleJob.application, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to update the ui in real time
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error("Apply request failed:", error);

            const errorMsg =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong!";
            toast.error(errorMsg);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {

                const res = await axios.get(`${JOBS_API_END_POINT}/get/${jobid}`, { withCredentials: true });
             
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.application.some(application => application.applicant == user?._id))
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob();

    }, [jobid, dispatch, user?._id])


    return (
        <div>
            <Navbar />
            <div className='mx-auto max-w-7xl mt-5'>
                <div className='flex mx-auto max-w-7xl justify-between'>
                    <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className="badges flex gap-2 my-2 items-center">
                            <Badge variant='outline' className="text-blue-700">{singleJob?.position} Openings</Badge>
                            <Badge variant='outline' className="text-green-700">{singleJob?.jobType}</Badge>
                            <Badge variant='outline' className="text-red-700">{singleJob?.salary}LPA</Badge>
                        </div>
                    </div>
                    <Button onClick={isApplied ? null : appliedJobHandler} disabled={isApplied}
                        className='rounded-lg'
                    >{isApplied ? "Already Applied" : "Apply Now"}</Button>
                </div>
                <h1 className='border-b-2 border-b-gray-300 font-medium py-4'> Job Description</h1>
                <div>
                    <h1 className='font-bold my-1'>Role:<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location:<span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yr</span></h1>
                    <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants:<span className='pl-4 font-normal text-gray-800'>{singleJob?.application.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date:<span className='pl-4 font-normal text-gray-800'> {singleJob?.createdAt
                        ? singleJob?.createdAt.split("T")[0]
                        : "N/A"}
                    </span></h1>

                </div>
            </div>

        </div>
    )
}

export default JobDescription
