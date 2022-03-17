import Menu from './Menu'
import Timer from './Timer'
import Restart from './Restart'
import BombsLeft from './BombsLeft'

const Header = ({ bombsLeft, setPredefinedBoard, boardEl, setIsRunning, setSeconds, setFirstClick }) => {
   return (
      <div className="header">
         <div>
            <Menu
               setPredefinedBoard={setPredefinedBoard}
               boardEl={boardEl}
               setIsRunning={setIsRunning}
               setSeconds={setSeconds}
               setFirstClick={setFirstClick}
            />
         </div>
         <div>
            <BombsLeft bombsLeft={bombsLeft} />
         </div>
         <div>
            <Restart
               setPredefinedBoard={setPredefinedBoard}
               boardEl={boardEl}
               setIsRunning={setIsRunning}
               setSeconds={setSeconds}
               setFirstClick={setFirstClick}
            />
         </div>
         <div>
            <Timer />
         </div>
      </div>
   )
}

export default Header
