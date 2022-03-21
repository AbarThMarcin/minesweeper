import { useState, useRef, useContext, useEffect } from 'react'
import { TEMPLATE_BEGINNER, TEMPLATE_INTERMEDIATE, TEMPLATE_EXPERT } from '../func/boardFunctions'
import { CellContext } from '../App'

const BOMBS_FRACTION = 0.8

const Menu = ({ timer }) => {
   const { boardEl, restart } = useContext(CellContext)
   const [customData, setCustomData] = useState([
      TEMPLATE_BEGINNER[0],
      TEMPLATE_BEGINNER[1],
      TEMPLATE_BEGINNER[2],
   ])
   const [maxBombs, setMaxBombs] = useState(
      Math.floor(BOMBS_FRACTION * parseInt(TEMPLATE_BEGINNER[0]) * parseInt(TEMPLATE_BEGINNER[1]))
   )
   const menuEl = useRef(null)
   const customEl = useRef(null)
   const inputXEl = useRef(null)
   const inputYEl = useRef(null)
   const inputBombsEl = useRef(null)

   useEffect(() => {
      onInput(inputXEl.current)
      onInput(inputYEl.current)
      onInput(inputBombsEl.current)
      if (customData[2] > maxBombs) setCustomData([customData[0], customData[1], maxBombs])
   }, [maxBombs])

   const calcMaxBombs = (x, y) => {
      return Math.floor(BOMBS_FRACTION * parseInt(x) * parseInt(y))
   }

   const expandCollapseMenu = () => {
      menuEl.current.classList.toggle('btnMenu-clicked')
   }

   const expandCollapseCustom = () => {
      customEl.current.classList.toggle('btnPre-clicked')
   }

   const onClick = (gameLevel) => {
      setCustomData(gameLevel)
      restart(gameLevel)
      timer.resetTimer()
      boardEl.current.classList.remove('unclickable')
      menuEl.current.classList.toggle('btnMenu-clicked')
   }

   const onChangeX = (input) => {
      setMaxBombs(calcMaxBombs(input.value, inputYEl.current.value))
      let tempData = [parseInt(input.value), customData[1], customData[2]]
      if (tempData[2] > maxBombs) tempData[2] = maxBombs
      setCustomData(tempData)
   }
   const onChangeY = (input) => {
      setMaxBombs(calcMaxBombs(inputXEl.current.value, input.value))
      let tempData = [customData[0], parseInt(input.value), customData[2]]
      if (tempData[2] > maxBombs) tempData[2] = maxBombs
      setCustomData(tempData)
   }
   const onChangeBombs = (input) => {
      onInput(inputBombsEl.current)
      setCustomData([customData[0], customData[1], parseInt(input.value)])
   }
   const onInput = (input) => {
      const val = parseInt(input.value) | ''
      const min = parseInt(input.min)
      const max = calcMaxBombs(inputXEl.current.value, inputYEl.current.value)
      if (val === '' || val < min) {
         input.value = input.min
         return
      }
      if (val > max) input.value = input.max
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
                     onInput={(e) => onChangeX(e.target)}
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
                     onInput={(e) => onChangeY(e.target)}
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
                     max={maxBombs}
                     value={customData[2]}
                     onInput={(e) => onChangeBombs(e.target)}
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
