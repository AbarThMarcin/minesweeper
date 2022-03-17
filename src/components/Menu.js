import { useState, useRef } from 'react'
import { TEMPLATE_BEGINNER, TEMPLATE_INTERMEDIATE, TEMPLATE_EXPERT } from '../func/createBoard'

const Menu = ({ setPredefinedBoard, boardEl, setIsRunning, setSeconds, setFirstClick }) => {
   const [customData, setCustomData] = useState([TEMPLATE_BEGINNER[0], TEMPLATE_BEGINNER[1], TEMPLATE_BEGINNER[2]])
   const menuEl = useRef(null)
   const customEl = useRef(null)
   const inputXEl = useRef(null)
   const inputYEl = useRef(null)
   const inputBombsEl = useRef(null)

   const expandCollapseMenu = () => {
      menuEl.current.classList.toggle('btnMenu-clicked')
   }

   const expandCollapseCustom = () => {
      customEl.current.classList.toggle('btnPre-clicked')
   }

   const onClick = (gameLevel) => {
      setPredefinedBoard(gameLevel)
      boardEl.current.classList.remove('unclickable')
      setIsRunning(false)
      setSeconds(0)
      setFirstClick(false)
      menuEl.current.classList.toggle('btnMenu-clicked')
      setCustomData(gameLevel)
   }

   const onChangeX = (e) => {
      setCustomData([e.target.value, customData[1], customData[2]])
   }
   const onChangeY = (e) => {
      setCustomData([customData[0], e.target.value, customData[2]])
   }
   const onChangeBombs = (e) => {
      setCustomData([customData[0], customData[1], e.target.value])
   }
   const onInput = (e) => {
      const val = parseInt(e.target.value) | ''
      const min = parseInt(e.target.min)
      const max = parseInt(e.target.max)
      if (val === '' || val < min) {
         e.target.value = e.target.min
         return
      }
      if (val > max) e.target.value = e.target.max
   }

   return (
      <nav className="nav">
         <button ref={menuEl} className="btnMenu" onClick={expandCollapseMenu}>
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
         </button>
         <div className="menu">
            <button className="btnPre" onClick={() => onClick(TEMPLATE_BEGINNER)}>
               BEGINNER
            </button>
            <button className="btnPre" onClick={() => onClick(TEMPLATE_INTERMEDIATE)}>
               INTERMEDIATE
            </button>
            <button className="btnPre" onClick={() => onClick(TEMPLATE_EXPERT)}>
               EXPERT
            </button>
            <button ref={customEl} className="btnPre" onClick={expandCollapseCustom}>
               CUSTOM
            </button>
            <div className="custom">
               <div>
                  <label htmlFor="inputX" className="label">
                     X:
                  </label>
                  <input
                     ref={inputXEl}
                     id="inputX"
                     className="input"
                     type="number"
                     min={9}
                     max={50}
                     value={customData[0]}
                     onChange={(e) => onChangeX(e)}
                     onInput={(e) => onInput(e)}
                     required
                  />
               </div>
               <div>
                  <label htmlFor="inputY" className="label">
                     Y:
                  </label>
                  <input
                     ref={inputYEl}
                     id="inputY"
                     className="input"
                     type="number"
                     min={4}
                     max={30}
                     value={customData[1]}
                     onChange={(e) => onChangeY(e)}
                     onInput={(e) => onInput(e)}
                     required
                  />
               </div>
               <div>
                  <label htmlFor="inputBombs" className="label">
                     Bombs:
                  </label>
                  <input
                     ref={inputBombsEl}
                     id="inputBombs"
                     className="input"
                     type="number"
                     min={1}
                     max={Math.floor(0.9 * customData[0] * customData[1])}
                     value={customData[2]}
                     onChange={(e) => onChangeBombs(e)}
                     onInput={(e) => onInput(e)}
                     required
                  />
               </div>
               <button className="btnPre" onClick={() => onClick(customData)}>
                  OK
               </button>
            </div>
         </div>
      </nav>
   )
}

export default Menu
