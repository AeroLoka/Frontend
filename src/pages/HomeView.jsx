import React from 'react'
import FormSkeleton from '../components/skeletons/FormSkeleton'

const HomeView = () => {
  return (
    <>
    
    <div className="text-3xl font-bold underline">HomeView</div>
    <FormSkeleton height="h-96" width="w-96"/>
    </>
  )
}

export default HomeView