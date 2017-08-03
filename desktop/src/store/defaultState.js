import facts from '../data/facts';

export default {
  sockets: {
    socketConnected: false,
    socket: null,
    reconnecting: false,
    remotePaired: false,
    remoteDisconnectedTimeout: null,
    remoteKey: '',
    firstPairing: true,
    gameResumed: false,
  },
  ui: {
    currFactIndex: Math.floor(Math.random() * facts.length),
    infoModalOpen: false,
    keyModalOpen: false,
    pairedModalOpen: false,
  },
}
