/* eslint-disable no-template-curly-in-string */
import KeenTracking from 'keen-tracking'
import uuid from 'uuid/v4'

class Tracking {
  constructor() {
    this.uuid = uuid()
    this.client = new KeenTracking({
        projectId: '5ae50594c9e77c0001cc21e7',
        writeKey: process.env.REACT_APP_KEEN_SECRET
    });
  }

  pageView(title) {
    this.client.recordEvent('pageviews', {
      title,
      host: window.location.host,
      ip_address: "${keen.ip}",
      sessionId: this.uuid,
      keen: {
        addons: [{
          name: "keen:ip_to_geo",
          input: {
            ip: "ip_address"
          },
          output: "keen.location"
        }]
      }  
    });
  }

  game(players, gameInfo) {
    const playerNames = players
      .filter(player => player.active)
      .map(player => player.name)

    this.client.recordEvent('games', {
      numPlayers: playerNames.length,
      duration: gameInfo.duration,
      gameNumber: gameInfo.gameNumber,
      host: window.location.host,
      sessionId: this.uuid,
    }); 
  }
}

export default new Tracking();