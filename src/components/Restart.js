import { getCurrentBoardInfo } from '../func/createBoard'

const Restart = ({ setPredefinedBoard, boardEl, setIsRunning, setSeconds, setFirstClick, setIsGameCompleted, setIsGameLost }) => {
   const onClick = () => {
      setPredefinedBoard(getCurrentBoardInfo())
      boardEl.current.classList.remove('unclickable')
      setIsRunning(false)
      setSeconds(0)
      setFirstClick(false)
      setIsGameCompleted(false)
      setIsGameLost(false)
   }

   return <button className="btnRestart" onClick={() => onClick()}></button>
}

export default Restart
