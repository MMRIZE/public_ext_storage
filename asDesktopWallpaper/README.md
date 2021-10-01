


### For Windows (10)
#### Requirements
- You might not have `python > 3.7` and `node-gyp`(It requires `Visual Studio` Tools to install).
- So, Read this [link](https://github.com/nodejs/node-gyp#on-windows) and setup your environment. (Install Visual Studio things and python)

#### Install
Unlike Mac/Linux, for Windows, you need some hacks.

```sh
cd ~/MagicMirror # Your magicmirror directory
npm install --save electron-wallpaper-napi
# If fails, you might hava some issues about Visual Studio things. Read above;
```

Then, open `js/electron.js` with your editor, and add these two lines;
```js
//around line 7
...
const electron = require("electron");
const core = require("./app.js");
const Log = require("logger");

const electronWallpaper = require('electron-wallpaper-napi')  // <-- Insert

// Config
let config = process.env.config ? JSON.parse(process.env.config) : {};
...
```
and
```js
// around line 50
...
	// Create the browser window.
	mainWindow = new BrowserWindow(electronOptions);
	electronWallpaper.attachWindow(mainWindow)  // <-- Insert
...
```

#### Configuration
```js
// in your config.js add these lines.

	electronOptions: {
		//width: 1920,
		//height: 1080,
		//x: 0,
		//y: 0,
		fullscreen:  true,
		backgroundColor: '#00000000',
		frame: false,
		type: 'desktop',
		transparent: true,
	},
	electronSwitches: ["enable-transparent-visuals"],
  
```

