export var BOARD_SIZE_X = 13
export var BOARD_SIZE_Y = 12
export var NUM_OF_BOMBS = 30
export var board = []

export const createInitBoard = () => {
   board = []
   for (let x = 0; x < BOARD_SIZE_X; x++) {
      const col = []
      for (let y = 0; y < BOARD_SIZE_Y; y++) {
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

export const createRandomBoard = (initX, initY) => {
   // Change values to randomly positioned X'es
   let bombsLeft = NUM_OF_BOMBS
   while (bombsLeft > 0) {
      const x = getRandomInt(0, BOARD_SIZE_X - 1)
      const y = getRandomInt(0, BOARD_SIZE_Y - 1)

      if (board[x][y].value !== 'X' && (x !== initX || y !== initY)) {
         board[x][y].value = 'X'
         bombsLeft -= 1
      }
   }

   // Change values around X'es to 1 - 8
   for (let x = 0; x < BOARD_SIZE_X; x++) {
      for (let y = 0; y < BOARD_SIZE_Y; y++) {
         if (board[x][y].value === 'X') continue

         if (x !== 0 && y !== 0) {
            if (board[x - 1][y - 1].value === 'X') board[x][y].value += 1
         }
         if (x !== BOARD_SIZE_X - 1 && y !== 0) {
            if (board[x + 1][y - 1].value === 'X') board[x][y].value += 1
         }
         if (x !== BOARD_SIZE_X - 1 && y !== BOARD_SIZE_Y - 1) {
            if (board[x + 1][y + 1].value === 'X') board[x][y].value += 1
         }
         if (x !== 0 && y !== BOARD_SIZE_Y - 1) {
            if (board[x - 1][y + 1].value === 'X') board[x][y].value += 1
         }
         if (x !== 0) {
            if (board[x - 1][y].value === 'X') board[x][y].value += 1
         }
         if (y !== 0) {
            if (board[x][y - 1].value === 'X') board[x][y].value += 1
         }
         if (x !== BOARD_SIZE_X - 1) {
            if (board[x + 1][y].value === 'X') board[x][y].value += 1
         }
         if (y !== BOARD_SIZE_Y - 1) {
            if (board[x][y + 1].value === 'X') board[x][y].value += 1
         }

         // Add neighbors
         board[x][y].neighbors = getNeighbors(x, y, board)
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
      if (board[x - 1][y - 1].value !== 'X')
         tempNeighbors.push(board[x - 1][y - 1])
   } catch {}

   try {
      if (board[x][y - 1].value !== 'X') tempNeighbors.push(board[x][y - 1])
   } catch {}
   try {
      if (board[x + 1][y - 1].value !== 'X')
         tempNeighbors.push(board[x + 1][y - 1])
   } catch {}
   try {
      if (board[x + 1][y].value !== 'X') tempNeighbors.push(board[x + 1][y])
   } catch {}
   try {
      if (board[x + 1][y + 1].value !== 'X')
         tempNeighbors.push(board[x + 1][y + 1])
   } catch {}
   try {
      if (board[x][y + 1].value !== 'X') tempNeighbors.push(board[x][y + 1])
   } catch {}
   try {
      if (board[x - 1][y + 1].value !== 'X')
         tempNeighbors.push(board[x - 1][y + 1])
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
         if (cell.value === 'X') {
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
   if (neighbor.value !== 0) return
   neighbor.neighbors
      .filter((nb) => nb.revealed === false)
      .forEach((nb) => revealNeighbor(nb))
}
