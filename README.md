# SearchProxy

A local web search app with a download-first screen. The browser unlocks the search interface after the project download begins, then the downloaded project can be run locally.

## Run the downloaded app

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Important limitation

A website cannot reliably verify that a browser actually saved a file. This project therefore unlocks the interface when the download button is clicked. The real application runs locally after downloading and starting the Node.js server.
