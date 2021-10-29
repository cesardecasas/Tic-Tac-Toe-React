import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState} from 'react'


const Menu=({setPlayers, setGameActive, setHardMode})=> {
    const [show, setShow] = useState(false);
    const [difficulty, setDifficulty] = useState(false)
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const select =(op)=>{
      if(!op){
        setGameActive(true)
        setPlayers(op)
        handleClose()
      }else if(op){
        setDifficulty(true)
      }
    }

    const selectDifficulty=(op)=>{
      setHardMode(op)
      setGameActive(true)
      setDifficulty(false)
      setPlayers(true)
      handleClose()
    }

  
    return (
      <>
        <Button style={{marginTop:'5%'}} variant="dark" onClick={handleShow}>
          Start Game
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Mode Selection</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{display:'flex', justifyContent:'center'}}>
            {difficulty ? 
            <div style={{display:'flex', flexDirection:'row'}}>
              <Button variant="dark" style={{margin:'1%'}} onClick={()=>selectDifficulty(true)}>
            Hard Mode
            </Button>
            <Button variant="dark" style={{margin:'1%'}} onClick={()=>selectDifficulty(false)}>
            Easy Mode
            </Button>
            </div>:
            <div style={{display:'flex', flexDirection:'row'}}>
            <Button variant="dark" style={{margin:'1%'}} onClick={()=>select(true)}>
            Single Player
            </Button>
            <Button variant="dark" style={{margin:'1%'}} onClick={()=>select(false)}>
            Versus Mode
            </Button>
          </div>
            }
            
          </Modal.Body>
        </Modal>
      </>
    );
  }

export default Menu