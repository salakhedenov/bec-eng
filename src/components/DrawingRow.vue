<template>
  <form class="sheet__column" @submit.prevent="submitHandler">
    <div class="sheet__row">
      <input class="input__project" type="text" v-model="code" />
    </div>
    <div class="sheet__row">
      <input class="input__project" type="text" v-model="title" />
    </div>
    <div class="sheet__row" id="drawingDate">
      {{date | date('date')}}
    </div>
    <div class="sheet__row">
      <input class="input__project" type="text" v-model="progress" />
    </div>
    <div class="sheet__row">
      <select class="select__" name="" id="" v-model="userId">
        <option v-for="user of users" :key="user.id" :value="user.id">
          {{ user.info.name }}
        </option>
      </select>
    </div>
    <div>
      <button class="btn btn--red">Add</button>
    </div>
  </form>

</template>

<script>
export default {
  props: {
    users: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    date: new Date(),
    code: '',
    title: '',
    userId: '',
    progress: null
  }),
  methods: {
    async submitHandler () {
      try {
        const drawingData = {
          code: this.code,
          title: this.title,
          userId: this.userId,
          progress: this.progress,
          startDate: Date(),
          notes: '',
          projectId: this.$route.params.id
        }

        const drawing = await this.$store.dispatch('createDrawing', drawingData)
        console.log(drawingData)
        this.code = ''
        this.title = ''
        this.userId = ''
        this.progress = ''
        this.startDate = ''
        this.notes = ''
        this.$emit('created', drawing)
      } catch (e) {}
    }
  }
}
</script>
