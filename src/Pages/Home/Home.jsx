import React from 'react'
import HomeHero from '../../Components/HomeComponent/HomeHero'
import Feature from '../../Components/HomeComponent/Feature'
import MarketPlace from '../../Components/HomeComponent/MarketPlace'
import HowItWorks from '../../Components/HomeComponent/HowItWorks'
import HomeImpact from '../../Components/HomeComponent/HomeImpact'

const Home = () => {
  return (
    <div>
      <HomeHero />
      <Feature />
      <HowItWorks />
      <HomeImpact />
      <MarketPlace />
    </div>
  );
}

export default Home
