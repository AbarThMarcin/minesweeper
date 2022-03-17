import './css/app.css'
import Board from './components/Board'
import Header from './components/Header'
import { useState, useEffect, createContext, useRef } from 'react'
import {
   createInitBoard,
   getBoardWithAllBombsRevealed,
   getBoardWithRevealedArea,
   getCurrentBoardInfo,
   getCurrentBombsLeft,
} from './func/createBoard'

export const timerContext = createContext(0)

function App() {
   const [boardTable, setBoardTable] = useState([])
   const [seconds, setSeconds] = useState(0)
   const [bombsLeft, setBombsLeft] = useState(0)
   const [firstClick, setFirstClick] = useState(false)
   const [isRunning, setIsRunning] = useState(false)
   const [mousePressed, setMousePressed] = useState(false)
   const boardEl = useRef(null)

   // Create board
   useEffect(() => {
      if (isRunning) {
         const timer = setInterval(() => {
            setSeconds((s) => s + 1)
         }, 1000)
         return () => clearInterval(timer)
      }

      if (!firstClick) setPredefinedBoard(getCurrentBoardInfo())

      // // Check if game is completed (if number of bombs left is 0)
      // if (isGameCompleted()) {
      //    showAllBombs()
      //    boardEl.current.classList.add('unclickable')
      //    setIsRunning(false)
      //    alert('Success!')
      // }
      
   }, [isRunning])

   // Show all Bombs function
   const showAllBombs = () => {
      setBoardTable(getBoardWithAllBombsRevealed(boardTable))
   }

   // Reveal clicked area
   const revealArea = (x, y) => {
      setBoardTable(getBoardWithRevealedArea(boardTable, x, y))
   }

   // Set pre-defined board
   const setPredefinedBoard = (boardLevel) => {
      setBoardTable(createInitBoard(boardLevel))
      setBombsLeft(getCurrentBombsLeft())
   }

   // Check if game is completed
   const isGameCompleted = () => {
      let unrevealedCells = 0
      let numOfBombs = getCurrentBoardInfo()[2]
      for (let x = 0; x < boardTable.length; x++) {
         for (let y = 0; y < boardTable[0].length; y++) {
            if (!boardTable[x][y].revealed) unrevealedCells += 1
         }
      }
      console.log(parseInt(unrevealedCells), parseInt(numOfBombs))
      return parseInt(unrevealedCells) === parseInt(numOfBombs)
   }

   const updateBoard = (updatedCell) => {
      let tempBoard = []
      for (let x = 0; x < boardTable.length; x++) {
         let col = []
         for (let y = 0; y < boardTable[0].length; y++) {
            if (updatedCell.x === x && updatedCell.y === y) {
               col.push(updatedCell)
            } else {
               col.push(boardTable[x][y])
            }
         }
         tempBoard.push(col)
      }
      setBoardTable(tempBoard)
   }

   return (
      <div className="app" onMouseDown={() => setMousePressed(true)} onMouseUp={() => setMousePressed(false)}>
         <div className="container">
            <timerContext.Provider value={{ seconds, setSeconds }}>
               <Header
                  className="header"
                  bombsLeft={bombsLeft}
                  setPredefinedBoard={setPredefinedBoard}
                  boardEl={boardEl}
                  setIsRunning={setIsRunning}
                  setSeconds={setSeconds}
                  setFirstClick={setFirstClick}
               />
               <Board
                  className="board"
                  boardTable={boardTable}
                  firstClick={firstClick}
                  setFirstClick={setFirstClick}
                  isRunning={isRunning}
                  setIsRunning={setIsRunning}
                  bombsLeft={bombsLeft}
                  setBombsLeft={setBombsLeft}
                  mousePressed={mousePressed}
                  setMousePressed={setMousePressed}
                  boardEl={boardEl}
                  showAllBombs={showAllBombs}
                  revealArea={revealArea}
                  isGameCompleted={isGameCompleted}
                  updateBoard={updateBoard}
               />
            </timerContext.Provider>
         </div>
      </div>
   )
}

export default App
