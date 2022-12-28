# 🌍 Metoerological App
<p align='center'>
<img width="700" height="350" src="https://user-images.githubusercontent.com/65918738/209467045-63979dce-a130-4ca3-a21e-c30ae4d1cb9f.png">
</p>

A simple and neat web app for tracking the weather forcasts for user-specified coordinates and [Saudi-Arabian cities](https://github.com/homaily/Saudi-Arabia-Regions-Cities-and-Districts) using the Mateomatics API. It's built with Django, DRF, and React.

## Getting Started

> you must have these in your machines: 
>- Python: +3.0
>- Node: +12.0

1. Clone this repo and cd into it
2. Backend Setup:
    * at prject root, setup virtualenv `py -m venv env`
    * `cd ./backend`
    * install required packages `pip install -r requirements.txt`
    * run the backend server `py manage.py runserver`
    * keep the terminal open as long as you want to keep using the app
3. Frontend Setup:
    * open a new terminal
    * `cd ./frontend`
    * install required packages `npm install` (may take some time)
         * If faced any error regarding dependencies, run `npm install --legacy-peer-deps`
    * Using your Mateomatics API credentials, get your auth token from <https://login.meteomatics.com/api/v1/token>
        * if you don't have Mateomatics API account, [sign-up for a free test account](https://www.meteomatics.com/en/sign-up-weather-api-test-account/)
    * add your auth token inside `frontend/.env` file, between quotation marks in `REACT_APP_MATEOMATICS_TOKEN` variable
    * run the frontend server `npm run start`
    
## Areas of Improvement
Since this is a proof-of-concept app, it's by no means should be used in production. To optimize it for production, we could do the following for example:
* Implement user & auth modules
* Set validations in API routes and models, similar to what's been written in client-side
* Write unit & e2e testing
* Serve the frontend from the optimized `build` folder instead of the `src`
* Streamline the responsiveness on mobile
* ... and many more.
