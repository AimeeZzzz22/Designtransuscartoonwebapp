
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
     - **WeChat dashboard**: go to `/admin/wechat` and confirm status, metrics, and logs render.

  These steps can be repeated on any machine with Node.js, Python 3.11+, and a valid Gemini API key to reproduce the app’s behavior.

  ## WeChat Integration Setup

  The backend now includes a WeChat bridge module with webhook verification, message handling, user mapping, persistence, and admin metrics.

  1. **Configure backend environment**
     - `cd transus-backend`
     - Set required variables:
       - `export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"`
       - `export DATABASE_URL="postgresql+psycopg://postgres:postgres@localhost:5432/transus"`
       - `export WECHAT_TOKEN="YOUR_WECHAT_VERIFY_TOKEN"`
       - Optional:
         - `export WECHAT_APP_ID="YOUR_WECHAT_APP_ID"`
         - `export WECHAT_APP_SECRET="YOUR_WECHAT_APP_SECRET"`
         - `export WECHAT_RATE_LIMIT_PER_MIN="30"`
         - `export WECHAT_CONTEXT_WINDOW_SIZE="12"`
         - `export WECHAT_AI_TIMEOUT_MS="1800"`

  2. **Install backend dependencies and run**
     - `pip install -r requirements.txt`
     - `python3 main.py`

  3. **Expose local backend for WeChat callback**
     - Use a tunnel service (for example ngrok) to expose `http://localhost:8080`.
     - Set WeChat server URL to:
       - `https://<public-domain>/wechat/webhook`
     - Use your `WECHAT_TOKEN` in WeChat platform config.

  4. **Webhook verification**
     - WeChat handshake uses:
       - `GET /wechat/webhook` with `signature`, `timestamp`, `nonce`, `echostr`
     - Message callback uses:
       - `POST /wechat/webhook`

  5. **Admin and utility endpoints**
     - `GET /wechat/admin/status`
     - `GET /wechat/admin/metrics`
     - `GET /wechat/admin/logs`
     - `GET /wechat/qrcode`

  ## Backend Tests

  Run backend tests from `transus-backend`:

  - `pytest`
  