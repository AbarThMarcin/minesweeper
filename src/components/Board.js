import { useContext } from 'react'
import { CellContext } from '../App'
import Cell from './Cell'

const Board = (props) => {
   const { boardEl, boardTable } = useContext(CellContext)
   const style = {
      display: 'flex',
      flexDirection: 'column',
   }

   return (
      <div ref={boardEl} className="board">
         {boardTable.map((col, id) => {
            return (
               <div key={id} style={style}>
                  {col.map((cell) => {
                     return <Cell key={`${cell.x},${cell.y}`} cell={cell} />
                  })}
               </div>
            )
         })}
      </div>
   )
}

export default Board
