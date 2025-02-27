// static/js/main.js

// Fetches the current board state from the Flask back-end
async function fetchBoardData() {
    const response = await fetch("/get_board");
    const data = await response.json();
    return data;
  }
  
  // Draws the board in a table format inside the #board-container div
  async function drawBoard() {
    const boardData = await fetchBoardData();
    const container = document.getElementById("board-container");
    container.innerHTML = ""; // Clear previous content
  
    // Create a table element
    const table = document.createElement("table");
  
    // Build rows and cells
    for (let row = 0; row < boardData.height; row++) {
      const tr = document.createElement("tr");
  
      for (let col = 0; col < boardData.width; col++) {
        const td = document.createElement("td");
        // This container will hold however many gem images we need
        const gemContainer = document.createElement("div");
        gemContainer.style.display = "flex";
        gemContainer.style.flexWrap = "wrap";
        gemContainer.style.alignItems = "center";
        gemContainer.style.justifyContent = "center";
  
        const cellValue = boardData.grid[row][col];
  
        // If cellValue > 0 => Player 1 (blue)
        // If cellValue < 0 => Player 2 (pink)
        // If cellValue == 0 => empty
        if (cellValue > 0) {
          for (let i = 0; i < Math.abs(cellValue); i++) {
            const gemImg = document.createElement("img");
            gemImg.src = "/static/img/blue.png";  // Update if your file name/path differs
            gemImg.style.width = "24px";
            gemImg.style.height = "24px";
            gemImg.style.margin = "2px";
            gemContainer.appendChild(gemImg);
          }
        } else if (cellValue < 0) {
          for (let i = 0; i < Math.abs(cellValue); i++) {
            const gemImg = document.createElement("img");
            gemImg.src = "/static/img/pink.png";  // Update if your file name/path differs
            gemImg.style.width = "24px";
            gemImg.style.height = "24px";
            gemImg.style.margin = "2px";
            gemContainer.appendChild(gemImg);
          }
        } else {
          // Empty cell => no images
        }
  
        td.appendChild(gemContainer);
  
        // On click, let Player 1 place a piece
        td.addEventListener("click", () => handleCellClick(row, col));
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  
    container.appendChild(table);
    checkWinner(); // Check if there's a winner and update #status
  }
  
  // Handles a cell click for Player 1, then calls the AI
  async function handleCellClick(row, col) {
    // 1. Send a POST request to /move with player=1 (Player 1)
    await fetch("/move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ row, col, player: 1 })
    });
  
    // 2. Re-draw the board to reflect Player 1's move
    await drawBoard();
  
    // 3. Check if there's a winner right after Player 1 moves
    const winnerData = await fetch("/check_win");
    const wJson = await winnerData.json();
    if (wJson.winner !== 0) {
      // If someone just won, stop and don't let AI move
      return;
    }
  
    // 4. If no winner yet, let the AI (Player 2) make a move
    await fetch("/ai_move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });
  
    // 5. Re-draw the board after AI moves
    await drawBoard();
  }
  
  // Checks the /check_win route and displays a message in #status
  async function checkWinner() {
    const response = await fetch("/check_win");
    const data = await response.json();
    const statusDiv = document.getElementById("status");
  
    if (data.winner === 1) {
      statusDiv.textContent = "Player 1 Wins!";
    } else if (data.winner === -1) {
      statusDiv.textContent = "Player 2 Wins!";
    } else {
      statusDiv.textContent = "No winner yet.";
    }
  }
  
// When the page loads, draw the board for the first time
window.onload = () => {
  drawBoard();

  // Add "Play Again" button logic
  const playAgainBtn = document.getElementById("play-again");
  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", async () => {
      // 1. Call /reset to re-init the board
      await fetch("/reset", { method: "POST" });
      // 2. Redirect to /play so the user sees a fresh board
      window.location.href = "/play";
    });
  }
};  