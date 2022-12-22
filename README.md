# 🌍 Metoerological App
<p align='center'>
<img width="600" height="400" src="https://user-images.githubusercontent.com/65918738/209103946-1bf99645-65b3-448f-9e40-d372209d4499.png">
</p>

This is a simple tool used to track the weather forcasts for user-specified coordinates using the Mateomatics API. It's built with Django, DRF, and React.

## Getting Started

> you must have these in your machines: 
>- Python: +3.0
>- Node: +12.0

1. Clone this repo and cd into it
2. Backend Setup:
    1. at prject root, setup virtualenv `py -m venv env`
    2. `cd ./backend`
    3. install required packages `pip install -r requirements.txt`
    4. run the backend server `py manage.py runserver`
    5. keep the terminal open as long as you want to keep using the app
3. Frontend Setup:
    1. open a new terminal
    2. `cd ./frontend`
    3. install required packages (may take some time) `npm install`
    4. Using your Mateomatics API credentials, get your auth token from <https://login.meteomatics.com/api/v1/token>
        * if you don't have Mateomatics API account, [sign-up for a free test account](https://www.meteomatics.com/en/sign-up-weather-api-test-account/)
    5. add your auth token inside `frontend/.env` file, between quotation marks in `REACT_APP_MATEOMATICS_TOKEN` variable
    6. run the frontend server `npm run start`
