<template>
  <div>
    <Header />
    <div class="wrapper">
      <div class="register__container">
      <div>
        Name: {{info.name}}
      </div>
      <div>
        Department: {{department.name}}
      </div>
      <div>
        Position: {{position.name}}
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/app/Header.vue'

export default {
  data: () => ({
    department: '',
    position: ''
  }),
  mounted () {
    setTimeout(this.fetchInfo, 1000)
    // this.fetchInfo()
    console.log(this.department)
  },
  methods: {
    async fetchInfo () {
      this.department = await this.$store.dispatch('fetchDepartmentById', this.$store.getters.info.departmentId)
      this.position = await this.$store.dispatch('fetchPositionById', this.$store.getters.info.positionId)
    }
  },
  computed: {
    info () {
      return this.$store.getters.info
    }
  },
  components: {
    Header
  }
}
</script>
