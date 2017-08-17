<style lang="scss">
    @import "../css/custom.scss";

    #file-list {
        td > a {
            color: #222;
        }
    }
</style>

<template>
    <div id="body">
        <Navbar />
        <div class="container">
            <Breadcrumb />
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <i class="fa fa-list fa-fw"></i>
                    Directory Listing
                    <div class="pull-right">
                        <button class="btn btn-xs btn-default" v-if="isSignedIn" @click="getList">
                            <i class="fa fa-refresh fa-fw"></i>
                            Refresh
                        </button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover" id="file-list">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th width="30%">
                                    Size
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="folder.parent.length">
                                <td colspan="2">
                                    ...
                                    <a href="#" @click.prevent="folderUp">
                                        <i class="fa fa-arrow-left fa-fw"></i>
                                        Back
                                    </a>
                                </td>
                            </tr>
                            <tr v-if="files.length<1">
                                <td class="text-center" colspan="2">
                                    [ No Data ]
                                </td>
                            </tr>
                            <Files v-for="file in files" :metadata="file" :key="file.id" />
                        </tbody>
                    </table>
                </div>
                <div class="panel-footer text-center">
                    <Pagination />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import GoogleDrive from '@/js/google-drive.js'
import Breadcrumb from './components/Breadcrumb.vue'
import Navbar from './components/Navbar.vue'
import Files from './components/Files.vue'
import Pagination from './components/Pagination.vue'

export default {
  components: { Navbar, Files, Breadcrumb, Pagination },
  computed  : mapState({
    isSignedIn: 'isSignedIn',
    files     : 'files',
    folder    : 'folder',
  }),
  methods: {
    getList () {
      this.$store.dispatch('getList')
    },
    folderUp () {
      this.$store.dispatch('folderUp')
    },
  },
  created () {
    const google = GoogleDrive.getInstance()

    google.init().then(() => {
      google.on('auth:change', (isSignedIn) => {
        this.$store.commit('setSignedIn', { isSignedIn })
      })

      const isSignedIn = google.isSignedIn

      this.$store.commit('setSignedIn', { isSignedIn })

      if (isSignedIn)
        this.$store.dispatch('getList')
    })
  },
}
</script>
