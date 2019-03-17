const { app, BrowserWindow } = require("electron");

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    title: "DouSuru"
  });

  if (process.env.NODE_ENV === "production") {
    window.loadURL(`file://${__dirname}/dist/frontend/index.html`);
  } else {
    window.loadURL(`http://localhost:4200`);
  }

  // window.webContents.openDevTools();

  window.on("closed", () => {
    window = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  // if all windows are closed, quit the app unless running on MacOS
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (window == null) {
    createWindow();
  }
});
