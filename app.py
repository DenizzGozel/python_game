from flask import Flask, render_template, jsonify, request
from game_logic.board import Board
from game_logic.ai import GameTree
from game_logic.overflow import overflow

app = Flask(__name__)
app.secret_key = "some-random-secret-key"

# Global board instance
board = Board(width=6, height=5)

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/play")
def play():
    return render_template("game.html")

@app.route("/get_board", methods=["GET"])
def get_board():
    return jsonify(board.to_json())

@app.route("/move", methods=["POST"])
def move():
    data = request.get_json()
    row = data["row"]
    col = data["col"]
    player = data["player"]
    if board.add_piece(row, col, player):
        board.do_overflow()
    return jsonify(board.to_json())

@app.route("/check_win", methods=["GET"])
def check_win():
    return jsonify({"winner": board.check_win()})

@app.route("/ai_move", methods=["POST"])
def ai_move():
    tree = GameTree(board.grid, -1, tree_height=4)
    r, c = tree.get_move()
    board.add_piece(r, c, -1)
    board.do_overflow()
    return jsonify(board.to_json())

@app.route("/reset", methods=["POST"])
def reset_game():
    """
    Resets the board to its initial state.
    """
    global board
    board = Board(width=6, height=5)
    return jsonify({"message": "Board reset."})

if __name__ == "__main__":
    app.run(debug=True)

