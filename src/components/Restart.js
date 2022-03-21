import { useContext } from 'react'
import { getCurrentBoardInfo } from '../func/boardFunctions'
import { CellContext } from '../App'

const Restart = ({ timer }) => {
   const { boardEl, restart } = useContext(CellContext)
   const handleClick = () => {
      restart(getCurrentBoardInfo())
      boardEl.current.classList.remove('unclickable')
      timer.resetTimer()
   }

   return <button className="btnRestart" onClick={handleClick}></button>
}

export default Restart
