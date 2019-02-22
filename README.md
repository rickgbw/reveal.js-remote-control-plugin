Remote Control for Reveal.js
============================

Create a local connection and use your smartphone as remote control.
You can change slides, zoom in, show overview mode and activate a
laser pointer.

Requirements
------------

- A web server which in addition to serving the presentation as
  normal, can also listen for external traffic on port 3001, and
  has [`npm`](https://www.npmjs.com/) installed.

- A mobile device with a web browser connected to the same network
  as the above web server.

Installation
------------

On the presentation web server, copy this repository into your
`reveal.js` presentation under `plugins/remote-control`, e.g.

    mkdir plugins
    git submodule add https://github.com/rickgbw/reveal.js-remote-control-plugin plugins/remote-control

Install the plugin's dependencies:

    cd plugins/remote-control
    npm install

Run the `server.js` file to start up a server listening on port 3001:

    npm start

Include these two lines in the `dependencies` section of
your presentation's `index.html`:

    { src: 'http://localhost:3001/socket.io/socket.io.js', async: true },
    { src: 'plugins/remote-control/remote.js', async: true }

Finally:

- Open your presentation in your browser as normal via
  `http://$SERVERIP`, where `$SERVERIP` corresponds to the IP of the
  presentation server

- Open `http://$SERVERIP:3001` in your mobile device's browser.

Usage
-----

- Swipe right/left/up/down to change slides
- Pinch to zoom in or out
- Double tap to activate the overview mode
- Hold the screen to activate the laser pointer

Architecture
------------

The presentation web server loads `remote.js` which listens for remote
control commands via `socket.io`.  The node server started by `npm start`
runs a lightweight web-server on port 3001 of the same host which receives
remote control commands from the mobile device's browser and forwards them
on to the host's webserver.
