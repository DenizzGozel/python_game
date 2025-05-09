GemStorm - Web-Based Python Board Game

Overview:
GemStorm is an interactive, turn-based board game where players compete to control the entire grid by placing gems and 
triggering overflow mechanics. Play against a built-in AI opponent in your browser.


Tech Stack:
* Python 3
  * Flask (web framework)
  * Werkzeug (WSGI utility)
  * Gunicorn (production server) 
* HTML5 & CSS3 (templates for home and game screens)
* JavaScript (main.js for board rendering and interaction)

Features:
* **Home Screen**: Game overview, rules summary, and "Play Game" button.
* **Game Board**: Dynamic rendering of the grid, real-time updates on moves.
* **Turn-Based Play**: Human vs. AI; click a cell to place gems, then watch the AI respond.
* **Overflow Mechanic**: Cells distribute gems to neighbors when reaching capacity, flipping ownership.
* **Win Detection**: Automatically detects and announces when one side controls the board.

Installation & Setup:
```bash
# 1. Clone the repo
git clone https://github.com/your-user/GemStorm.git
cd GemStorm

# 2. Create a virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate    # Linux/macOS
venv\Scripts\activate     # Windows

# 3. Install dependencies
pip install -r requirements.txt  # citeturn1file0

# 4. Run the application
export FLASK_APP=app.py       # Linux/macOS
set FLASK_APP=app.py          # Windows
flask run

# 5. Open http://127.0.0.1:5000 in your browser
```


Project Structure:
```
GemStorm/
├── app.py                   # Flask application entry point
├── requirements.txt         # Python dependencies
├── game_logic/              # Compiled game logic (.pyc) to protect implementation
│   ├── ai.pyc
│   ├── board.pyc
│   ├── data_structures.pyc
│   └── overflow.pyc
├── templates/               # HTML templates
│   ├── home.html            # Landing page with game instructions
│   └── game.html            # Main game interface
├── static/
│   ├── js/
│   │   └── main.js          # Board rendering and interaction logic
│   ├── css/
│   │   ├── home.css         # Styles for home page
│   │   └── styles.css       # Styles for game interface
│   └── img/                 # Gem images and assets
│       ├── blue.png
│       └── pink.png
└── README_GemStorm.txt      # This file
```


Usage:
1. Navigate to the home screen and click **Play Game**.
2. Click any cell on the board to place your gems.
3. Watch for overflow events—gems will spread to adjacent cells and flip them to your color.
4. After your move, the AI will calculate and make its move automatically.
5. The first player to control every cell wins!

Notes:
* The raw Python files for game logic are compiled to `.pyc` to protect the AI and overflow implementations.
* To view or modify game rules, consult the source copies locally (not committed to the repo).

Deployment:
* **Development**: Use `flask run` as shown above.
* **Production**: Serve with Gunicorn:
  ```bash
  ```

gunicorn app\:app

```
- Can be deployed to Heroku, AWS Elastic Beanstalk, or any platform that supports Python WSGI apps.

Author & License:
© 2025 Deniz Gozel. All rights reserved.  
Licensed under MIT — see LICENSE file for details.

Contact:
- Email: denizgozel98@gmail.com  
- GitHub: https://github.com/DenizzGozel

```
