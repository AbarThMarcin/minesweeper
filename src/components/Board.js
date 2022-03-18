import Cell from './Cell'

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
                        <Cell
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
                           updateBoard={props.updateBoard}
                           createRandBoard={props.createRandBoard}
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
