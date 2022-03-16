import Menu from './Menu'
import Timer from './Timer'
import Restart from './Restart'
import Score from './Score'

const Header = ({ score, setPredefinedBoard }) => {
   return (
      <div className="header">
         <div>
            <Menu setPredefinedBoard={setPredefinedBoard} />
         </div>
         <div>
            <Score score={score} />
         </div>
         <div>
            <Restart setPredefinedBoard={setPredefinedBoard} />
         </div>
         <div>
            <Timer />
         </div>
      </div>
   )
}

export default Header
