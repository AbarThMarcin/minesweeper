import { useContext } from 'react'
import { timerContext } from '../App'

const Timer = () => {
   const seconds = useContext(timerContext)

   return <div className="timer scoreTimer">{('00' + seconds).slice(-3)}</div>
}

export default Timer
