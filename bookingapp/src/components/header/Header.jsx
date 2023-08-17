import { DateRange } from 'react-date-range';
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faRoad, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useState } from 'react';
import React from 'react'
import {format} from "date-fns"
import style from './Header.module.css'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({type}) => {
    const [openDate,setOpenDate] = useState(false);
    const [destination,setDestination]=useState("");
    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    
      const [openoptions,setopenOptions] = useState(false);
      const [options,setOptions] = useState({
        adult:1,
        children:0,
        room:1
      });
      const handelOption=(name,operation)=>{
        setOptions((prev)=>{
            return{
                ...prev,
                [name]:operation === "i" ? options[name]+1 : options[name]-1,
            };
        });
      };
      const navigate = useNavigate();
      const handleSearch= () =>{
          dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
          navigate("/hotels",{state:{destination,dates,options}});
          setopenOptions(false);
      };
      const {dispatch} = useContext(SearchContext);
      const { user } = useContext(AuthContext);

  return (
    <div className={style.header}>
        <div  className={type==="list"?style.headerContainerlist:style.headerContainer}>
            <div className={style.headerList}>
                <div  className={style.headerListItemsActive}>
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div  className={style.headerListItems}>
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div  className={style.headerListItems}>
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car rentals</span>
                </div>
                <div  className={style.headerListItems}>
                    <FontAwesomeIcon icon={faBed} />
                    <span>Attraction</span>
                </div>
                <div  className={style.headerListItems}>
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Airport taxis</span>
                </div>
            </div>
          { type !== "list" && <> <h1 className={style.headerTitle}>A lifetime of discounts? It's Genius.</h1>
            <p className={style.headerDesc}>
                Get rewarded for your travels - unlock instant savings of 10% or more with a free Sharmabooking account
            </p>
           {!user && <button className={style.headerbtn}  onClick={()=>navigate("/login")} >Sign in / Register</button>}
            <div className={style.headerSearch}>
                <div className={style.headerSearchItem}>
                    <FontAwesomeIcon icon={faRoad} className={style.headerIcon} />
                    <input type="text" placeholder="Where are you going?" className={style.headerSearchInput} onChange={e=>setDestination(e.target.value)} />
                </div>
                <div className={style.headerSearchItem}>
                    <FontAwesomeIcon icon={faCalendarDays} className={style.headerIcon} />
                    <span onClick={()=>setOpenDate(!openDate ,setopenOptions(false))} className={style.headerSearchText}>{`${format(dates[0].startDate,"MM/dd/yyyy")} to ${format(dates[0].endDate,"MM/dd/yyyy")} `} </span>
                    {openDate && <DateRange
                    editableDateInputs={true}
                    onChange={item => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    minDate={new Date()}
                    className={style.date}
                    />}
                </div>
                <div className={style.headerSearchItem}>
                    <FontAwesomeIcon icon={faPerson} className={style.headerIcon} />
                    <span className={style.headerSearchText} onClick={()=>setopenOptions(!openoptions,setOpenDate(false))}>{`${options.adult} adult | ${options.children} children | ${options.room} room`}</span>
                    {openoptions && <div className={style.options}>
                        <div className={style.optionItems}>
                            <span className={style.optionText}>Adult</span>
                            <div className={style.optionCounter}>
                            <button className={style.optionCounterBtn} disabled={options.adult <= 1} onClick={()=>handelOption("adult","d")}>-</button>
                            <span className={style.optionCount}>{options.adult}</span>
                            <button className={style.optionCounterBtn} onClick={()=>handelOption("adult","i")}>+</button>
                            </div>
                        </div>
                        <div className={style.optionItems}>
                            <span className={style.optionText}>Children</span>
                            <div className={style.optionCounter}>
                            <button className={style.optionCounterBtn} disabled={options.children <= 0} onClick={()=>handelOption("children","d")}>-</button>
                            <span className={style.optionCount}>{options.children}</span>
                            <button className={style.optionCounterBtn} onClick={()=>handelOption("children","i")}>+</button>
                            </div>
                        </div>
                        <div className={style.optionItems}>
                            <span className={style.optionText}>Room</span>
                            <div className={style.optionCounter}>
                            <button className={style.optionCounterBtn} disabled={options.room <= 1} onClick={()=>handelOption("room","d")}>-</button>
                            <span className={style.optionCount}>{options.room}</span>
                            <button className={style.optionCounterBtn} onClick={()=>handelOption("room","i")}>+</button>
                            </div>
                        </div>
                    </div>}
                </div>
                <div className={style.headerSearchItem}>
                   <button className={style.headerbtn} onClick={handleSearch}>Serach</button>
                </div>
            </div> </>}
      </div>
    </div>
  )
}

export default Header
