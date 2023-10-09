<template>
    <h2>Here is your past record:</h2>
    <br>

    <table class="table table-responsive">
        <thead>
            <tr>
                <th class="col-3 tableTitle">Date</th>
                <th class="col-3 tableTitle">Mood</th>
                <th class="col-6 tableTitle">Activities</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in records" :key="item.log.date">
                <td class="tableTitle"> {{ item.log.date }}</td>
                <td class="tableTitle"> {{ item.log.mood }}</td>
                <td class="activity">
                    <div v-for="(value, key) in item.log.Entertainments" :key="key">
                        <div v-if="value">
                            {{ key }}
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    

    <div class="row">
        <div class="col-10"></div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary col-2" data-bs-toggle="modal" data-bs-target="#dailyLog">
            New DailyLog
        </button>

        <!-- Modal -->
        <div class="modal fade" id="dailyLog" data-bs-keyboard="false" data-bs-backdrop="static" tabindex="-1" aria-labelledby="dailyLog" aria-hidden="true" ref="modal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="dailyLog">DailyLog</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <DailyLog @transmitDailyLog="receiveDailyLog" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="closeButton">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import DailyLog from './DailyLog.vue';

export default ({
    components: {DailyLog},
    data() {
        return {
            records: [
                {
                    log: {
                        date: 'Tue Oct 03 2023 00:30:00 GMT-0400 (北美东部夏令时间)',
                        mood: 'Super Great',
                        Entertainments: { classes: true, tests: false, quizes: false, assignments: true, projects: false, party: false, boardGames: false,
                            outdoorPicnic: false, movies: true, concert: false, traveling: false, volunteerActivities: false, gaming: true, 
                            gastronomic: true, reading: false, basketBall: false, soccer: false, football: false, tennis: false, swimming: false,
                            baseball: false, golf: false, trackAndField: false, cycling: false, weightTraining: false },
                        Diary: { title: 'hihihi', content: '1111111111' }
                    }
                },
                {
                    log: {
                        date: 'Wed Oct 04 2023 13:34:00 GMT-0400 (北美东部夏令时间)',
                        mood: 'Super Bad',
                        Entertainments: { classes: false, tests: true, quizes: false, assignments: false, projects: false, party: false, boardGames: false,
                            outdoorPicnic: true, movies: false, concert: false, traveling: false, volunteerActivities: false, gaming: true, 
                            gastronomic: false, reading: true, basketBall: false, soccer: false, football: false, tennis: false, swimming: false,
                            baseball: false, golf: false, trackAndField: false, cycling: false, weightTraining: true },
                        Diary: { title: 'hellohellohello', content: '22222222222' }
                    }
                }
            ],
            receivedLog: null,
            modalOpen: false
        }
    },
    methods: {
        receiveDailyLog(dailyLog) {
            this.receivedLog = dailyLog;
            this.records.unshift({log: this.receivedLog})
            this.$refs.closeButton.click()
        }
    }
})
</script>

<style scoped>
.tableTitle {
    font-size: 1.5em;
}
.activity {
    font-size: 1em;
}
.table {
    margin: auto;
}
</style>