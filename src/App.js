import './css/app.css'
import Board from './components/Board'
import Header from './components/Header'
import Victory from './components/Victory'
import { useState, useEffect, createContext, useRef } from 'react'
import {
   createInitBoard,
   getBoardRevealed,
   getCurrentBoardInfo,
   getCurrentBombsLeft,
   getRandomBoard,
   getCurrentGoal,
} from './func/boardFunctions'
import Footer from './components/Footer'

export const TimerContext = createContext(0)
export const CellContext = createContext(0)

function App() {
   const [boardTable, setBoardTable] = useState([])
   const [bombsLeft, setBombsLeft] = useState(0)
   const [firstClick, setFirstClick] = useState(false)
   const [isRunning, setIsRunning] = useState(false)
   const mousePressed = useRef(false)
   const [isGameLost, setIsGameLost] = useState(false)
   const [isGameRestarted, setIsGameRestarted] = useState(true)
   const [score, setScore] = useState(0)
   const [goal, setGoal] = useState(0)
   const boardEl = useRef(null)
   
   // Create board
   useEffect(() => {
      // Check if game is finished
      if (score === goal && goal !== 0) {
         setBoardTable(getBoardRevealed(boardTable, 'flag'))
         boardEl.current.classList.add('unclickable')
         setIsRunning(false)
         setBombsLeft(0)
      }
      // Create bombs
      if (!firstClick) {
         fillBoardWithBombs(getCurrentBoardInfo())
         setGoal(getCurrentGoal)
      }
   }, [isRunning, score])

   // Show all Bombs function
   const showAllBombs = () => {
      setBoardTable(getBoardRevealed(boardTable, 'bomb'))
      setIsGameLost(true)
   }

   // Reveal clicked area
   const revealArea = (x, y) => {
      setBoardTable(getBoardWithRevealedArea(boardTable, x, y))
   }
   const getBoardWithRevealedArea = (boardTable, x, y) => {
      boardTable[x][y].neighbors.forEach((nb) => revealNeighbor(boardTable, nb))
      setScore((v) => v - 1)
      return boardTable
   }
   const revealNeighbor = (boardTable, n) => {
      const neighbor = boardTable[n[0]][n[1]]
      if (!neighbor.revealed) setScore((v) => v + 1)
      neighbor.flagged = false
      neighbor.revealed = true
      if (neighbor.value !== 0) return
      neighbor.neighbors.forEach((nb) => {
         if (!boardTable[nb[0]][nb[1]].revealed) revealNeighbor(boardTable, nb)
      })
   }

   // Set pre-defined board
   const fillBoardWithBombs = (boardLevel) => {
      setBoardTable(createInitBoard(boardLevel))
      setBombsLeft(+getCurrentBombsLeft())
   }

   const updateBoard = (updatedCell) => {
      let tempBoard = []
      for (let x = 0; x < boardTable.length; x++) {
         let col = []
         for (let y = 0; y < boardTable[0].length; y++) {
            if (updatedCell.x === x && updatedCell.y === y) {
               col.push(updatedCell)
               if (updatedCell.revealed) setScore((v) => v + 1)
            } else {
               col.push(boardTable[x][y])
            }
         }
         tempBoard.push(col)
      }
      setBoardTable(tempBoard)
   }

   const restart = (gameLevel) => {
      fillBoardWithBombs(gameLevel)
      setIsRunning(false)
      setFirstClick(false)
      setIsGameLost(false)
      setIsGameRestarted(true)
      setScore(0)
      setGoal(getCurrentGoal())
   }

   const createRandBoard = (cell) => {
      setBoardTable(getRandomBoard(cell, boardTable))
   }

   return (
      <div className="app">
         <div className="container">
            {score === goal && !isGameLost && <Victory />}
            <CellContext.Provider
               value={{
                  boardEl,
                  boardTable,
                  bombsLeft,
                  setBombsLeft,
                  restart,
                  firstClick,
                  setFirstClick,
                  isRunning,
                  setIsRunning,
                  mousePressed,
                  isGameRestarted,
                  setIsGameRestarted,
                  showAllBombs,
                  revealArea,
                  updateBoard,
                  createRandBoard,
               }}
            >
               <Header className="header" />
               <Board className="board" />
            </CellContext.Provider>
         </div>
         <Footer />
      </div>
   )
}

export default App
