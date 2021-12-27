import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from "axios";
// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 0;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  width: "100%",
  display: "flex",
  alignItems: "center",
  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",
  // border: "solid",
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "fit-content"
});

const Drag = ({classData}) => {
  const [items, setItems] = useState([]);
  useEffect(() =>{
    const url = 'http://localhost:3000/grade-struct/class/' + classData.ClassID;
    axios.get(url).then((reponse) =>{
      setItems(reponse.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }, [])

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const itemss = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    var a =  result.source.index;
    var b = result.destination.index;
    if (a > b){
      let tmp = a;
      a= b;
      b =tmp;
    }
    for(let i in Range( a, b+1)){
      const url = 'http://localhost:3000/grade-struct/class/' + classData.ClassID + 'rank/' + i;
      const postData = {
        Name: itemss[i].Name,
        Grade: itemss[i].Grade
      }

      axios.put(url, postData).then((response) =>{
        console.log(response);
      }).catch((error) =>{
        console.log(error);
      })
    }
    setItems(itemss);


  }
  const handleCreate = ()=>{
    let itemss = items;
     // length = items.length(); 
  }
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity

  return (
    <Box style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: 'center',
      
    }}>
      <DragDropContext onDragEnd={onDragEnd} >
        <Droppable droppableId="droppable" >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // style={getItemStyle(
                      //   snapshot.isDragging,
                      //   provided.draggableProps.style
                      // )}
                      style={{
                        userSelect: "none",
                        padding: 0,
                        margin: `0 0 10px 0`,
                        width: "100%",
                        display: "flex",
                        // flexDirection: "column",

                        // alignItems:"center" ,
                        // textAlign:'center',
                        // change background colour if dragging
                        // background: isDragging ? "lightgreen" : "grey",
                        border: "solid",
                        borderRadius:"5px",
                        borderColor:"#7b807a",
                        borderWidth:"1px",
                        // styles we need to apply on draggables
                        ...provided.draggableProps.style,
                      }}
                    >

                      {/* {item.content} */}

                      <div style={{ display: "flex", flexDirection: 'column' }}>
                        <TextField
                          sx={{ m: 1, width: '50ch' }}
                          label="Grade Title"
                          id="filled-size-small"
                          defaultValue="Small"
                          variant="filled"
                          size="small"
                          style={{ paddingTop: 20 }}
                          opacity="100%"
                        />
                        <TextField
                          sx={{ m: 1, width: '50ch' }}
                          label="Grade Detail"
                          id="filled-size-normal"
                          defaultValue="Normal"
                          variant="filled"
                          style={{ paddingBottom: 20 }}
                          
                        />
                      </div>
                      <div style={{ display: "flex",justifyContent: "flex-end", flexFlow: "column wrap-reverse", height: "match-parent", alignItems: "right", width: "100%" }}>
                        <Button variant="outlined"
                          style={{
                            height: "50%", padding: 0, width: "100%",
                            backgroundColor: '#0069d9', display: 'flex', alignItems: 'center',
                            maxWidth: '30px',minWidth: '30px',
                          }}>
                          <EditIcon sx={{ color: "white" }} />
                        </Button>
                        <Button variant="outlined"
                          style={{
                            height: "50%", padding: 0, width: "100%",
                            backgroundColor: '#ff1a1a', display: 'flex', alignItems: 'center',
                            maxWidth: '30px',minWidth: '30px',
                          }}>
                          <DeleteIcon sx={{ color: "white" }} />
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div style={{ display: "flex",border: "solid",
                        borderRadius:"5px",
                        borderColor:"#7b807a",
                        borderWidth:"1px", }}>

          <div style={{ display: "flex", flexDirection: 'column' }}>
            <TextField
              sx={{ m: 1, width: '50ch' }}
              label="Grade Title"
              id="filled-size-small"
              defaultValue="Small"
              variant="filled"
              size="small"
              style={{ paddingTop: 20 }}
            />
            <TextField
              sx={{ m: 1, width: '50ch' }}
              label="Grade Detail"
              id="filled-size-normal"
              defaultValue="Normal"
              variant="filled"
              style={{ paddingBottom: 20 }}

            />
          </div>
          <div style={{display: "flex",justifyContent: "flex-end", flexFlow: "column wrap-reverse", height: "match-parent", alignItems: "right", width: "100%" }}>
            <Button onClick= {handleCreate} variant="outlined" sx={{width:"10ch"}}
              style={{ maxWidth: '30px',minWidth: '30px',height: "100%", padding: '0 0 0 0', width: "10px", backgroundColor: '#00b300', alignItems: "center", display: 'flex', alignItems: 'center', }}>
              <AddCircleOutlineIcon sx={{ color: "white" }} />
            </Button>

          </div>

        </div>
      </DragDropContext>
    </Box>

  );
}
export default Drag;