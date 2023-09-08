import useFetch from "../../hooks/useFetch";
import style from "./featured.module.css";
import flag from './flag.png'

const Featured = () => {
  const { data, loading, error } = useFetch(
    "https://hotel-booking-application-zqsq.onrender.com/api/v1/hotels/coutByCity?cities=New Delhi,Goa,Delhi,Meerut"
  );
  console.log(data);
  return (
    <div className={style.featured}>
      {loading ? (
        "Loading please wait!!!"
      ) : (
        <>
          <div className={style.featuredItem}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
              alt=""
              className={style.featuredImg}
            />
            <div className={style.featuredTitles}>

              <div className={style.firstdiv}>
                <h1>New Delhi</h1>
                <img className={style.flag} src={flag} alt="" />
              </div>

              {/* <div className={style.seconddiv}>
                <h2>{data[0]}  properties</h2>
              </div> */}

            </div>
          </div>
          <div className={style.featuredItem}>
          <img
              src="https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="
              alt=""
              className={style.featuredImg}
            />
            <div className={style.featuredTitles}>

              <div className={style.firstdiv}>
                <h1>Mumbai</h1>
                <img className={style.flag} src={flag} alt="" />
              </div>

              {/* <div className={style.seconddiv}>
                <h2>{data[0]}  properties</h2>
              </div> */}

            </div>
          </div>
          <div className={style.featuredItem}>
          <img
              src="https://cf.bstatic.com/xdata/images/city/600x600/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o="
              alt=""
              className={style.featuredImg}
            />
            <div className={style.featuredTitles}>

              <div className={style.firstdiv}>
                <h1>Bangalore</h1>
                <img className={style.flag} src={flag} alt="" />
              </div>

              {/* <div className={style.seconddiv}>
                <h2>{data[0]}  properties</h2>
              </div> */}

            </div>
          </div>
        
        </>
      )}
    </div>
  );
};

export default Featured;
