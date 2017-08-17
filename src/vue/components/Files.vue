<template>
  <tr>
    <td>
      <img :src="metadata.iconLink">
      <a v-if="isFolder" :href="metadata.id" @click.prevent="folderDown">
        {{ metadata.name }}
      </a>
      <a v-else :href="metadata.webContentLink || metadata.webViewLink" target="_blank">
        {{ metadata.name }}
      </a>
    </td>
    <td>{{ size }}</td>
  </tr>
</template>

<script>
import bytes from 'bytes'

export default {
  props: [
    'metadata',
  ],
  computed: {
    size () {
      return bytes(parseInt(this.metadata.size, 10), {
        unitSeparator: ' ',
      })
    },
    isFolder () {
      return this.metadata.mimeType === 'application/vnd.google-apps.folder'
    },
  },
  methods: {
    folderDown () {
      this.$store.dispatch('folderDown', {
        folder: this.metadata,
      })
    },
  },
}
</script>
