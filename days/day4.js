function formatInput(input) {
  const nums = input.shift()[0].split(',');
  const boards = [];
  input.forEach((board) =>
    boards.push(board.map((row) => row.split(/\s+/).filter(Boolean)))
  ); // split on whitespace, filter out empty elements
  return { nums, boards };
}

function markCalledNumber(board, number) {
  // replace any instance of the number with 'x'
  return board.map((row) => {
    for (let i = 0; i < row.length; i++) {
      if (row[i] === number) row[i] = 'x';
    }
    return row;
  });
}

function checkForWinners(board) {
  // check each row and col for all x's
  for (let i = 0; i < board.length; i++) {
    // rows
    if (
      board[i][0] === 'x' &&
      board[i][1] === 'x' &&
      board[i][2] === 'x' &&
      board[i][3] === 'x' &&
      board[i][4] === 'x'
    )
      return true;
    // cols
    if (
      board[0][i] === 'x' &&
      board[1][i] === 'x' &&
      board[2][i] === 'x' &&
      board[3][i] === 'x' &&
      board[4][i] === 'x'
    )
      return true;
  }
  return false;
}

function sumUnmarkedNumbers(board) {
  let sum = 0;
  for (let row of board) {
    for (let num of row) {
      if (num !== 'x') sum += parseInt(num);
    }
  }
  return sum;
}

const run1 = (input) => {
  let { nums, boards } = formatInput(input);
  let winningNum, winningBoard;
  numberLoop: for (let i = 0; i < nums.length; i++) {
    // markCalledNumber on each board
    const updatedBoards = boards.map((board) =>
      markCalledNumber(board, nums[i])
    );
    // checkForWinners, break loop if successful
    for (let board of updatedBoards) {
      if (checkForWinners(board)) {
        winningNum = nums[i];
        winningBoard = board;
        break numberLoop;
      }
    }
    boards = updatedBoards;
  }
  const boardSum = sumUnmarkedNumbers(winningBoard);
  return boardSum * parseInt(winningNum);
};

const run2 = (input) => {
  let { nums, boards } = formatInput(input);
  let winnerCount = 0;
  let losingNum, losingBoard;
  numberLoop: for (let i = 0; i < nums.length; i++) {
    // markCalledNumber on each board
    const updatedBoards = boards.map((board) => {
      if (board === 'winner') return board;
      return markCalledNumber(board, nums[i]);
    });
    // checkForWinners, remove board if it wins
    boardLoop: for (let j = 0; j < updatedBoards.length; j++) {
      if (updatedBoards[j] !== 'winner') {
        if (checkForWinners(updatedBoards[j])) {
          winnerCount += 1;
          if (winnerCount === boards.length) {
            losingNum = nums[i];
            losingBoard = updatedBoards[j];
            break numberLoop;
          }
          updatedBoards.splice(j, 1, 'winner');
        }
      }
    }
    boards = updatedBoards;
  }
  const boardSum = sumUnmarkedNumbers(losingBoard);
  return boardSum * parseInt(losingNum);
};

exports.run1 = run1;
exports.run2 = run2;
