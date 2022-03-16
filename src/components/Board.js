import { useState, useRef } from 'react'
import Field from './Field'

const Board = ({
   boardTable,
   showAllBombs,
   revealArea,
   createRandomBoard,
   firstClick,
   setFirstClick,
   isRunning,
   setIsRunning,
   score,
   setScore,
}) => {
   const [mousePressed, setMousePressed] = useState(false)
   const boardEl = useRef(null)

   return (
      <div ref={boardEl} className="board">
         {boardTable.map((col, id) => {
            return (
               <div
                  key={id}
                  style={{ display: 'flex', flexDirection: 'column' }}
               >
                  {col.map((cell) => {
                     return (
                        <Field
                           key={`${cell.x},${cell.y}`}
                           cell={cell}
                           mousePressed={mousePressed}
                           setMousePressed={setMousePressed}
                           showAllBombs={showAllBombs}
                           boardEl={boardEl}
                           revealArea={revealArea}
                           createRandomBoard={createRandomBoard}
                           firstClick={firstClick}
                           setFirstClick={setFirstClick}
                           isRunning={isRunning}
                           setIsRunning={setIsRunning}
                           score={score}
                           setScore={setScore}
                        />
                     )
                  })}
               </div>
            )
         })}
      </div>
   )
}

export default Board
