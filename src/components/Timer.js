import { useContext } from 'react'
import { timerContext } from '../App'

const Timer = () => {
   const { seconds, setSeconds } = useContext(timerContext)

   return <div className="timer bombsLeftTimer">{('00' + seconds).slice(-3)}</div>
}

export default Timer
