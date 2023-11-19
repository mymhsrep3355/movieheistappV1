import React, { useState } from 'react'
import AppNavigation from '../components/AppNavigation';

export default function Home() {

  const [isScorlledDown, setIsScrolledDown] = useState(false);

  window.onscroll = () =>{
    setIsScrolledDown(window.pageYOffset === 0?false:true);
    return () => (window.onscroll=null);
  }
  return (
    <AppNavigation isScorlledDown={isScorlledDown}></AppNavigation>
  )
}
