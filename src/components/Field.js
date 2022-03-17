import { useState, useRef, useEffect } from 'react'
import { createRandomBoard } from '../func/createBoard'

const Field = (props) => {
   const [info, setInfo] = useState(props.cell)
   const cellEl = useRef(null)

   const onMouseUp = (e) => {
      // ALWAYS change mousePressed to false when click is finished
      props.setMousePressed(false)
      // If RIGHT click of mouse, then do nothing
      if (e.nativeEvent.which === 3) return
      // If cell is already FLAGGED and LEFT click of mouse, then do nothing
      if (info.flagged && e.nativeEvent.which === 1) return
      // If the click is first, change firstClick to TRUE, set isRunning to TRUE and recreate board (only new values and neighbors)
      if (!props.firstClick) {
         props.setFirstClick(true)
         props.setIsRunning(true)
         createRandomBoard(info.x, info.y, props.boardTable)
      }
      // Set cell's revealed to TRUE and update boardTable (component from App)
      setInfo({...info, revealed: true})
      props.updateBoard(info)
      // When clicked on a bomb, reveal all bombs,make board unclickable and set isRunning to FALSE
      if (info.value === 'X') {
         props.showAllBombs()
         props.boardEl.current.classList.add('unclickable')
         props.setIsRunning(false)
      }
      // Reveal area when clicked on an empty field
      if (info.value === 0) {
         props.revealArea(info.x, info.y)
      }
      
   }

   const onMouseDown = (e) => {
      props.setMousePressed(true)
      if (info.revealed) return
      if (info.flagged && e.nativeEvent.which === 1) return
      if (e.nativeEvent.which === 3) {
         window.oncontextmenu = (e) => {
            if (e.target.className.includes('field')) return false
         }
         if (info.flagged) {
            // info.flagged = false
            setInfo({ ...info, flagged: false })
            cellEl.current.classList.remove('flag')
            props.setBombsLeft((v) => v + 1)
         } else {
            setInfo({ ...info, flagged: true })
            cellEl.current.classList.add('flag')
            props.setBombsLeft((v) => v - 1)
         }
         props.setIsRunning(true)
         return
      }
      cellEl.current.classList.add('revealed')
   }

   const onMouseEnterMove = (e) => {
      if (props.mousePressed && !info.flagged && e.nativeEvent.which === 1) cellEl.current.classList.add('revealed')
   }

   const onMouseLeave = () => {
      if (props.mousePressed && !info.revealed) {
         cellEl.current.classList.remove('revealed')
      }
   }

   useEffect(() => {
      setInfo(props.cell)
      if (info.value === 'X' && info.revealed) cellEl.current.classList.add('bomb-clicked')

   }, [props.cell])

   return (
      <div
         ref={cellEl}
         className={`
            field
            ${info.revealed ? 'revealed' : ''}
            col${info.value}
            ${info.value === 'X' && info.revealed ? 'bomb' : ''}
            ${info.value !== 'X' && info.flagged && !props.isRunning ? 'flagIncorrect' : ''}
            ${info.flagged ? 'flag' : ''}
         `}
         onMouseDown={(e) => onMouseDown(e)}
         onMouseUp={(e) => onMouseUp(e)}
         onMouseEnter={(e) => onMouseEnterMove(e)}
         onMouseMove={(e) => onMouseEnterMove(e)}
         onMouseLeave={() => onMouseLeave()}
      >
         {info.revealed && info.value !== 0 && info.value}
      </div>
   )
}

export default Field
