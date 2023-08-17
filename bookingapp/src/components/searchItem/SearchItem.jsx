import React from 'react'
import { Link } from 'react-router-dom';
import style from './SearchItem.module.css'


const SearchItem = ({item}) => {
  
  return (
    <div className={style.searchItem}>
      <img src={item.photos[0]} alt="" className={style.siImg}/>
      
      <div className={style.siDesc}>
        <h1 className={style.siTitle}>{item.name}</h1>
        <span className={style.siDistance}>{item.distance}m from center</span>
        <span className={style.siTaxiOp}>Free airport taxi</span>
        <span className={style.siSubTitle}>Studio Apartment with Air conditioning</span>
        <span className={style.siFeatures}>
          {item.desc.length > 50 ? `${item.desc.substring(0, 50)}...` : item.desc}
        </span>
        <span className={style.siCancelOp}>Free cancellation</span>
        <span className={style.siCancelOpSubTitle}>
            You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className={style.siDetails}>
        {item.rating  && <div className={style.siRating}>
            <span>Excellent</span>
            <button>{item.rating}</button>
        </div>}
        <div className={style.siDetailTexts}>
            <span className={style.siPrice}>₹ {item.cheapestPrice}</span>
            <span className={style.sitaxiOp}>Include taxes and fees</span>
            <Link to={`/hotels/${item._id}`}>
              <button className={style.siCheckBtn} >See availability</button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
