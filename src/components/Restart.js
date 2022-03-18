import { getCurrentBoardInfo, getTotalRevealedCellsToWin } from '../func/createBoard'

const Restart = ({
   setPredefinedBoard,
   boardEl,
   setIsRunning,
   setSeconds,
   setFirstClick,
   setIsGameCompleted,
   setIsGameLost,
   setRevealedCells,
   setRevealedCellsToWin,
}) => {
   const onClick = () => {
      setPredefinedBoard(getCurrentBoardInfo())
      boardEl.current.classList.remove('unclickable')
      setIsRunning(false)
      setSeconds(0)
      setFirstClick(false)
      setIsGameCompleted(false)
      setIsGameLost(false)
      setRevealedCells(0)
      setRevealedCellsToWin(getTotalRevealedCellsToWin())
   }

   return <button className="btnRestart" onClick={() => onClick()}></button>
}

export default Restart
