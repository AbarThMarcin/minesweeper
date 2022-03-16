import { useRef } from 'react'

const BEGINNER = [15, 10, 20]
const INTERMEDIATE = [25, 20, 50]
const EXPERT = [40, 30, 150]

const Menu = ({ setPredefinedBoard }) => {
   const menuEl = useRef(null)
   const customEl = useRef(null)

   const expandCollapseMenu = () => {
      menuEl.current.classList.toggle('btnMenu-clicked')
   }

   const expandCollapseCustom = () => {
      customEl.current.classList.toggle('btnPre-clicked')
   }

   return (
      <nav className="nav">
         <button
            ref={menuEl}
            className="btnMenu"
            onClick={() => expandCollapseMenu()}
         >
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
         </button>
         <div className="menu">
            <button
               className="btnPre"
               onClick={() => {
                  expandCollapseMenu()
                  setPredefinedBoard(BEGINNER)
               }}
            >
               BEGINNER
            </button>
            <button
               className="btnPre"
               onClick={() => {
                  expandCollapseMenu()
                  setPredefinedBoard(INTERMEDIATE)
               }}
            >
               INTERMEDIATE
            </button>
            <button
               className="btnPre"
               onClick={() => {
                  expandCollapseMenu()
                  setPredefinedBoard(EXPERT)
               }}
            >
               EXPERT
            </button>
            <button
               ref={customEl}
               className="btnPre"
               onClick={() => expandCollapseCustom()}
            >
               CUSTOM
            </button>
            <div className="custom">
               <div>
                  <label htmlFor="inputX" className="label">
                     X:
                  </label>
                  <input
                     id="inputX"
                     className="input"
                     type="number"
                     min={13}
                     max={100}
                  />
               </div>
               <div>
                  <label htmlFor="inputY" className="label">
                     Y:
                  </label>
                  <input
                     id="inputY"
                     className="input"
                     type="number"
                     min={4}
                     max={100}
                  />
               </div>
               <div>
                  <label htmlFor="inputBombs" className="label">
                     Bombs:
                  </label>
                  <input
                     id="inputBombs"
                     className="input"
                     type="number"
                     min={4}
                     max={400}
                  />
               </div>
               <button className="btnPre">OK</button>
            </div>
         </div>
      </nav>
   )
}

export default Menu
