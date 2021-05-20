import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


function ShelfPage() {

  const dispatch = useDispatch();
  const [description, setDescription] = useState(''); 
  const [url, setUrl] = useState('');

  const newItem = {
    description: description,
    url: url,
  }
  const addItem = (event) => {
    event.preventDefault();
    dispatch({type: 'ADD_NEW_ITEM', payload: newItem})

  }

  return (
    <>
      <div className="container">
        <h2>Shelf</h2>
        <p>All of the available items can be seen here.</p>
      </div>
      <div>
        <form onSubmit={addItem}>
          <input onChange={(event) => setDescription(event.target.value)} value={description} placeholder="Description" />
          <input onChange={(event) => setUrl(event.target.value)} value={url} placeholder="Image url" />
          <button>Add Item</button>
        </form>
      </div>
    </>
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
