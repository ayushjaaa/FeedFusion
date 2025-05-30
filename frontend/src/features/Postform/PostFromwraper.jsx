import React, { useState } from 'react'
import Step1 from '../Postform/PostForm'
import Step2 from '../../components/components/BasicTreeView'
const page = {
  Step1:1,
  Step2:2,

}


const PostFromwraper = () => {
  const [currentStep, setcurrentStep] = useState(page.Step1)


const steps ={
  [page.Step1] :Step1,
  [page.Step2]:Step2,
}

function ForwardStepHandler() {
  if(currentStep === page.Step1 || currentStep === page.Step2){
    setcurrentStep(currentStep+1)
  }else{
    currentStep(currentStep)
  }
}

// console.log(page.Step1)
const Component = steps[currentStep]
const Final_Step = Object.keys(page).length;
const submitBttonText = Final_Step == currentStep ? "save":"next";

  return (
<div className={` w-full flex justify-center items-center min-h-screen  bg-gradient-to-r bg-theme.palette.background.alt to-teal-400`}>
  <div className="w-full max-w-md h-auto flex flex-col gap-8  p-6 rounded-lg ">
    <Component />

    <button
      type="submit"
      // disabled={!title || !content}
      onClick={()=>ForwardStepHandler()}
      className="w-[120px] self-center py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {submitBttonText}

    </button>
  </div>
</div>

  
  )
}

export default PostFromwraper
