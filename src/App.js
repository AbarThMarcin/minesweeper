import './css/app.css'
import Board from './components/Board'
import Header from './components/Header'
import Dummy from './components/Dummy'
import { useState, useEffect, createContext, useRef } from 'react'
import {
   createInitBoard,
   getBoardWithAllBombsRevealed,
   getCurrentBoardInfo,
   getCurrentBombsLeft,
   getRandomBoard,
   getTotalRevealedCellsToWin,
} from './func/createBoard'

export const timerContext = createContext(0)

function App() {
   const [boardTable, setBoardTable] = useState([])
   const [seconds, setSeconds] = useState(0)
   const [bombsLeft, setBombsLeft] = useState(0)
   const [firstClick, setFirstClick] = useState(false)
   const [isRunning, setIsRunning] = useState(false)
   const [mousePressed, setMousePressed] = useState(false)
   const [isGameCompleted, setIsGameCompleted] = useState(false)
   const [isGameLost, setIsGameLost] = useState(false)
   const [revealedCells, setRevealedCells] = useState(0)
   const [revealedCellsToWin, setRevealedCellsToWin] = useState(0)
   const boardEl = useRef(null)

   // Create board
   useEffect(() => {
      if (isRunning) {
         const timer = setInterval(() => {
            setSeconds((s) => s + 1)
         }, 1000)
         return () => clearInterval(timer)
      }

      if (!firstClick) {
         setPredefinedBoard(getCurrentBoardInfo())
         setRevealedCellsToWin(getTotalRevealedCellsToWin)
      }
   }, [isRunning])

   // Show all Bombs function
   const showAllBombs = () => {
      setBoardTable(getBoardWithAllBombsRevealed(boardTable, 'bomb'))
      setIsGameLost(true)
   }

   // Reveal clicked area
   const revealArea = (x, y) => {
      setBoardTable(getBoardWithRevealedArea(boardTable, x, y))
   }
   const getBoardWithRevealedArea = (boardTable, x, y) => {
      boardTable[x][y].neighbors.forEach((nb) => revealNeighbor(boardTable, nb))
      setRevealedCells((v) => v - 1)
      return boardTable
   }
   const revealNeighbor = (boardTable, n) => {
      const neighbor = boardTable[n[0]][n[1]]
      if (!neighbor.revealed) {
         setRevealedCells((v) => v + 1)
      }
      neighbor.flagged = false
      neighbor.revealed = true
      if (neighbor.value !== 0) return
      neighbor.neighbors.forEach((nb) => {
         if (!boardTable[nb[0]][nb[1]].revealed) revealNeighbor(boardTable, nb)
      })
   }

   // Set pre-defined board
   const setPredefinedBoard = (boardLevel) => {
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
               if (updatedCell.revealed) setRevealedCells((v) => v + 1)
            } else {
               col.push(boardTable[x][y])
            }
         }
         tempBoard.push(col)
      }
      setBoardTable(tempBoard)
   }

   const getRevealedCells = () => {
      let count = 0
      for (let x = 0; x < boardTable.length; x++) {
         for (let y = 0; y < boardTable[0].length; y++) {
            if (boardTable[x][y].revealed) count += 1
         }
      }
      return count
   }

   const createRandBoard = (cell) => {
      setBoardTable(getRandomBoard(cell, boardTable))
   }

   return (
      <div
         className="app"
         onMouseDown={() => setMousePressed(true)}
         onMouseUp={() => setMousePressed(false)}
      >
         <div className="container">
            {revealedCells === revealedCellsToWin && !isGameLost && (
               <div className="victory">Victory!</div>
            )}
            <Dummy
               setBoardTable={setBoardTable}
               boardTable={boardTable}
               revealedCells={revealedCells}
               revealedCellsToWin={revealedCellsToWin}
               boardEl={boardEl}
               setIsRunning={setIsRunning}
               setIsGameCompleted={setIsGameCompleted}
               setBombsLeft={setBombsLeft}
            />
            <timerContext.Provider value={{ seconds, setSeconds }}>
               <Header
                  className="header"
                  bombsLeft={bombsLeft}
                  setPredefinedBoard={setPredefinedBoard}
                  boardEl={boardEl}
                  setIsRunning={setIsRunning}
                  setSeconds={setSeconds}
                  setFirstClick={setFirstClick}
                  setIsGameCompleted={setIsGameCompleted}
                  setIsGameLost={setIsGameLost}
                  setRevealedCells={setRevealedCells}
                  setRevealedCellsToWin={setRevealedCellsToWin}
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
                  updateBoard={updateBoard}
                  createRandBoard={createRandBoard}
                  setRevealedCellsToWin={setRevealedCellsToWin}
               />
            </timerContext.Provider>
         </div>
      </div>
   )
}

export default App
