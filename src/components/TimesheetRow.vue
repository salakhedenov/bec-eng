<template>
  <form class="sheet__column__tsh">
    <div class="sheet__row">
      <select
        class="select__"
        placeholder="Project"
        name="select"
        id=""
        v-model="project"
        @change="fetchDrawing"
      >
        <option v-for="p of projects" :key="p.id" :value="p.id">
          {{ p.code }}
        </option>
      </select>
    </div>
    <div class="sheet__row">
      <select class="select__" name="select" id="" v-model="drawing">
        <option v-for="d of drawings" :key="d.id" :value="d.id">
          {{ d.code }}
        </option>
      </select>
    </div>
    <div class="sheet__row">
      <input
        v-model="Mon"
        @change="$emit('change', $event.target.value)"
        class="input__day"
        type="number" />
    </div>
    <div class="sheet__row">
      <input
        v-model="Tue"
        class="input__day"
        type="number" />
    </div>
    <div class="sheet__row">
      <input
        v-model="Wed"
        class="input__day"
        type="number" />
    </div>
    <div class="sheet__row">
      <input
        v-model="Thu"
        class="input__day"
        type="number" />
    </div>
    <div class="sheet__row">
      <input
        v-model="Fri"
        class="input__day"
        type="number" />
    </div>
    <div class="sheet__row">
      <input
        v-model="Sat"
        class="input__day"
        type="number" />
    </div>
    <div class="sheet__row">
      <input
        v-model="Sun"
        class="input__day"
        type="number" />
    </div>
    <div class="sheet__row">
      <input
        class="input__day"
        type="number" />
    </div>
    <div class="sheet__row">
      <input
        v-model="progress"
        class="input__day"
        type="number" />
    </div>
    <div class="sheet__row">
      <input
        v-model="checked"
        type="checkbox"
        @click.once="submitHandler"
        ref="checkbox"
      >
    </div>
  </form>
</template>

<script>
export default {
  model: {
    prop: 'changed',
    event: 'change'
  },
  props: {
  },
  data: () => ({
    projects: [],
    drawings: [],
    project: null,
    drawing: null,
    Mon: null,
    Tue: null,
    Wed: null,
    Thu: null,
    Fri: null,
    Sat: null,
    Sun: null,
    progress: null,
    checked: false
  }),
  methods: {
    async fetchDrawing () {
      if (this.project) {
        const drawings = await this.$store.dispatch('fetchDrawings')
        this.drawings = drawings.filter(d => d.projectId === this.project)
      }
    },
    submitHandler () {
      const formData = {
        [this.drawing]: {
          Mon: this.Mon,
          Tue: this.Tue,
          Wed: this.Wed,
          Thu: this.Thu,
          Fri: this.Fri,
          Sat: this.Sat,
          Sun: this.Sun,
          progress: this.progress
        }
      }
      // console.log(formData)
      this.$emit('timesheetRowData', formData)
      this.$refs.checkbox.setAttribute('disabled', 'disabled')
    }
  },
  async mounted () {
    this.projects = await this.$store.dispatch('fetchProjects')
  },
  watch: {
    // project () {
    //   console.log(this.project)
    // },
    // drawing () {
    //   console.log(this.drawing)
    // },
    // Mon () {
    //   console.log(this.Mon)
    // }
    // checked (val) {
    //   if (val) {
    //     this.submitHandler()
    //   }
    //   console.log(this.checked)
    // }
  }
}
</script>
