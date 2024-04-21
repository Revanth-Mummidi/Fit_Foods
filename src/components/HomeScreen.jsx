import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import HeadlineCards from './HeadlineCards'
import SuggestedFood from './SuggestedFood'
import Category from './Category'
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