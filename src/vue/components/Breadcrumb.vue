<template>
  <ol class="breadcrumb breadcrumb-inverse">
      <li v-for="(f, i) in folder.parent" :key="f.id">
          <a href="#" @click="folderUp(i)">{{ f.name }}</a>
      </li>
      <li class="active">
          {{ folder.current.name }}
      </li>
  </ol>
</template>

<script>
export default {
  computed: {
    folder () {
      return this.$store.state.folder
    },
  },
  methods: {
    folderUp (index) {
      return this.$store.dispatch('folderUp', {index})
    },
  },
}
</script>
