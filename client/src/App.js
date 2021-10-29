import './App.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'
import Menu from './components/Modal';
import Board from './minmax classes/Board';
import Player from './minmax classes/Player';

const App=()=> {

  const [field, setField] = useState(['','','','','','','','',''])
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [lastPlayer, setLastPlayer] = useState('O')
  const [gameActive, setGameActive] = useState(false)
  const [singlePlayer, setPlayers] = useState(false)
  const [gameStatus, setGameStatus]= useState('onGoing')
  const [hardMode, setHardMode] = useState(false)

  const winCombos = [
    [0, 1, 2],          // HORIZONTAL WINS
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],          // VERTICAL WINS
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],          // DIAGONAL WINS
    [2, 4, 6]
  ]
  
  const hadleTurn=(e) =>{
    if(gameActive){
      if(!e.target.innerHTML){
        field.splice(e.target.id, 1, currentPlayer)
        setField(field)
        checkWin()
        if(currentPlayer === 'X'){
          setCurrentPlayer('O')
        }else if(currentPlayer==='O'){
          setCurrentPlayer('X')
        }
      }
    }
  }

  const restart = ()=>{
    setField(['','','','','','','','',''])
    setCurrentPlayer('X')
    setGameActive(false)
    setGameStatus('onGoing')
  }

  const checkWin = ()=>{
    winCombos.forEach((el,i)=>{
      let winningRow = winCombos[i]
      let play1 = field[winningRow[0]]
      let play2 = field[winningRow[1]]
      let play3 = field[winningRow[2]]
      if(play1 !== '' && play1===play2 && play2 === play3){
          setGameActive(false)
          setGameStatus('Won')
          return
      }
      if(!field.includes('')){
        setGameStatus('tie')
        return
      }else{
        if(currentPlayer === 'X'){
          setCurrentPlayer('O')
          setLastPlayer('X')
        }else if(currentPlayer==='O'){
          setCurrentPlayer('X')
          setLastPlayer('O')
        }
      }
    })
  }

  const easyCPU = ()=>{

    if(field.includes('') && gameStatus !== 'Won'){
      let num = getNum()

      field.splice(num, 1, currentPlayer)
      setTimeout(()=>setField(field),2000)
        
      checkWin()
    }
  }

  const hardCPU = async()=>{
        let board = new Board(field);
        let p = new Player();
        let move = await p.getBestMove(board)
        field.splice(move, 1, currentPlayer)
        setField(field)
        checkWin()
  }

  const getNum = ()=>{

    let num = Math.floor(Math.random()* (9 - 0) + 0)
    if(field[num].includes('X') || field[num].includes('O')){
      num = getNum()
    }

    return num
  }

  useEffect(()=>{
    if(singlePlayer && currentPlayer === 'O'){
      if(hardMode && gameActive){
        hardCPU()
      }else if(!hardMode){
        easyCPU()
      }
      
    }
  },[field, currentPlayer])

  return (
    <div className="App">
      <br/>
      {gameActive ? <h4>it's {currentPlayer} turn</h4> : <></>}
      {gameStatus === 'Won' ? <h4>Player {lastPlayer} has won</h4> : <></>}
      {!gameActive && gameStatus !== 'Won' ? <h4>Waiting for game to start</h4> : <></>}
      {gameStatus === 'Tie' ? <h4>It's a tie</h4> : <></>}


      <section style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', width:'300px'}}>
        {field.map((e, i)=><div id={i} onClick={(e)=>hadleTurn(e)} style={{height:'100px', width:'100px', border:'1px solid black', fontSize:'50px', display:'flex', justifyContent:'center', alignItems:'center'}} className='box'  key={i}>{e}</div>)}
      </section>
      <section style={{display:'flex', flexDirection:'row'}}>
        <Menu setHardMode={setHardMode} setGameActive={setGameActive} setPlayers={setPlayers} />
        {gameStatus === 'Won' || gameStatus === 'tie' ? <Button style={{marginTop:'5%', marginLeft:'2%'}} variant="dark" onClick={()=>restart()}>Restart</Button> : <></>}
      </section>
    </div>
  );
}

export default App;
