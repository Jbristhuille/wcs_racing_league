
# wcs_racing_league

Racing League app with ranking

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Node 16.17.1 [https://nodejs.org/en/download/releases/](https://nodejs.org/en/download/releases/)

### Installing

* Install client dependancies:

```
cd client
npm install
```

* Install server dependancies:

```
cd server
npm install
```

* Import database:
```
mysql -u root -p
source \wcs_racing_league\server\db.sql
```

* Start client in dev mode:

```
npm run dev-client
```

* Start server in dev mode:

```
npm run dev-server
```

**Note**: Don't forger to create **.env** file in **server** and **client** folder.

## Deployment

Deployment method and commands.
**WIP**

## Built With

* [React](https://fr.reactjs.org/) - Client framework
* [Express](https://expressjs.com/fr/) - Server framework
* [Capacitor](https://capacitorjs.com/) - Hybrid core