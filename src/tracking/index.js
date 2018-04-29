/* eslint-disable no-template-curly-in-string */
import KeenTracking from 'keen-tracking'

class Tracking {
  constructor() {
    this.client = new KeenTracking({
        projectId: '5ae50594c9e77c0001cc21e7',
        writeKey: process.env.keen
    });
  }

  pageView(title) {  
    // Record an event
    this.client.recordEvent('pageviews', {
      title,
      host: window.location.host,
      ip_address: "${keen.ip}",
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
    this.client.recordEvent('games', {
      players,
      gameInfo,
      host: window.location.host,
      ip_address: "${keen.ip}",
      keen: {
        addons: [{
          name: "keen:ip_to_geo",
          input: {
            ip: "ip_address"
          },
          output: "keen.location"
        }]
      }  
    });  }
}

export default new Tracking();