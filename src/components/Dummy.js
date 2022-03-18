import React, { useEffect } from 'react'
import { getBoardWithAllBombsRevealed } from '../func/createBoard'

const Dummy = ({
   boardTable,
   setBoardTable,
   revealedCells,
   revealedCellsToWin,
   boardEl,
   setIsRunning,
   setIsGameCompleted,
   setBombsLeft,
}) => {
   useEffect(() => {
      if (revealedCells === revealedCellsToWin && revealedCellsToWin !== 0) {
         setBoardTable(getBoardWithAllBombsRevealed(boardTable, 'flag'))
         boardEl.current.classList.add('unclickable')
         setIsRunning(false)
         setIsGameCompleted(true)
         setBombsLeft(0)
      }
   }, [revealedCells, revealedCellsToWin])

   return <></>
}

export default Dummy
