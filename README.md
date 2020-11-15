# LinkShortener

## Requirements
- Node.js v14.10.1 or greater

## Instructions

### Installation
1. Clone the repository:  `git clone git@github.com:markross/LinkShortener.git`
2. Change to the directory `cd LinkShortener`
3. Run `npm install`

### Shortening a link

Run `./bin/shorten <your link>` 

For example `./bin/shorten https://www.bbc.co.uk`

Your shortened link will be displayed.

### Running the redirection service

Run `npm run server`

This will start a server at localhost:5000 which will redirect any shortened links you have previously created. 

NOTE: the server initially loads the links from a json file on startup, so if new links are added whilst the server is running, they will not work until the server is restarted.
