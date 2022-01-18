import React, { Component, useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from "axios";
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import {getUrlEditGradeStructOfClass, getUrlGetGradeStructOfClass, getAccessToken, removeAccessToken} from '../../services/app.service';
import IconButton from '@mui/material/IconButton';
// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));
const token = getAccessToken();
const config = {
  headers: { Authorization: `Bearer ${token}` }
}
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 0;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  width: "100%",
  display: "flex",
  alignItems: "center",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  padding: grid,
  width: "fit-content"
});

const Drag = ({ classData }) => {
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState("");
  const [items, setItems] = useState([]);
  const [editAble, setEditAble] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const onClickSave = (index) => {
    setEditIndex(index);
    const { Rank, Grade, ClassID, Name } = items[index];
    const url = getUrlEditGradeStructOfClass(ClassID, String(index + 1));
    const postData = {
      Name: Name,
      Grade: Grade,
      headers: { Authorization: `Bearer ${token}` }
    }

    axios.put(url, postData).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
      removeAccessToken(); 
                    window.location.href = 'http://localhost:3001/signin';
  });

  }




  const onChaneTextField = (data) => {
    const { Name, Grade, index } = data;
    const tmp = index;
    let newItems = [];
    if (Name) {
      newItems = items.map((item, index) => {
        if (index === tmp)
          return { ...item, Name: Name }
        else
          return item;
      });
    }
    else {
      newItems = items.map((item, index) => {
        if (index === tmp)
          return { ...item, Grade: Grade }
        else
          return item;
      });
    }
    setItems(newItems);
  }


  useEffect(() => {
    const arr = [];
    for (let i = 0; i < items.length; i++)
      if (i === editIndex)
        arr.push(!editAble[editIndex]);
      else
        arr.push(editAble[i]);
    setEditAble([...arr]);
    setEditIndex(-1);
  }, [editIndex])

  useEffect(() => {
    const url = getUrlGetGradeStructOfClass(classData.ClassID);

    
    axios.get(url, config).then((reponse) => {
      setItems(reponse.data);
      console.log(reponse.data);
    })
    .catch((error) => {
      console.log(error);
      removeAccessToken(); 
                    window.location.href = 'http://localhost:3001/signin';
  });
  }, [])

  useEffect(() => {
    if (editAble === null) {
      const arr = [];
      for (let i = 0; i < items.length; i++)
        arr.push(false);
      setEditAble([...arr]);
    }
  }, [items])




  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const itemss = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    const editAbles = reorder(
      editAble,
      result.source.index,
      result.destination.index
    );
    var a = result.source.index;
    var b = result.destination.index;
    if (a > b) {
      let tmp = a;
      a = b;
      b = tmp;
    }


    for (let i = a; i <= b; i++) {
      const url = getUrlEditGradeStructOfClass(classData.ClassID, String(i + 1));
      const postData = {
        Name: itemss[i].Name,
        Grade: itemss[i].Grade,
        headers: { Authorization: `Bearer ${token}` }
      }
      axios.put(url, postData).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
        removeAccessToken(); 
                    window.location.href = 'http://localhost:3001/signin';
    });
    }
    if (!result.isResetItem) {
      setItems(itemss);
      setEditAble(editAbles);
    }
  }

  const onClickDelete = (index) => {
    // const tmp = {
    //   source: { index: index },
    //   destination: { index: items.length - 1 },
    //   isResetItem: true
    // }
    // onDragEnd(tmp);
    const indexA = index;
    const indexB = items.length - 1;

    const itemss = reorder(
      items,
      indexA,
      indexB
    );
    const editAbles = reorder(
      editAble,
      indexA,
      indexB
    );

    var a = indexA;
    var b = indexB;
    if (a > b) {
      let tmp = a;
      a = b;
      b = tmp;
    }


    for (let i = a; i <= b; i++) {

      const url = getUrlEditGradeStructOfClass(classData.ClassID, String(i + 1));
      const postData = {
        Name: itemss[i].Name,
        Grade: itemss[i].Grade,
        headers: { Authorization: `Bearer ${token}` }
      }

      axios.put(url, postData).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
        removeAccessToken(); 
                    window.location.href = 'http://localhost:3001/signin';
    });
    }




    const { Rank, Grade, ClassID, Name } = itemss[index];

    const url = getUrlEditGradeStructOfClass(ClassID, String(itemss.length));
    axios.delete(url, config).then((response) => {
      console.log(response);

      const newItemss = [...itemss];
      newItemss.pop();
      setItems(newItemss);

      const neweditAbles = [...editAbles];
      neweditAbles.pop();
      setEditAble(neweditAbles);

    }).catch((error) => {
      console.log(error);
      removeAccessToken(); 
                    window.location.href = 'http://localhost:3001/signin';
  });


  }

  const handleCreate = () => {
    let itemss = items;
    itemss.push({
      ClassID: classData.ClassID, Rank: items.length + 1,
      Name: newName, Grade: newGrade
    });
    setItems(itemss);
    let rank = itemss.length + 1;
    const url = getUrlEditGradeStructOfClass(classData.ClassID, rank);
    const postItem = {
      Name: newName,
      Grade: newGrade,
      headers: { Authorization: `Bearer ${token}` }
    };
    setNewName("");
    setNewGrade("");
    axios.put(url, postItem).then((reponse) => {
      // setItems(reponse.data);
    })
    .catch((error) => {
      console.log(error);
      removeAccessToken(); 
                    window.location.href = 'http://localhost:3001/signin';
  });
  }
  // length = items.length(); 

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity

  return (
    <Box style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: 'center',

    }}>
      <IconButton size="small" sx={{ color: "red" }} onClick={() => window.location = "../../teacher/" + classData.ClassID}>
        <HighlightOffRoundedIcon fontSize="small" sx={{ color: "red" }} />
      </IconButton>
      <DragDropContext onDragEnd={onDragEnd} >
        <Droppable droppableId="droppable" >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => {
                const id = index;
                return (
                  <Draggable key={item.Rank} draggableId={String(item.Rank)} index={index}>
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
                          border: "solid",
                          borderRadius: "5px",
                          borderColor: "#7b807a",
                          borderWidth: "0px",
                          boxShadow: "0px 0px 4px grey",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: 'column' }}>
                          <TextField
                            disabled={!editAble[index]}
                            sx={{ m: 1, width: '50ch' }}
                            label="Grade Title"
                            id="filled-size-small"
                            defaultValue={item.Name}
                            variant="filled"
                            size="small"
                            style={{ marginTop: 20 }}
                            opacity="100%"
                            onChange={(e) => onChaneTextField({ Name: e.target.value, index })}
                          />
                          <TextField
                            disabled={!editAble[index]}
                            sx={{ m: 1, width: '50ch' }}
                            label="Grade Detail"
                            id="filled-size-normal"
                            defaultValue={item.Grade}
                            variant="filled"
                            style={{ marginBottom: 20 }}
                            onChange={(e) => onChaneTextField({ Grade: e.target.value, index })}
                          />
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", flexFlow: "column wrap-reverse", height: "match-parent", alignItems: "right", width: "100%" }}>


                          {
                            !editAble[index] ? <Button variant="outlined"
                              style={{
                                height: "50%", padding: 0, width: "100%",
                                backgroundColor: '#0069d9', display: 'flex', alignItems: 'center',
                                maxWidth: '30px', minWidth: '30px',
                              }}
                              positionButton={index}
                              onClick={() => setEditIndex(index)}
                            >
                              <EditIcon sx={{ color: "white" }} />
                            </Button> : <Button variant="outlined"
                              style={{
                                height: "50%", padding: 0, width: "100%",
                                backgroundColor: '#54f357', display: 'flex', alignItems: 'center',
                                maxWidth: '30px', minWidth: '30px',

                              }}
                              onClick={() => onClickSave(index)}

                              positionButton={index}
                            >
                              <SaveIcon sx={{ color: "white" }} />
                            </Button>
                          }


                          <Button variant="outlined"
                            style={{
                              height: "50%", padding: 0, width: "100%",
                              backgroundColor: '#ff1a1a', display: 'flex', alignItems: 'center',
                              maxWidth: '30px', minWidth: '30px',
                            }}
                            positionButton={index}
                            onClick={() => onClickDelete(index)}
                          >
                            <DeleteIcon sx={{ color: "white" }} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div style={{
          display: "flex", border: "solid",
          borderRadius: "5px",
          borderColor: "#7b807a",
          borderWidth: "0px",
          boxShadow: "0px 0px 5px grey"
        }}>

          <div style={{ display: "flex", flexDirection: 'column' }}>
            <TextField
              sx={{ m: 1, width: '50ch' }}
              label="Grade Title"
              id="filled-size-small"
              variant="filled"
              size="small"
              style={{ marginTop: 20 }}
              onChange={(e) => { setNewName(e.target.value) }}
            />
            <TextField
              sx={{ m: 1, width: '50ch' }}
              label="Grade Detail"
              id="filled-size-normal"
              variant="filled"
              style={{ marginBottom: 20 }}
              onChange={(e) => { setNewGrade(e.target.value) }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", flexFlow: "column wrap-reverse", height: "match-parent", alignItems: "right", width: "100%" }}>
            <Button onClick={handleCreate} variant="outlined" sx={{ width: "10ch" }}
              style={{ maxWidth: '30px', minWidth: '30px', height: "100%", padding: '0 0 0 0', width: "10px", backgroundColor: '#00b300', alignItems: "center", display: 'flex', alignItems: 'center', }}>
              <AddCircleOutlineIcon sx={{ color: "white" }} />
            </Button>
          </div>
        </div>
      </DragDropContext>
    </Box>

  );
}
export default Drag;