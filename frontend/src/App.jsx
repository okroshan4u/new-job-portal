import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Shared/Navbar'
import { RouterProvider } from 'react-router'
import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import ComapnySetUp from './components/admin/ComapnySetUp'
import AdminJobs from './components/admin/AdminJobs'
import PostNewJob from './components/admin/PostNewJob'
import Applicants from './components/admin/Applicants'
import ProtectRoute from './components/admin/ProtectRoute'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },

   {
    path:'/admin/companies',
    element:<ProtectRoute><Companies/></ProtectRoute>
  },
   {
    path:'/admin/companies/create',
    element:<ProtectRoute><CompanyCreate/></ProtectRoute>
  },
   {
    path:'/admin/companies/:id',
    element:<ProtectRoute><ComapnySetUp/></ProtectRoute>
  },
   {
    path:'/admin/jobs',
    element:<ProtectRoute><AdminJobs/></ProtectRoute>
  },
   {
    path:'/admin/jobs/create',
    element:<ProtectRoute><PostNewJob/></ProtectRoute>
  },
   {
    path:'/admin/companies/:id/applicants',
    element:<ProtectRoute><Applicants/></ProtectRoute>
  },
])

function App() {

  return (
    <div>
     <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
