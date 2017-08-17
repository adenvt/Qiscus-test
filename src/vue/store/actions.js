import GoogleDrive from '@/js/google-drive.js'

const google = GoogleDrive.getInstance()

export default {
  getStatusSignIn ({commit}) {
    commit('setSignedIn', { isSignedIn: GoogleDrive.getInstance().isSignedIn })
  },
  signIn ({dispatch, commit}) {
    google.once('signed', () => {
      commit('setSignedIn', { isSignedIn: true })

      dispatch('getList')
    })
    google.signIn()
  },
  signOut ({commit}) {
    google.once('unsigned', () => {
      commit('setSignedIn', { isSignedIn: false })
      commit('reset')
    })
    google.signOut()
  },
  load ({commit}, {token, folder}) {
    return new Promise((resolve, reject) => {
      google.list({
        pageSize : 10,
        corpora  : 'user',
        fields   : '*',
        spaces   : 'drive',
        orderBy  : 'folder,name',
        pageToken: token,
        q        : `'${folder.id}' in parents`,
      }).then(res => {
        if (res.status === 200) {
          commit('setFolder', { folder: folder })
          commit('setFiles', { files: res.result.files })
          commit('setToken', {
            current: token,
            next   : res.result.nextPageToken,
          })
          return resolve()
        } else {
          commit('setFiles', { files: [] })
          return reject(new Error(res.message))
        }
      })
    })
  },
  getList ({dispatch, state}) {
    return dispatch('load', {
      token : state.token.current,
      folder: state.folder.current,
    })
  },
  nextList ({dispatch, state, commit}) {
    const token = state.token.current

    dispatch('load', {
      token : state.token.next,
      folder: state.folder.current,
    }).then(() => {
      commit('nextList', {token})
    })
  },
  prevList ({dispatch, state, commit}) {
    const token = state.token.history[state.token.history.length - 1]

    dispatch('load', {
      token : token,
      folder: state.folder.current,
    }).then(() => {
      commit('prevList')
    })
  },
  folderDown ({state, commit, dispatch}, {folder}) {
    const parent = state.folder.current

    dispatch('load', {
      token : '',
      folder: folder,
    }).then(() => {
      commit('folderDown', {folder: parent})
    })
  },
  folderUp ({commit, dispatch, state}, payload = {}) {
    const index = payload.index > -1 ? payload.index : state.folder.parent.length - 1
    const folder = state.folder.parent[index]

    dispatch('load', {
      token : '',
      folder: folder,
    }).then(() => {
      commit('folderUp', {index})
    })
  },
}
