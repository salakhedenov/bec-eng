<template>
  <form class="sheet__column" @submit.prevent="submitHandler">
      <div class="sheet__row">
        <input
          class="input__project"
          type="text"
          v-model="code"
        />
      </div>
      <div class="sheet__row">
        <input
          class="input__project"
          type="text"
          v-model="title"
        />
      </div>
      <div class="sheet__row">
        <input
          class="input__project"
          type="text"
          v-model="client"
        />
      </div>
      <div class="sheet__row">
        <select
          class="select__"
          name=""
          id=""
          v-model="userId"
        >
          <option
            v-for="user of users"
            :key="user.id"
            :value="user.id"
          >
            {{user.info.name}}
          </option>
        </select>
      </div>
      <div class="sheet__row">
        <button class="btn__pj btn__pj--red">Add</button>
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
    code: '',
    title: '',
    client: '',
    userId: '',
    loading: true
  }),
  methods: {
    async submitHandler () {
      try {
        const projectData = {
          code: this.code,
          title: this.title,
          client: this.client,
          userId: this.userId,
          progress: 0,
          startDate: Date()
        }

        const project = await this.$store.dispatch('createProject', projectData)

        console.log(projectData)
        this.code = ''
        this.title = ''
        this.client = ''
        this.userId = ''
        this.$emit('created', project)
      } catch (e) {}
    }
  }
}
</script>
