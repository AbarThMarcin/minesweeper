import { useRef, useContext } from 'react'
import { CellContext } from '../App'

const Cell = ({ cell }) => {
   const cellEl = useRef(null)
   const {
      boardEl,
      setBombsLeft,
      firstClick,
      setFirstClick,
      isRunning,
      setIsRunning,
      mousePressed,
      setIsGameRestarted,
      showAllBombs,
      revealArea,
      updateBoard,
      createRandBoard,
   } = useContext(CellContext)

   const onMouseUp = (e) => {
      // ALWAYS change mousePressed to false when click is finished
      mousePressed.current = false
      // If RIGHT click of mouse, then do nothing
      if (e.nativeEvent.which === 3) return
      // If cell is already FLAGGED and LEFT click of mouse, then do nothing
      if (cell.flagged && e.nativeEvent.which === 1) return
      // If cell is already revealed, then do nothing
      if (cell.revealed) return
      // If the click is first, change firstClick to TRUE, set isRunning to TRUE and recreate board (only new values and neighbors)
      if (!firstClick) {
         setFirstClick(true)
         setIsRunning(true)
         setIsGameRestarted(false)
         createRandBoard(cell)
      }
      // Set cell's revealed to TRUE and update boardTable (component from App)
      if (!cell.revealed) updateBoard({ ...cell, revealed: true })
      // When clicked on a bomb, reveal all bombs, make board unclickable and set isRunning to FALSE
      if (cell.value === 'X') {
         cell.hasBombAndClicked = true
         showAllBombs()
         boardEl.current.classList.add('unclickable')
         setIsRunning(false)
      }
      // Reveal area when clicked on an empty cell
      if (cell.value === 0) {
         revealArea(cell.x, cell.y)
      }
   }

   const onMouseDown = (e) => {
      mousePressed.current = true
      if (cell.revealed) return
      if (cell.flagged && e.nativeEvent.which === 1) return
      if (e.nativeEvent.which === 3) {
         window.oncontextmenu = (e) => {
            if (e.target.className.includes('cell')) return false
         }
         // If the right click is first, change firstClick to TRUE, set isRunning to TRUE and recreate board (only new values and neighbors)
         if (!firstClick) {
            setFirstClick(true)
            setIsRunning(true)
            setIsGameRestarted(false)
            createRandBoard(cell)
         }
         if (cell.flagged) {
            updateBoard({ ...cell, flagged: false })
            cellEl.current.classList.remove('flag')
            setBombsLeft((v) => v + 1)
         } else {
            updateBoard({ ...cell, flagged: true })
            cellEl.current.classList.add('flag')
            setBombsLeft((v) => v - 1)
         }
         return
      }
      cellEl.current.classList.add('revealed')
   }

   const onMouseEnterMove = (e) => {
      if (mousePressed && !cell.flagged && e.nativeEvent.which === 1)
         cellEl.current.classList.add('revealed')
   }

   const onMouseLeave = () => {
      if (mousePressed && !cell.revealed) {
         cellEl.current.classList.remove('revealed')
      }
   }

   return (
      <div
         ref={cellEl}
         className={`
            cell
            col${cell.value}
            ${cell.revealed ? 'revealed' : ''}
            ${cell.flagged ? 'flag' : ''}
            ${cell.value === 'X' && cell.revealed ? 'bomb' : ''}
            ${cell.value !== 'X' && cell.flagged && !isRunning ? 'flagIncorrect' : ''}
            ${cell.hasBombAndClicked ? 'bomb-clicked' : ''}
         `}
         onMouseDown={(e) => onMouseDown(e)}
         onMouseUp={(e) => onMouseUp(e)}
         onMouseEnter={(e) => onMouseEnterMove(e)}
         onMouseMove={(e) => onMouseEnterMove(e)}
         onMouseLeave={() => onMouseLeave()}
      >
         {cell.revealed && cell.value !== 0 && cell.value}
      </div>
   )
}

export default Cell
