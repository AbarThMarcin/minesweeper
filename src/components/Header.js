import Menu from './Menu'
import Timer from './Timer'
import Restart from './Restart'
import BombsLeft from './BombsLeft'
import { useRef } from 'react'

const Header = () => {
   const ref = useRef()
   return (
      <div className="header">
         <div>
            <Menu timer={ref.current} />
         </div>
         <div>
            <BombsLeft />
         </div>
         <div>
            <Restart timer={ref.current} />
         </div>
         <div>
            <Timer ref={ref} />
         </div>
      </div>
   )
}

export default Header
