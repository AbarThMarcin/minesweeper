import { useEffect, useContext, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { CellContext } from '../App'

const Timer = forwardRef((props, ref) => {
   const timer = useRef(0)
   const [timerOnApp, setTimerOnApp] = useState(0)
   const { isRunning, isGameRestarted } = useContext(CellContext)
   useImperativeHandle(ref, () => ({
      resetTimer: () => {
         timer.current = 0
         setTimerOnApp(0)
      },
   }))

   // Turn timer on
   useEffect(() => {
      if (isRunning) {
         const timerInt = setInterval(() => (timer.current += 0.01), 10)
         setTimeout(() => setTimerOnApp(timer.current), 0.01)
         const timerIntOnApp = setInterval(() => setTimerOnApp(timer.current), 1000)
         return () => {
            clearInterval(timerInt)
            clearInterval(timerIntOnApp)
         }
      }
   }, [isRunning, isGameRestarted])

   return (
      <div className="timer bombsLeftTimer">
         {('00' + parseInt(Math.round(timerOnApp))).slice(-3)}
      </div>
   )
})

export default Timer
