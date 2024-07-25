import Signinform from "@/components/Signinform";

import React from 'react'

function Page({searchParams}) {
  return (
    <Signinform  callbackUrl={searchParams.callbackUrl}/>
  )
}

export default Page