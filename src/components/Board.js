import Field from './Field'

const Board = (props) => {

   return (
      <div ref={props.boardEl} className="board">
         {props.boardTable.map((col, id) => {
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
                           boardTable={props.boardTable}
                           mousePressed={props.mousePressed}
                           setMousePressed={props.setMousePressed}
                           boardEl={props.boardEl}
                           firstClick={props.firstClick}
                           setFirstClick={props.setFirstClick}
                           isRunning={props.isRunning}
                           setIsRunning={props.setIsRunning}
                           setBombsLeft={props.setBombsLeft}
                           showAllBombs={props.showAllBombs}
                           revealArea={props.revealArea}
                           isGameCompleted={props.isGameCompleted}
                           updateBoard={props.updateBoard}
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
