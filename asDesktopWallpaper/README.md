# [HOW_TO] MagicMirror as Desktop Wallpaper (all platform)
Since MM 2.17 (2021-10-01), You can use your MM as Desktop wallpaper (like `Rainmeter` of window). Easy.



## Environment
- MagicMirror >= 2.17


## For MacOS / Linux
![image](https://raw.githubusercontent.com/MMRIZE/public_ext_storage/main/asDesktopWallpaper/bg_macos.png)
### configuration
```js
// in your config.js add these lines.

electronOptions: {
	width: 1920,
	height: 1200,
	fullscreen:  false,
	backgroundColor: '#00000000',
	titleBarStyle: 'none',
	frame: false,
	type: 'desktop',
	hasShadow: false,
	transparent: true,
	resizable:   false,
},
electronSwitches: ["enable-transparent-visuals"],

```

That's all. 


## For Windows (10)
![image](https://raw.githubusercontent.com/MMRIZE/public_ext_storage/main/asDesktopWallpaper/bg_windows.png)

### Requirements
- You might not have `python > 3.7` and `node-gyp`(It requires `Visual Studio` Tools to install).
- So, Read this [link](https://github.com/nodejs/node-gyp#on-windows) and setup your environment. (Install Visual Studio things and python)

### Install
Unlike Mac/Linux, for Windows, you need some hacks for preparation.

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

### Configuration
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

## CSS
```css
:root {
  --color-text: #DDD;
  --color-text-dimmed: #BBB;
  --color-text-bright: #fff;
  --color-background: rgba(0, 0, 0, 0);
 /* make fonts color brighter */

  --font-size: 2vh;
  --font-size-small: 0.75rem;

  --gap-body-top: 20px;
  --gap-body-right: 120px;
  --gap-body-bottom: 20px;
  --gap-body-left: 40px;
/* adjust margin for your screen */
}

* {
  text-shadow: 2px 2px 5px #000000; /* make text more readable on the background image */
}


```

put this in your custom.css
