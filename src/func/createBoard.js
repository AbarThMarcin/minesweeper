export const TEMPLATE_BEGINNER = [9, 9, 10]
export const TEMPLATE_INTERMEDIATE = [16, 16, 40]
export const TEMPLATE_EXPERT = [30, 16, 99]

var CURRENT_BOARD = [TEMPLATE_BEGINNER[0], TEMPLATE_BEGINNER[1], TEMPLATE_BEGINNER[2]]
var CURRENT_BOMBS_LEFT = TEMPLATE_BEGINNER[2]

var board = []

export const createInitBoard = (boardLevel) => {
   board = []
   CURRENT_BOARD = boardLevel
   CURRENT_BOMBS_LEFT = boardLevel[2]

   for (let x = 0; x < CURRENT_BOARD[0]; x++) {
      const col = []
      for (let y = 0; y < CURRENT_BOARD[1]; y++) {
         col.push({
            x: x,
            y: y,
            value: 0,
            revealed: false,
            flagged: false,
            neighbors: [],
         })
      }
      board.push(col)
   }

   return board
}

export const createRandomBoard = (initX, initY, boardWithFlags) => {
   // Change values to randomly positioned X'es
   let bombsLeft = CURRENT_BOARD[2]
   while (bombsLeft > 0) {
      const x = getRandomInt(0, CURRENT_BOARD[0] - 1)
      const y = getRandomInt(0, CURRENT_BOARD[1] - 1)

      if (board[x][y].value !== 'X' && (x !== initX || y !== initY)) {
         board[x][y].value = 'X'
         bombsLeft -= 1
      }
   }

   // Change values around X'es to 1 - 8
   for (let x = 0; x < CURRENT_BOARD[0]; x++) {
      for (let y = 0; y < CURRENT_BOARD[1]; y++) {
         if (board[x][y].value === 'X') continue

         if (x !== 0 && y !== 0) {
            if (board[x - 1][y - 1].value === 'X') board[x][y].value += 1
         }
         if (x !== CURRENT_BOARD[0] - 1 && y !== 0) {
            if (board[x + 1][y - 1].value === 'X') board[x][y].value += 1
         }
         if (x !== CURRENT_BOARD[0] - 1 && y !== CURRENT_BOARD[1] - 1) {
            if (board[x + 1][y + 1].value === 'X') board[x][y].value += 1
         }
         if (x !== 0 && y !== CURRENT_BOARD[1] - 1) {
            if (board[x - 1][y + 1].value === 'X') board[x][y].value += 1
         }
         if (x !== 0) {
            if (board[x - 1][y].value === 'X') board[x][y].value += 1
         }
         if (y !== 0) {
            if (board[x][y - 1].value === 'X') board[x][y].value += 1
         }
         if (x !== CURRENT_BOARD[0] - 1) {
            if (board[x + 1][y].value === 'X') board[x][y].value += 1
         }
         if (y !== CURRENT_BOARD[1] - 1) {
            if (board[x][y + 1].value === 'X') board[x][y].value += 1
         }

         // Add neighbors
         board[x][y].neighbors = getNeighbors(x, y, board)

         // Set flags
         board[x][y].flagged = boardWithFlags[x][y].flagged
      }
   }
}

const getRandomInt = (min, max) => {
   min = Math.ceil(min)
   max = Math.floor(max)
   return Math.floor(Math.random() * (max - min + 1)) + min
}

const getNeighbors = (x, y, board) => {
   const tempNeighbors = []

   try {
      if (board[x - 1][y - 1].value !== 'X') tempNeighbors.push(board[x - 1][y - 1])
   } catch {}

   try {
      if (board[x][y - 1].value !== 'X') tempNeighbors.push(board[x][y - 1])
   } catch {}
   try {
      if (board[x + 1][y - 1].value !== 'X') tempNeighbors.push(board[x + 1][y - 1])
   } catch {}
   try {
      if (board[x + 1][y].value !== 'X') tempNeighbors.push(board[x + 1][y])
   } catch {}
   try {
      if (board[x + 1][y + 1].value !== 'X') tempNeighbors.push(board[x + 1][y + 1])
   } catch {}
   try {
      if (board[x][y + 1].value !== 'X') tempNeighbors.push(board[x][y + 1])
   } catch {}
   try {
      if (board[x - 1][y + 1].value !== 'X') tempNeighbors.push(board[x - 1][y + 1])
   } catch {}
   try {
      if (board[x - 1][y].value !== 'X') tempNeighbors.push(board[x - 1][y])
   } catch {}

   return tempNeighbors
}

export const getBoardWithAllBombsRevealed = (boardTable) => {
   const tempBoard = []
   boardTable.forEach((col) => {
      const tempCol = []
      col.forEach((cell) => {
         if (cell.value === 'X' && !cell.flagged) {
            tempCol.push({ ...cell, revealed: true })
         } else {
            tempCol.push(cell)
         }
      })
      tempBoard.push(tempCol)
   })

   return tempBoard
}

export const getBoardWithRevealedArea = (boardTable, x, y) => {
   boardTable[x][y].neighbors.forEach((nb) => revealNeighbor(nb))
   return boardTable
}
const revealNeighbor = (neighbor) => {
   neighbor.revealed = true
   neighbor.flagged = false
   if (neighbor.value !== 0) return
   neighbor.neighbors.filter((nb) => nb.revealed === false).forEach((nb) => revealNeighbor(nb))
}

export const getCurrentBoardInfo = () => CURRENT_BOARD
export const getCurrentBombsLeft = () => CURRENT_BOMBS_LEFT
