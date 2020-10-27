<template>
  <div>
    <Header/>
    <div class="wrapper">
      <div class="weekno">
        <h2>DRAWINGS</h2>
      </div>
      <div class="project__table">
        <div class="sheet__column">
          <div class="sheet__row">Code</div>
          <div class="sheet__row">Title</div>
          <div class="sheet__row">Start Date</div>
          <div class="sheet__row">Progress</div>
          <div class="sheet__row">Developer</div>
        </div>
        <div
          class="sheet__column"
          v-for="d of drawings"
          :key="d.id"
          :value="d.id"
        >
          <div class="sheet__row">{{d.code}}</div>
          <div class="sheet__row">{{d.title}}</div>
          <div class="sheet__row">{{d.startDate | date('date')}}</div>
          <div class="sheet__row">{{d.progress}} %</div>
          <div class="sheet__row">{{d.developer}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/app/Header'

export default {
  name: 'drawings',
  data: () => ({
    drawings: [],
    users: [],
    loading: true
  }),
  async mounted () {
    this.users = await this.$store.dispatch('fetchUsers')
    this.fillUpDrawings()
    console.log(this.drawings)
  },
  methods: {
    async fillUpDrawings () {
      const drawings = await this.$store.dispatch('fetchDrawings')
      this.drawings = drawings
        .map(drawing => {
          return {
            ...drawing,
            developer: this.users.find(u => u.id === drawing.userId).info.name
              ? this.users.find(u => u.id === drawing.userId).info.name
              : 'No Name'
          }
        })
    }
  },
  components: {
    Header
  }
}
</script>
