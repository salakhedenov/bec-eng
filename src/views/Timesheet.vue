<template>
  <div>
    <Header />
    <Loader v-if="loading" />
    <div class="wrapper" v-else>
      <div class="weekno">
        <a
          @click="titleWeek--"
          href="#"
          class="weekno__link"> --prev</a>
        <a href="#" class="weekno__mainlink">Week {{titleWeek}}</a>
        <a
          @click="titleWeek++"
          href="#"
          class="weekno__link">next--></a>
      </div>
      <SubmittedTimesheet
        v-if="titleWeek < currentWeek"
        :titleWeek="titleWeek"
      />
      <CurrentTimesheet
        v-else
        :submit="submit"
      />
      <div v-if="titleWeek === currentWeek">
        <button class="btn btn--red" @click.prevent="submitHandler()">Add</button>
        <button class="btn btn--red">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/app/Header'
import CurrentTimesheet from '@/components/CurrentTimesheet'
import SubmittedTimesheet from '@/components/SubmittedTimesheet'
import weekNumber from '@/utils/week'

export default {
  data: () => ({
    loading: true,
    titleWeek: null,
    currentWeek: weekNumber(),
    submit: false
  }),
  mounted () {
    this.titleWeek = weekNumber()
    this.loading = false
  },
  methods: {
    // updateWeek (updatedWeek) {
    //   this.titleWeek = updatedWeek
    // }
    submitHandler () {
      this.submit = true
    }
  },
  components: {
    Header, CurrentTimesheet, SubmittedTimesheet
  }
}
</script>
