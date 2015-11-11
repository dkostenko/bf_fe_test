# Test task for company

## Some important steps to run this app in development environment

* Clone this repository.

* Enter the project folder.

* Run this command to uodate node js:

```
brew upgrade node
```

or download the last stable version from the official website (https://nodejs.org/en/).
Project was tested with node js v0.12.7.


* Install all dependencies with this command:

```
npm install
```

* Run project with command (where parametr proxyUrl is your server address):

```
gulp --proxyUrl http://localhost:3000
```

* Open browser with address:

```
http://localhost:3001
```