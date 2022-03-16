import { useState, useRef, useEffect, useContext } from 'react'
import { setTimerContext } from '../App'

const Field = ({
   cell,
   mousePressed,
   setMousePressed,
   showAllBombs,
   boardEl,
   revealArea,
   createRandomBoard,
   firstClick,
   setFirstClick,
   isRunning,
   setIsRunning,
   score,
   setScore,
}) => {
   const [info, setInfo] = useState(cell)
   const setSeconds = useContext(setTimerContext)
   const cellEl = useRef(null)

   const onClick = () => {
      if (!firstClick) {
         setFirstClick(true)
         setIsRunning(true)
         createRandomBoard(info.x, info.y)
      }
      setInfo({ ...info, revealed: true })
      setMousePressed(false)
      // Reveal all bombs and make board unclickable
      if (info.value === 'X') {
         showAllBombs()
         boardEl.current.classList.add('unclickable')
         setIsRunning(false)
      }
      // Reveal area when clicked on an empty field
      if (info.value === 0) {
         revealArea(info.x, info.y)
      }
   }

   const onMouseDown = () => {
      setMousePressed(true)
      cellEl.current.classList.add('revealed')
   }

   const onMouseEnterMove = () => {
      if (mousePressed) cellEl.current.classList.add('revealed')
   }

   const onMouseLeave = () => {
      if (mousePressed && !info.revealed) {
         cellEl.current.classList.remove('revealed')
      }
   }

   useEffect(() => {
      setInfo(cell)
      if (info.value === 'X' && info.revealed)
         cellEl.current.classList.add('bomb-clicked')
   }, [cell])

   return (
      <div
         ref={cellEl}
         className={`field
            ${info.revealed ? 'revealed' : ''}
            col${info.value}
            ${info.value === 'X' && info.revealed ? 'bomb' : ''}
         `}
         onMouseDown={() => onMouseDown()}
         onMouseUp={() => onClick()}
         onMouseEnter={() => onMouseEnterMove()}
         onMouseMove={() => onMouseEnterMove()}
         onMouseLeave={() => onMouseLeave()}
      >
         {info.revealed && info.value !== 0 && info.value}
      </div>
   )
}

export default Field
