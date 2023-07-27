import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import style from './List.module.css'
import {format} from "date-fns"
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'

const List = () => {
  const location = useLocation();
  const [Destination,setDestination] = useState(location.state.Destination);
  const [dates,setDates] = useState(location.state.dates);
  const [options,setOptions] = useState(location.state.options);
  const [openDate,setOpenDate] = useState(false);
  const [min,setMin] = useState(undefined);
  const [max,setMax] = useState(undefined);

  const {data, loading,error,reFetch} = useFetch(
    `/hotels?city=${Destination}&min=${min || 0}&max=${max || 999}`
    );
  
  const handleClick = () =>{
    reFetch();
  }
  return (
    <div>
      <Navbar/>
      <Header type="list" />
      <div className={style.ListContainer}>
        <div className={style.ListWrapper}>
          <div className={style.ListSearch}>
              <h1 className={style.ListTitle}>Search</h1>
              <div className={style.lstItems}>
                <label >Destination</label>
                <input onChange={e=>(setDestination(e.target.value))} placeholder={Destination} type="text" />
              </div>
              <div className={style.lstItems}>
                <label >Check-in-Date</label>
                <span onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate,"MM/dd/yyyy")} to ${format(dates[0].endDate,"MM/dd/yyyy")}`}</span>
                {openDate && (<DateRange 
                  onChange={item=> setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />)}
              </div>
              <div className={style.lstItems}>
                <label>Options</label>

                <div className={style.lsOptions}>

                <div className={style.lsOptionItem}>
                  <span className={style.lsOptiontext}>
                    Min price <small>per night</small>
                  </span>
                  <input type="number" onChange={e=>setMin(e.target.value)} min={0} className={style.lsOptionIput}/>
                </div>
                
                <div className={style.lsOptionItem}>
                  <span className={style.lsOptiontext}>
                    Max price <small>per night</small>
                  </span>
                  <input type="number" onChange={e=>setMax(e.target.value)} min={0} className={style.lsOptionIput}/>
                </div>
                <div className={style.lsOptionItem}>
                  <span className={style.lsOptiontext}>
                    Adult
                  </span>
                  <input type="number" min={1} placeholder={options.adult} className={style.lsOptionIput}/>
                </div>
                <div className={style.lsOptionItem}>
                  <span className={style.lsOptiontext}>
                    Children
                  </span>
                  <input type="number" min={0} placeholder={options.children} className={style.lsOptionIput}/>
                </div>
                <div className={style.lsOptionItem}>
                  <span className={style.lsOptiontext}>
                    Room
                  </span>
                  <input type="number" min={1} placeholder={options.room} className={style.lsOptionIput}/>
                </div>
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
          </div>
          <div className={style.ListResult}>
            {loading? "loading" :<>
              {data.map((item)=>(
                <SearchItem item={item} key={item._id} />
              ))}
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List

