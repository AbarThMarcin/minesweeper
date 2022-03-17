import { getCurrentBoardInfo } from '../func/createBoard'

const Restart = ({ setPredefinedBoard, boardEl, setIsRunning, setSeconds, setFirstClick }) => {
   const onClick = () => {
      setPredefinedBoard(getCurrentBoardInfo())
      boardEl.current.classList.remove('unclickable')
      setIsRunning(false)
      setSeconds(0)
      setFirstClick(false)
   }

   return <button className="btnRestart" onClick={() => onClick()}></button>
}

export default Restart
