<template>
    <ul class="pagination">
        <li :class="{disabled: !canPrev}">
            <a href="#" @click.prevent="prevList">
                <i class="fa fa-angle-left fa-fw"></i>
                Prev
            </a>
        </li>
        <li :class="{disabled: !canNext}">
            <a href="#" @click.prevent="nextList">
                Next
                <i class="fa fa-angle-right fa-fw"></i>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
  computed: {
    token () {
      return this.$store.state.token
    },
    canPrev () {
      return this.token.history.length
    },
    canNext () {
      return this.token.next
    },
  },
  methods: {
    prevList () {
      if (this.canPrev)
        this.$store.dispatch('prevList')
    },
    nextList () {
      if (this.canNext)
        this.$store.dispatch('nextList')
    },
  },
}
</script>
