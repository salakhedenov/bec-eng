<template>

  <div>
    <Header/>
    <div class="wrapper">
      <div class="weekno">
        <h2>{{project.title}}</h2>
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
        <DrawingRow
          :users="users"
          @created="addNewDrawing"
        />
      </div>
      <div>
        <button class="btn btn--red">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/app/Header'
import DrawingRow from '@/components/DrawingRow'

export default {
  name: 'project-detail',
  data: () => ({
    drawings: [],
    users: [],
    project: {},
    loading: true
  }),
  async mounted () {
    const id = this.$route.params.id
    // const drawings = await this.$store.dispatch('fetchDrawings')
    this.users = await this.$store.dispatch('fetchUsers')
    this.project = await this.$store.dispatch('fetchProjectById', id)
    setTimeout(this.fillUpDrawings, 1000)
  },
  methods: {
    async fillUpDrawings () {
      const drawings = await this.$store.dispatch('fetchDrawings')
      this.drawings = (drawings.filter(d => d.projectId === this.$route.params.id))
        .map(drawing => {
          return {
            ...drawing,
            developer: this.users.find(u => u.id === drawing.userId).info.name
              ? this.users.find(u => u.id === drawing.userId).info.name
              : 'No Name'
          }
        })
    },
    addNewDrawing (drawing) {
      this.drawings.push(drawing)
    }
  },
  components: {
    Header, DrawingRow
  }
}
</script>
