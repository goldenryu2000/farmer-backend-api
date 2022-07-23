# Farmer Data API

A REST API made for the task given by SyncSense.
Deployed API : https://farmer-backend-api.herokuapp.com/api-docs/

## Run Locally

Clone the project

```bash
  git clone https://github.com/goldenryu2000/farmer-backend-api.git
```

Go to the project directory

```bash
  cd farmer-backend-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run server
```

## Deployment

To deploy this project on Heroku

- Create a new a app on Heroku
- Add your MONGO_URI from .env in local to "Config Vars" on Heroku
- Add heroku remote to local repo
- Then the commands

```bash
  git add .
```

```bash
  git commit -m "make it better"
```

```bash
  git branch -M main
```

```bash
  git push heroku main
```

- Once the app is deployed, the swagger docs will be available on "Your Heroku app url"/api-docs
