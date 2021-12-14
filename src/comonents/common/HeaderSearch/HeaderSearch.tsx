import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchCarsSearch } from "../../CarsList/car-actions";


const HeaderSearch = () => {

  // const dispatch = useDispatch()

// const [searchStr, setSearcStr] = useState('')

// const onChangeSearchHandler  = (str: string) => {
//   setSearcStr(str)
// }

// const uploadSearchDataHandler = async () => {
//    console.log('start search');
//   await dispatch(fetchCarsSearch(searchStr));
//   console.log('finish search');
// }


  return (
    <div className="input-group d-flex justify-content-start ms-10">
      <div className="d-flex form-outline">
        {/* <input onChange={(event)=>{onChangeSearchHandler(event.target.value)}} type="search" id="form1" className="form-control" /> */}
      </div>
      {/* <button onClick={uploadSearchDataHandler} type="button" className="btn btn-secondary "> */}
        <FontAwesomeIcon icon={faSearch} />
        <span className="ms-2"></span>
        Пошук
      {/* </button> */}
    </div>
  );
};

export default HeaderSearch;
