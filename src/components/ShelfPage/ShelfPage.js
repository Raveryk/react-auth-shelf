import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/core/styles";

import "../ShelfPage/ShelfPage.css";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: 250,
    height: 300,
  },
  title: {
    textAlign: 'center',
  },
  images: {
    maxWidth: 200,
    maxHeight: 200,
    height: 150,
  },
  delete: {
    flexWrap: 'wrap',
  },
  formContainer: {
    margin: 50
  }
});

function ShelfPage() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const newItem = {
    description: description,
    url: url,
  };

  const addItem = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_NEW_ITEM", payload: newItem });
    clearFields();
  };

  const clearFields = () => {
    setDescription("");
    setUrl("");
  };

  const shelf = useSelector((store) => store.shelf);
  //console.log(shelf);

  useEffect(() => {
    dispatch({ type: "GET_SHELF" });
  }, []);

  return (
    <>
      <div >
        <h2>Shelf</h2>
        <p>All of the available items can be seen here.</p>
      </div>
      <div >
        <form onSubmit={addItem} className={classes.formContainer} >
          <TextField
            onChange={(event) => setDescription(event.target.value)}
            value={description}
            placeholder="Description"
          />
          <TextField
            onChange={(event) => setUrl(event.target.value)}
            value={url}
            placeholder="Image url"
          />
          <Button variant="outlined">Add Item</Button>
        </form>

        <Grid className={classes.root} container spacing={3}>
          {shelf.map((item, i) => {
            return (
              <Grid item sm={2} variant="outlined" elevated={10} key={i}>
                <Card className={classes.gridList}
                justify="center"
                alignItems="center"
                elevation={10}>
                
                  
                  <h4 className={classes.title}>{item.description}</h4>
                  <CardContent>
                    <img className={classes.images} src={item.image_url} />
                  </CardContent>
                  <div >
                  <DeleteIcon
                    className={classes.delete}
                    onClick={() =>
                      dispatch({ type: "DELETE_ITEM", payload: item.id })
                    }
                  >
                    Remove
                  </DeleteIcon>
                  </div>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
}

// function ShelfPage() {

//   const dispatch = useDispatch();

//   const shelf = useSelector(store => store.shelf);
//   console.log(shelf);

//   useEffect(() => {
//     dispatch({type: 'GET_SHELF' });
//   }, []);

//   return (
//     <div className="container">
//       <h2>Shelf</h2>

//     </div>
//   );
// }

export default ShelfPage;
