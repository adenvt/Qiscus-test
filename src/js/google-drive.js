import EventEmitter from 'events'

export const CLIENT_ID = '604510437141-l5mmhj3ve57ps26p2ufndcm4lh4g2rtq.apps.googleusercontent.com'
export const SCOPES = 'https://www.googleapis.com/auth/drive.readonly'
export const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']

/**
 * Google Drive Wrapper
 */

let instance = null

export default class GoogleDrive extends EventEmitter {
  static getInstance () {
    if (!(instance instanceof GoogleDrive))
      instance = new GoogleDrive()

    return instance
  }

  get isSignedIn () {
    return window.gapi.auth2.getAuthInstance().isSignedIn.get()
  }

  init () {
    return new Promise((resolve, reject) => {
      const self = this

      window.gapi.load('client:auth2', {
        timeout: 5000,
        callback () {
          window.gapi.client.init({
            clientId     : CLIENT_ID,
            scope        : SCOPES,
            discoveryDocs: DISCOVERY_DOCS,
          }).then(() => {
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => {
              self.emit('auth:change', isSignedIn)

              if (isSignedIn)
                self.emit('signed')
              else
                self.emit('unsigned')
            })

            return resolve()
          })
        },
        onerror () {
          return reject(new Error('Google API Client failed to load'))
        },
        ontimeout () {
          return reject(new Error('Google API Client load timeout'))
        },
      })
    })
  }

  signIn () {
    return window.gapi.auth2.getAuthInstance().signIn()
  }

  signOut () {
    return window.gapi.auth2.getAuthInstance().signOut()
  }

  list (options = {}) {
    return window.gapi.client.drive.files.list(options)
  }
}
