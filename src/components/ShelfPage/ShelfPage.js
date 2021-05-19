import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import '../ShelfPage/ShelfPage.css'

function ShelfPage() {


  const dispatch = useDispatch();


  const shelf = useSelector(store => store.shelf);
  console.log(shelf);

  useEffect(() => {
    dispatch({type: 'GET_SHELF' });
  }, []);

  


  return (
    <div className="container">
      <h2>Shelf</h2>
      <div>
        <ul>
          {shelf.map((item, i) => {
            return (<li key={i}>{item.description}:<img className="images" src={item.image_url}/></li>)
                    
          })}
        </ul>
      </div>
    </div>
  );
}

export default ShelfPage;
