<template>
    <br>

    <table class="table table-responsive recordTable">
        <thead>
            <tr>
                <th class="col-3 tableTitle">Date</th>
                <th class="col-2 tableTitle">Mood</th>
                <th class="col-2 tableTitle">Activities</th>
                <th class="col-5 tableTitle">Journal</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in records" :key="item.date">
                <td class="tableTitle"> {{ item.date }}</td>
                <td class="tableTitle"> 
                    <span v-if="item.mood === 0">Super Bad</span>
                    <span v-else-if="item.mood === 1">Bad</span>
                    <span v-else-if="item.mood === 2">Not Bad</span>
                    <span v-else-if="item.mood === 3">Great</span>
                    <span v-else-if="item.mood === 4">Super Great</span>    
                </td>
                <td class="activity">
                    <div v-for="(act, index) in item.activity" :key="index">
                            {{ act }}
                    </div>
                </td>
                <td class="activity">
                    {{ item.journal }}
                </td>
            </tr>
        </tbody>
    </table>
    

    <!--
    <div class="row">
        <div class="col-10"></div>
        <button @click="handleClick()" type="button" class="btn btn-primary col-2" data-bs-toggle="modal" data-bs-target="#dailyLog">
            New DailyLog
        </button>

        <div class="modal fade" id="dailyLog" data-bs-keyboard="false" data-bs-backdrop="static" tabindex="-1" aria-labelledby="dailyLog" aria-hidden="true" ref="modal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="dailyLog">DailyLog</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <DailyLog @transmitDailyLog="receiveDailyLog" ref="dailyLogRef" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="closeButton">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    -->

</template>

<script>
//import DailyLog from './DailyLog.vue';
import axios from 'axios';

export default ({
    //components: {DailyLog},
    data() {
        return {
            records: [
                
            ],
            receivedLog: null,
            modalOpen: false
        }
    },
    mounted() {
        this.retriveRecords();
    },
    methods: {
        /*
        receiveDailyLog(dailyLog) {
            this.receivedLog = dailyLog;
            this.records.unshift({log: this.receivedLog})
            this.$refs.closeButton.click()
        },
        */
        retriveRecords() {
            const userLoginData = localStorage.getItem("user_login");
            const userData = JSON.parse(userLoginData);
            const userID = userData.email; // don't forget to change this to ID if database changes
            const request = 'http://localhost:8080/entry/selectEntries/' + userID
            axios.get(request).then(res => {
                const entriesRetrived = res.data
                console.log(res.data)
                entriesRetrived.forEach(entry => {
                    const log = {
                        date: entry.entryDate,
                        mood: entry.mood,
                        activity: entry.activities.split(',').filter(element => element.trim() !== ''),
                        journal: entry.journal
                    }
                    console.log(log)
                    this.records.push(log)
                    console.log(this.records)
                    
                });
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
})
</script>

<style scoped>
.recordTable {
    text-align: center;
}
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