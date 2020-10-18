import React, { useContext, useEffect, useState } from 'react';
// import '../styles/List.css'
import  { Droppable, Draggable} from 'react-beautiful-dnd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Container, IconButton, Icon, Link, Button, TextField } from '@material-ui/core';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AddIcon from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch, useSelector } from 'react-redux';
import LibraryAddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SubjectIcon from '@material-ui/icons/Subject'
import CloseIcon from '@material-ui/icons/Close';
// import { createNewCard, setUserCards, addCard } from '../store/cards';
import Cookies, { set } from 'js-cookie'
import ListContext from './utils/DayContext'
// import {updateBoard} from '../store/boards'
// import {updateListOnCard, updateCardTitle,updateCardDescription} from '../store/cards'
// import { updateCardsOnList,createNewList} from '../store/lists'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Crop54Icon from '@material-ui/icons/Crop54';

const updateBoard=()=>{
    return
}


const updateCardTitle=()=>{
    return
}
const updateListOnCard=()=>{
    return
}

const createNewList=()=>{
    return
}

const updateCardsOnList=()=>{
    return
}

const updateCardDescription=()=>{
    return
}

const addCard=()=>{
    return
}
const createNewCard=()=>{
    return
}
const setUserCards=()=>{
    return
}


const useStyles = makeStyles(( theme ) => ({

    root: {
        backgroundColor: "rgb(0, 121, 191)",
        height: '100vh',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: "#f4f5f7",
        boxShadow: theme.shadows[5],
        paddingLeft: "0px",
        paddingBottom: "10px",
        paddingRight: "10px",
        minWidth:"700px",
        outline:"none",
        borderRadius: "4px"
      },

}));

const modalDescriptionStyle = {
    marginRight:"30px",
    marginBottom: "10px",
    padding:"4px", 
    backgroundColor: "lightgrey",
    cursor: "pointer",
    color: "grey",
    display: "block",
    minHeight: "60px",
    padding: "8px 5px",
    '&:hover': {
        backgroundColor: "blue",
    },
}

const cardStyle = {
    userSelect: "none",
    margin:"0 0 8px 0",
    padding:"4px",
    minHeight: "35px",
    borderRadius: "4px",
    backgroundColor: "white",
    color: "black",
    alignItems: "center",
    alignContent: "center",
  }
  
  const addCardStyle = {
    userSelect: "none",
    margin:"0 0 8px 0",
    padding:"4px",
    minHeight: "20px",
    borderRadius: "4px",
    backgroundColor: "white",
    color: "black",
    alignItems: "center"
  };

  const ColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        paddingRight: "10px",
        paddingLeft: "10px",
        backgroundColor:"grey",
        '&:hover': {
            backgroundColor: "#2196f3 !important",
        },
    },
  }))(Button);

  const ModalColorButton = withStyles((theme) => ({
    root: {
        color: "white",
        paddingRight: "10px",
        paddingLeft: "10px",
        backgroundColor:"#5aac44",
        '&:hover': {
            backgroundColor: "#2196f3 !important",
        },
    },
  }))(Button);

