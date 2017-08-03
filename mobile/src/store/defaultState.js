export default {
  sockets: {
    socketConnected: false,
    socket: null,
    enteredKey: '',
    remotePaired: false,
  },
  squirtle: {
    name: 'Squirtle',
    level: 0,
    species: 'Squirtle',
    moves: [
      'Tackle',
      'Tail Whip',
    ],
    hueRotate: `${Math.random() * 360}deg`,
  },
  alerts: [],
  ui: {
    rename: false,
  },
}
