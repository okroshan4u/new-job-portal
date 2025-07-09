import { Github, Linkedin, Twitter, X } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-between p-4 border border-t-2 items-center '>
      <div className="left">
        <h1 className='font-bold'>Job Hunt</h1>
        <p>&copy;2025 Jobhunt Pvt Ltd. All rights reserved</p>
      </div>
      <div className="right flex gap-4">
        <a href="http://localhost:5173/" target="_blank"><Twitter/></a>
        <a href="https://github.com/okroshan4u" target="_blank"><Github/></a>
        <a href="https://linkedin.com/in/roshan-kumar-ram-512457246/" target="_blank"><Linkedin/></a>
      </div>
    </div>
  )
}

export default Footer
