import Menu from './Menu'
import Timer from './Timer'
import Restart from './Restart'
import BombsLeft from './BombsLeft'

const Header = ({ bombsLeft, setPredefinedBoard, boardEl, setIsRunning, setSeconds, setFirstClick, setIsGameCompleted, setIsGameLost }) => {
   return (
      <div className="header">
         <div>
            <Menu
               setPredefinedBoard={setPredefinedBoard}
               boardEl={boardEl}
               setIsRunning={setIsRunning}
               setSeconds={setSeconds}
               setFirstClick={setFirstClick}
               setIsGameCompleted={setIsGameCompleted}
               setIsGameLost={setIsGameLost}
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
               setIsGameCompleted={setIsGameCompleted}
               setIsGameLost={setIsGameLost}
            />
         </div>
         <div>
            <Timer />
         </div>
      </div>
   )
}

export default Header
