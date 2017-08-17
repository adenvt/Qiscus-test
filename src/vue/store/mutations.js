import STATE from './state.js'

export default {
  setSignedIn (state, { isSignedIn }) {
    state.isSignedIn = isSignedIn
  },
  setFiles (state, { files }) {
    state.files = files
  },
  setToken (state, {current, next}) {
    state.token.current = current
    state.token.next = next
  },
  nextList (state, {token}) {
    state.token.history.push(token)
  },
  prevList (state) {
    state.token.history.pop()
  },
  setFolder (state, {folder}) {
    if (folder.id !== state.folder.current.id) {
      state.folder.current = folder
      state.token.history = []
    }
  },
  folderUp (state, {index}) {
    state.folder.parent.splice(index)
  },
  folderDown (state, {folder}) {
    state.folder.parent.push(folder)
  },
  reset (state) {
    state.files = []

    Object.assign(state, STATE)
  },
}
