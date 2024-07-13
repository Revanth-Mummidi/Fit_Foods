import React from 'react'
import Navbar from '../../components/Navbar'
import Hero from './Components/Hero'
import HeadlineCards from './Components/HeadlineCards'
import SuggestedFood from './Components/SuggestedFood'
import Category from './Components/Category'
function HomeScreen() {
  return (
    <div>
      <Navbar/>
        <Hero />
        <Category />

         {/* <HeadlineCards />  */}
        <SuggestedFood />
    </div>
  )
}

export default HomeScreen