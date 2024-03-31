import React, { useState } from 'react'

const profile = () => {
    const [selectedComponent, setSelectedComponent] = useState<
    "EditProfile" | "Security" 
  >("EditProfile");

  const handleTabClick = (tab:  "EditProfile" | "Security" ) => {
    setSelectedComponent(tab);
  };
  return (
    <div>
        
    </div>
  )
}

export default profile