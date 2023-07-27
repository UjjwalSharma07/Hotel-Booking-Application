import React from 'react'
import Featured from '../../components/featured/Featured'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Navbar from '../../components/navbar/Navbar'
import PropertyList from '../../components/propertyList/PropertyList'
import style from './Home.module.css'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className={style.homeContainer}>
        <Featured/>
        <h1 className={style.homeTitle}>Browser by property type</h1>
        <PropertyList/>
        <h1 className={style.homeTitle}>Home guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
