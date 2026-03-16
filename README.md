
  # Design TransUs Cartoon Web App

  This is a code bundle for Design TransUs Cartoon Web App. The original project is available at https://www.figma.com/design/9P5RkiIc8mVTtll2u1HkcJ/Design-TransUs-Cartoon-Web-App.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Reproducible Testing

  To run the full TransUs experience (frontend + backend) locally in a reproducible way:

  1. **Clone and install frontend**
     - `git clone https://github.com/AimeeZzzz22/Designtransuscartoonwebapp.git`
     - `cd Designtransuscartoonwebapp`
     - `npm install`

  2. **Set up and run the backend**
     - `cd transus-backend`
     - `python3 -m venv .venv`
     - `source .venv/bin/activate`
     - `pip install --upgrade pip`
     - `pip install -r requirements.txt`
     - Export a valid Gemini API key (from Google AI Studio):  
       `export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"`
     - Start the API server:  
       `python main.py`  
       This serves the API at `http://localhost:8080`.

  3. **Run the frontend**
     - In a new terminal:  
       `cd Designtransuscartoonwebapp`  
       `npm run dev`
     - Open the URL shown by Vite (typically `http://localhost:5173`).

  4. **Test flows**
     - **Guided analysis**: go to `/app`, enter Partner A/B perspectives, click **Analyze Conflict** and verify results render.
     - **Live chat agent**: go to `/chat`, send several messages, and confirm TransUs responds conversationally without raw JSON.

  These steps can be repeated on any machine with Node.js, Python 3.11+, and a valid Gemini API key to reproduce the app’s behavior.
  