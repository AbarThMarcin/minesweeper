import { useContext } from 'react'
import { CellContext } from '../App'

const BombsLeft = () => {
   const { bombsLeft } = useContext(CellContext)

   return (
      <div className="bombsLeft bombsLeftTimer">
         {bombsLeft >= 0 ? ('00' + bombsLeft).slice(-3) : (' ' + bombsLeft).slice(-3)}
      </div>
   )
}

export default BombsLeft
