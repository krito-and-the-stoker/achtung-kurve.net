/* eslint-disable no-template-curly-in-string */
import KeenTracking from 'keen-tracking'

class Tracking {
  constructor() {
    this.client = new KeenTracking({
        projectId: '5ae50594c9e77c0001cc21e7',
        writeKey: '38A3F0366959656DBDE531E815CD8CD11AA22794EFCAC6832171B3BBDF21B87D2289F0C4BA82B84948361B1D12217947BBB55CF747495DE5B0E5E5448F437A752B970D2761FB395B6FC43260A0DEC65EBF60CD39A72F455C847EE15DF209F60F'
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