Remote Control for Reveal.js
=====================================

Create a local connection and use your smartphone as remote control. You can change slides, zoom in, show overview mode and activate a laser pointer.

Installation
=======
Just copy this repository into your reveal.js presentation to '/plugin/remote-control'.

Include this two lines in the "dependencies" section in index.html:
`{ src: 'http://localhost:3001/socket.io/socket.io.js', async: true },
{ src: 'plugin/remote-control/remote.js', async: true }´

Run the server.js file via node to startup a server. Launch your presentation and access "localhost:3001" in your mobile browser.

Using
=======
- Swipe right/left/up/down to change slides
- Pinch to zoom in or out
- Double tap to activate the overview mode
- Hold the screen to activate the laser pointer