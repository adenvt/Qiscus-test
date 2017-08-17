<template>
  <div id="sign-in-container">
    <template v-if="!isSignedIn">
      <button class="btn btn-success" @click="handleClick">
        <i class="fa fa-sign-in fa-fw"></i>
        Login With Google
      </button>
    </template>
    <template v-else>
      <button class="btn btn-danger" @click="handleClick">
        <i class="fa fa-sign-in fa-fw"></i>
        Logout
      </button>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    isSignedIn () {
      return this.$store.state.isSignedIn
    },
  },
  methods: {
    handleClick () {
      if (!this.isSignedIn)
        this.$store.dispatch('signIn')
      else
        this.$store.dispatch('signOut')
    },
  },
}
</script>
