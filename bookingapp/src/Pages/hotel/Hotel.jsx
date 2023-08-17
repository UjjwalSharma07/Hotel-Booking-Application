import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import style from "./Hotel.module.css";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/Footer/Footer";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const {dates,options} = useContext(SearchContext);
  const {user} = useContext(AuthContext);
  
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0]?.endDate, dates[0]?.startDate);
  
  const handelOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const handleMove = (direction) => {
    let newSliderNumber;
    if (direction === "l") {
      newSliderNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSliderNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSliderNumber);
  };
  const handleClick = ()=>{
    if(user){
      setOpenModal(true);
    }else{
      navigate("/login")
    }
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className={style.hotelContainer}>
          {open && (
            <div className={style.slider}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className={style.close}
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className={style.arrow}
                onClick={() => handleMove("l")}
              />
              <div className={style.SliderWrapper}>
                <img
                  src={data.photos[slideNumber]}
                  className={style.SliderImg}
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className={style.arrow}
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className={style.hotelWrapper}>
            <button className={style.bookNow} onClick={handleClick}>Reserve or Book Now!</button>
            <h1 className={style.hotelTitle}>{data.name}</h1>
            <div className={style.hotelAddress}>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className={style.hotelDistance}>
              Excellent location - {data.distance}m from center
            </span>
            <span className={style.hotelPriceHighlight}>
              Book a stay over ₹ {data.cheapestPrice} at this property and get a free airport
              taxi
            </span>
            <div className={style.hotelImgs}>
              {data.photos?.map((photo, i) => (
                <div className={style.hotelImgWrapper}>
                  <img
                    src={photo}
                    onClick={() => handelOpen(i)}
                    alt=""
                    className={style.hotelImg}
                  />
                </div>
              ))}
            </div>
            <div className={style.HotelDetails}>
              <div className={style.hotelDetailsText}>
                <h1 className={style.hotelTitle}>
                  {data.title}
                </h1>
                <p className={style.hotelDetailsDesc}>
                  {data.desc}
                </p>
              </div>
              <div className={style.hotelDetailsPrice}>
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Highly rated by recent guests (8.6), Free private parking
                  available at the hotel
                </span>
                <h2>
                  <b>₹{days * data?.cheapestPrice * options?.room}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}> Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen = {setOpenModal} hotelId = {id}/> }
    </div>
  );
};

export default Hotel;
