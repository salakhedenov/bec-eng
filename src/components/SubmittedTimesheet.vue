<template>
  <div class="timesheet__table">
    <div class="sheet__column__tsh">
      <div class="sheet__row">Project</div>
      <div class="sheet__row">Drawing</div>
      <div class="sheet__row">Mon</div>
      <div class="sheet__row">Tue</div>
      <div class="sheet__row">Wed</div>
      <div class="sheet__row">Thu</div>
      <div class="sheet__row">Fri</div>
      <div class="sheet__row">Sat</div>
      <div class="sheet__row">Sun</div>
      <div class="sheet__row">Total</div>
      <div class="sheet__row">Progress, %</div>
      <div class="sheet__row">Valid</div>
    </div>
    <div
      v-for="drawing of timesheetDrawings"
      :key="drawing.id"
      class="sheet__column__tsh">
      <div class="sheet__row">
        <p
          placeholder="Project"
          id=""
        >{{drawing.projectCode}}
        </p>
      </div>
      <div class="sheet__row">
        <p
          placeholder="Project"
          id=""
        >{{drawing.drawingCode}}
        </p>
      </div>
      <div class="sheet__row"><p>{{drawing.Mon}}</p></div>
      <div class="sheet__row"><p>{{drawing.Tue}}</p></div>
      <div class="sheet__row"><p>{{drawing.Wed}}</p></div>
      <div class="sheet__row"><p>{{drawing.Thu}}</p></div>
      <div class="sheet__row"><p>{{drawing.Fri}}</p></div>
      <div class="sheet__row"><p>{{drawing.Sat}}</p></div>
      <div class="sheet__row"><p>{{drawing.Sun}}</p></div>
      <div class="sheet__row"><p>{{drawing.totalHours}}</p></div>
      <div class="sheet__row"><p>{{drawing.progress}}</p></div>
      <div class="sheet__row"><p><input type="checkbox" checked disabled></p></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleWeek: {
      required: true
    }
  },
  data: () => ({
    timesheetDrawings: []
  }),
  methods: {
    async fetchSubmittedTimesheet (titleWeek) {
      this.timesheetDrawings = []
      try {
        const timesheets = await this.$store.dispatch('fetchTimesheets')
        const timesheet = timesheets.find(t => t.weekNumber === titleWeek)
        const timesheetDrawings = Object.keys(timesheet.drawings).map(key => ({
          ...timesheet.drawings[key], id: key
        }))
        if (timesheetDrawings) {
          this.timesheetDrawings = await Promise.all(timesheetDrawings.map(async drw => {
            const drawing = await this.$store.dispatch('fetchDrawingById', drw.id)
            const drawingCode = drawing.code
            const totalHours = drw.Mon + drw.Tue + drw.Wed + drw.Thu + drw.Fri + drw.Sat + drw.Sun
            const projectCode = (await this.$store.dispatch('fetchProjectById', drawing.projectId)).code
            return {
              ...drw,
              drawingCode,
              projectCode,
              totalHours
            }
          }))
        } else {
          this.timesheetDrawings = []
        }
        // this.$emit('updatedWeek', timesheet.weekNumber)
      } catch (e) {}
    }
  },
  watch: {
    titleWeek (titleWeek) {
      this.fetchSubmittedTimesheet(titleWeek)
    }
  },
  mounted () {
    this.fetchSubmittedTimesheet(this.titleWeek)
  }
}
</script>