const List = ({list,id,cards}) => {
    console.log(`cards for list ${id}: `, cards)
    console.log("list prop ", list)
    console.log("list.cards: ",list.cards)
    const context = useContext(ListContext)
    // const cardsInStore = useSelector(state=> state.entities.lists.userLists[id].cards)
    const cardsInStore = []
    const dispatch = useDispatch()
    const [lists,setLists] = useState({})
    // const [hoveredCardId,setHoveredCardId] = useState(true)
    const [loadingNewCard, setLoadingNewCard] = useState(false)
    const [cardToCreate,setCardToCreate] = useState({})
    const [addCardList,setAddCardList] = useState()
    const [listCards,setListCards] = useState(list.cards)
    const [newCardTitle,setNewCardTitle] = useState("")
    const [newCard, setNewCard] = useState(true)
    const classes = useStyles();
    const [titleOpen, setTitleOpen] = useState(false);
    const [editCard,setEditCard] = useState({})
    const [editCardTitle,setEditCardTitle] = useState("")
    const [editCardDescription,setEditCardDescription] = useState("")
    const [showEditCardDescription,setShowEditCardDescription] = useState(false)

    const handleTitleModalOpen = () => {
        setTitleOpen(true);
    };

    const handleTitleModalClose = () => {
        setTitleOpen(false);
        setShowEditCardDescription(false)
    };

    useEffect(()=>{
        const createNewCard = async (newCard,boardId) => {
            console.log("useEffect boardID: ",boardId)
            if (!newCard.title) return;
            const jsonCard = JSON.stringify({...newCard,boardId})
            console.log("WOWOWOWOWOWOWO")
            const csrfToken = Cookies.get("XSRF-TOKEN");
            const response = await fetch(`/api/lists/add-card`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
                },
            body: jsonCard
            })
            const data = await response.json();
            console.log("this is the new card!!: ",data)
            dispatch(updateBoard(data['board']))
            dispatch(updateCardsOnList(data['listId'],data['cardObject']))
            dispatch(addCard(data['card']))
            list.cards.push(data['card'])
            console.log("list.cards after pushing new card to list.cards: ", list.cards)
            setLoadingNewCard(false)
        }
        console.log("card To Create!",cardToCreate)
        if (cardToCreate) createNewCard(cardToCreate,context.boardId)
    },[newCard])

    const handleOpenModal=(index,cardId)=>{
        setEditCardDescription(list.cards[index].description)
        setEditCardTitle(list.cards[index].title)
        setEditCard({...list.cards[index],index,list})
        handleTitleModalOpen()
    }

    const handleEditCardTitleInput = (e,cardId) => {
        setEditCardTitle(e.target.value)
        list.cards[editCard.index].title = e.target.value
        dispatch(updateCardTitle(list.cards[editCard.index],e.target.value))
    }

    const handleEditCardDescriptionInput = (e,cardId) => {
        setEditCardDescription(e.target.value)
        list.cards[editCard.index].description = e.target.value
        dispatch(updateCardDescription(list.cards[editCard.index],e.target.value))
    }

    const handleNewCardTitleInput=(e,id)=>{
        if (context.addCardList === -1){
            context.setAddCardList(id)
        }
        context.setNewCardTitle(e.target.value)
        console.log("title: ",context.newCardTitle,"list: ",context.addCardList)
    }

    const Card = ({card,index}) => {
        console.log("card from callback: ",card)
        return (<Draggable key={card.id} draggableId={`${card.id}`} index={index}>
                              {(provided, snapshot) =>{
                                return (
                                  <div
                                  onClick={(e)=>{handleOpenModal(index,card.id)}}
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  style={{
                                    cursor:"pointer",
                                    boxShadow: snapshot.isDragging ? "0px 4px 7px 0px #A4A8A7": "0 1px 0 rgba(9,30,66,.25)",
                                    ...cardStyle,
                                    ...provided.draggableProps.style
                                }}>
                                    <div
                                    // onMouseEnter={(e)=>addHover(e,card.id)} 
                                    // onMouseLeave={(e)=>removeHover(e)} cardid={card.id} 
                                    style={{display:"flex", 
                                    justifyContent:"space-between", flexDirection:"row", alignItems:"center", alignContent:"center"}}>
                                      <div style={{alignSelf:"center", fontSize:"15px"}}>{list.cards[index].title}</div>
                                      <div>
                                          <IconButton size="small">
                                            <EditIcon/>
                                          </IconButton>
                                      </div>
                                    </div>
                                  </div>
                                )
                              }}
                            </Draggable> )
    }
    
    // useEffect(()=>{
    //     console.log("from use effect!")
    //     setCards(cards)
    // },[listCards])

    // const addHover=(e,cardId)=>{
    //     setHoveredCardId(cardId)
    //   }
    //   const removeHover=(e)=>{
    //     setHoveredCardId(null)
    //   }

      const addACard = (e)=>{
        setLoadingNewCard(true)
        e.preventDefault()
        setCardToCreate({title:context.newCardTitle,board_id:context.boardId,description:"",list_id:context.addCardList})
        setNewCard(!newCard)
        context.makeNewCard()
      }

      const selectAddCardList=(e,id)=>{
          context.setAddCardList(id)
          console.log(context.addCardList)
      }

    return (
        <>
        <Droppable droppableId={`${id}`} key={id}>
                  {(provided, snapshot)=>{
                    return(
                      <div style={{display:"flex",flexDirection:"column"}}>
                      <div style={{
                        marginLeft:"8px",
                        marginRight: "8px",
                        marginBottom:0,
                        marginTop:0,
                        fontSize:"16px", 
                        borderTopLeftRadius: "5px",
                        borderTopRightRadius: "5px",
                        maxWidth:272,
                        padding: "4px",
                        background: '#ebecf0',
                        paddingLeft:"18px",
                        fontWeight:"500"
                        }}>{list.title}</div>
                      <div
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      style={{
                        marginLeft:"8px",
                        marginRight: "8px",
                        marginTop: 0,
                        alignItems:"center",
                        marginBottom:0,
                        background: snapshot.isDraggingOver ? '#ebecf0' : '#ebecf0',
                        padding: "8px",
                        width: 272,
                        maxHeight: 490,
                        overflow: "scroll"
                      }}>
                        {Object.values(list.cards).map((card,index)=>{
                          return (
                            <Card card={card} key={card.id} index={index}/>
                          )
                        })}
                        {provided.placeholder}
                        <div>
                            {loadingNewCard ? <div style={{...cardStyle}}></div> : ""}
                        </div>
                      </div>
                      <div style={{
                        marginLeft:"8px",
                        marginRight: "8px",
                        marginTop:0,
                        fontSize:"16px", 
                        borderBottomLeftRadius: "5px",
                        borderBottomRightRadius: "5px",
                        width:272,
                        padding: "9px",
                        paddingTop: "4px",
                        background: '#ebecf0',
                        fontWeight:"500"
                        }}>
                        <form action="/api/lists/add-card" method="POST">
                            <div style={{display: context.addCardList === id ?  "flex" : "none", flexDirection:"column"}}>
                              <div>
                                <div style={{...addCardStyle}}>
                                  <InputBase className={classes.input}
                                    inputProps={{ 'aria-label': '' }}style={{outline: "none", textDecoration: "none", width:"100%"}} placeholder="Enter a title for this card..." type="text" value={context.newCardTitle} onChange={(e)=>handleNewCardTitleInput(e,id)}/>
                                </div>
                                <div style={{display:"flex",justifyContent:"space-between",flexDirection:"row",alignItems:"center"}}>
                                  <div>
                                    {
                                      context.newCardTitle ? <ColorButton onClick={addACard} type="submit">Add Card</ColorButton> :
                                      <ColorButton disabled>Add Card</ColorButton>
                                      }
                                  </div>
                                  <div>
                                    <IconButton>
                                      <CloseIcon></CloseIcon>
                                    </IconButton>
                                  </div>
                                </div>
                              </div>
                            </div>
                            </form>
                            <Button onClick={(e)=>selectAddCardList(e,id)}
                            style={{display: addCardList === id ? "none" : "flex"}}
                            startIcon={<LibraryAddIcon />}
                            fullWidth >add card</Button>
                          </div>
                      </div>
                    )
                  }}
                </Droppable>
                <div>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={titleOpen}
                  onClose={handleTitleModalClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 400,
                  }}
                >
                  <Fade in={titleOpen}>
                      <form style={{outline:"none"}} onSubmit={(e)=>{e.preventDefault()}}>
                    <div className={classes.paper}>
                        <div style={{display: "flex", flexDirection: "row", alignItems:"center", alignContent:"center", justifyContent:"space-between"}}>
                            <div style={{display: "flex", width:"100%", margin:"10px", flexDirection: "row", alignItems:"center", alignContent:"center"}}>
                                <div style={{ color: "#42526e" }}>
                                    <Crop54Icon/>
                                </div>
                                <div style={{ margin: "10px", fontSize:"20px", fontWeight:"600",lineHeight:"20px" }} >
                                <InputBase className={classes.input}
                                    style={{fontSize:"20px", fontWeight:"600", textDecoration: "none", width:"100%"}} type="text" value={editCardTitle} fullWidth onChange={(e)=>handleEditCardTitleInput(e,editCard.id)}/>
                                </div>
                            </div>
                        <IconButton onClick={handleTitleModalClose}>
                            <CloseIcon/>
                        </IconButton>
                        </div>
                    <div style={{ display: "flex", margin:"10px", flexDirection: "row", alignItems:"center" }}>
                    <div style={{ color: "#42526e" }}>
                        <SubjectIcon/>
                    </div>
                    <Typography style={{ fontSize:"16px", fontWeight:"600", marginLeft:"10px"}} className={classes.pos} color="body2">
                        Description:
                    </Typography>
                    </div>
                    {editCard.description || showEditCardDescription ? 
                    <div style={{width:"100%", padding:"4px"}}>
                        <TextField style={{margin:"4px",marginBottom:"8px", fontSize:"14px", textDecoration: "none"}}  variant="outlined" autoFocus={true} multiline rows={4} placeholder={"Enter a description"} fullWidth type="text" value={editCardDescription} onChange={(e)=>handleEditCardDescriptionInput(e,editCard.id)}/>
                    </div>
                     :
                    <div onClick={()=>setShowEditCardDescription(true)} style={{marginLeft:"30px", marginBottom:"14px",...modalDescriptionStyle}}>
                        Add a description...
                    </div> }
                        {showEditCardDescription || editCard.description ? <ModalColorButton style={{margin:"8px"}} onClick={handleTitleModalClose}>Save</ModalColorButton> : ""}
                    </div>
                    </form>
                  </Fade>
                </Modal>
              </div>
            </>
    )
}

export default List;