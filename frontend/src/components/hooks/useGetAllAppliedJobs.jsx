import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLYFORJOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";


const useGetAllAppliedJobs = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllAppliedjobs = async () => {
            try {
                const res = await axios.get(`${APPLYFORJOB_API_END_POINT}/get`, { withCredentials: true })
        
                if (res.data.success) {
                   dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllAppliedjobs()
    }, [])
};

export default useGetAllAppliedJobs;
