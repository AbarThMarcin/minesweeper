import { useRef } from 'react'

const Cell = (props) => {
   const cellEl = useRef(null)

   const onMouseUp = (e) => {
      // ALWAYS change mousePressed to false when click is finished
      props.setMousePressed(false)
      // If RIGHT click of mouse, then do nothing
      if (e.nativeEvent.which === 3) return
      // If cell is already FLAGGED and LEFT click of mouse, then do nothing
      if (props.cell.flagged && e.nativeEvent.which === 1) return
      // If cell is already revealed, then do nothing
      if (props.cell.revealed) return
      // If the click is first, change firstClick to TRUE, set isRunning to TRUE and recreate board (only new values and neighbors)
      if (!props.firstClick) {
         props.setFirstClick(true)
         props.setIsRunning(true)
         props.createRandBoard(props.cell)
      }
      // Set cell's revealed to TRUE and update boardTable (component from App)
      if (!props.cell.revealed) props.updateBoard({ ...props.cell, revealed: true })
      // When clicked on a bomb, reveal all bombs, make board unclickable and set isRunning to FALSE
      if (props.cell.value === 'X') {
         props.cell.hasBombAndClicked = true
         props.showAllBombs()
         props.boardEl.current.classList.add('unclickable')
         props.setIsRunning(false)
      }
      // Reveal area when clicked on an empty cell
      if (props.cell.value === 0) {
         props.revealArea(props.cell.x, props.cell.y)
      }
   }

   const onMouseDown = (e) => {
      props.setMousePressed(true)
      if (props.cell.revealed) return
      if (props.cell.flagged && e.nativeEvent.which === 1) return
      if (e.nativeEvent.which === 3) {
         window.oncontextmenu = (e) => {
            if (e.target.className.includes('cell')) return false
         }
         // If the right click is first, change firstClick to TRUE, set isRunning to TRUE and recreate board (only new values and neighbors)
         if (!props.firstClick) {
            props.setFirstClick(true)
            props.setIsRunning(true)
            props.createRandBoard(props.cell)
         }
         if (props.cell.flagged) {
            props.updateBoard({ ...props.cell, flagged: false })
            cellEl.current.classList.remove('flag')
            props.setBombsLeft((v) => v + 1)
         } else {
            props.updateBoard({ ...props.cell, flagged: true })
            cellEl.current.classList.add('flag')
            props.setBombsLeft((v) => v - 1)
         }
         return
      }
      cellEl.current.classList.add('revealed')
   }

   const onMouseEnterMove = (e) => {
      if (props.mousePressed && !props.cell.flagged && e.nativeEvent.which === 1) cellEl.current.classList.add('revealed')
   }

   const onMouseLeave = () => {
      if (props.mousePressed && !props.cell.revealed) {
         cellEl.current.classList.remove('revealed')
      }
   }

   return (
      <div
         ref={cellEl}
         className={`
            cell
            col${props.cell.value}
            ${props.cell.revealed ? 'revealed' : ''}
            ${props.cell.flagged ? 'flag' : ''}
            ${props.cell.value === 'X' && props.cell.revealed ? 'bomb' : ''}
            ${props.cell.value !== 'X' && props.cell.flagged && !props.isRunning ? 'flagIncorrect' : ''}
            ${props.cell.hasBombAndClicked ? 'bomb-clicked' : ''}
            `}
         onMouseDown={(e) => onMouseDown(e)}
         onMouseUp={(e) => onMouseUp(e)}
         onMouseEnter={(e) => onMouseEnterMove(e)}
         onMouseMove={(e) => onMouseEnterMove(e)}
         onMouseLeave={() => onMouseLeave()}
      >
         {props.cell.revealed && props.cell.value !== 0 && props.cell.value}
      </div>
   )
}

export default Cell
