import './css/app.css'
import Board from './components/Board'
import Header from './components/Header'
import { useState, useEffect, createContext } from 'react'
import {
   createInitBoard,
   getBoardWithAllBombsRevealed,
   getBoardWithRevealedArea,
   createRandomBoard,
} from './func/createBoard'

export const timerContext = createContext(0)
export const setTimerContext = createContext(0)

function App() {
   const [boardTable, setBoardTable] = useState([])
   const [seconds, setSeconds] = useState(0)
   const [score, setScore] = useState(0)
   const [firstClick, setFirstClick] = useState(false)
   const [isRunning, setIsRunning] = useState(false)

   // Create board
   useEffect(() => {
      if (isRunning) {
         const timer = setInterval(() => {
            setSeconds((s) => s + 1)
         }, 1000)
         return () => clearInterval(timer)
      }

      if (!firstClick) setPredefinedBoard()
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
   const setPredefinedBoard = () => {
      setBoardTable(createInitBoard())
   }

   return (
      <div className="app">
         <div className="container">
            <timerContext.Provider value={seconds}>
               <setTimerContext.Provider value={setSeconds}>
                  <Header
                     className="header"
                     score={score}
                     setPredefinedBoard={setPredefinedBoard}
                  />
                  <Board
                     className="board"
                     boardTable={boardTable}
                     showAllBombs={showAllBombs}
                     revealArea={revealArea}
                     createRandomBoard={createRandomBoard}
                     firstClick={firstClick}
                     setFirstClick={setFirstClick}
                     isRunning={setIsRunning}
                     setIsRunning={setIsRunning}
                     score={score}
                     setScore={setScore}
                  />
               </setTimerContext.Provider>
            </timerContext.Provider>
         </div>
      </div>
   )
}

export default App
