require('./lib/libv86');
var socket = io();

var canvas = document.querySelector('canvas');
var onlineCount = document.getElementById('online-count');

canvas.requestPointerLock = canvas.requestPointerLock ||
  canvas.mozRequestPointerLock ||
  canvas.webkitRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
  document.mozExitPointerLock ||
  document.webkitExitPointerLock;

canvas.onclick = function() {
  canvas.requestPointerLock();
}

var emulator = new V86Starter({
  memory_size: 64 * 1024 * 1024,
  vga_memory_size: 2 * 1024 * 1024,
  screen_container: document.getElementById("screen_container"),
  bios: {
    url: "seabios.bin"
  },
  vga_bios: {
    url: "vgabios.bin"
  },
  fda: {
    url: "windows101.img"
  },
  autostart: true,
});

socket.on('count', function(count) {
  onlineCount.innerHTML = count;
});

// Hiring smart people
if (typeof console !== 'undefined' && typeof console.log === 'function' && !window.test) {
  console.log('\r\n%c                     *      .--.\r\n%c                           \/ \/  `\r\n%c          +               | |\r\n%c                 \'         \\ \\__,\r\n%c             *          +   \'--\'  *\r\n%c                 +   \/\\\r\n%c    +              .\'  \'.   *\r\n%c           *      \/======\\      +\r\n%c                 ;:.  _   ;\r\n%c                 |:. (_)  |\r\n%c                 |:.  _   |\r\n%c       +         |:. (_)  |          *\r\n%c                 ;:.      ;\r\n%c               .\' \\:.    \/ `.\r\n%c              \/ .-\'\':._.\'`-. \\\r\n%c              |\/    \/||\\    \\|\r\n%c            _..--\"\"\"````\"\"\"--.._\r\n%c      _.-\'``                    ``\'-._\r\n%c    -\'         %cAnjinglah maneh%c        \'-\r\n%c',
    'color:#D0E3F1', 'color:#D0E3F1', 'color:#C0DAEC', 'color:#C0DAEC', 'color:#B0D1E8', 'color:#B0D1E8', 'color:#A1C7E3', 'color:#A1C7E3', 'color:#91BEDE', 'color:#91BEDE', 'color:#81B5D9', 'color:#81B5D9', 'color:#72ABD5', 'color:#72ABD5', 'color:#62A2D0', 'color:#62A2D0', 'color:#5299CB', 'color:#5299CB', 'color:#4390C7', 'color:#4390C7', 'color:#4390C7', 'color: #000000');
}
