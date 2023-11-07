<template>
    <br>
    <!--
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
    </table>-->

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

    <div class="test">
        <el-calendar v-model="selectedDay">
        <template #header="{ date }">
            <span style="font-weight: bold; font-size: 30px;">{{ date }}</span>
            <el-button-group>
                <el-button type="primary" size="large" @click="selectDate('prev-month')" :icon="ArrowLeft">
                <ArrowLeft />Previous Month
                </el-button>
                <el-button type="primary" size="large" @click="selectDate('today')">Today</el-button>
                <el-button type="primary" size="large" @click="selectDate('next-month')">
                Next Month
                </el-button>
            </el-button-group>
        </template>
        <template #date-cell="{ data }">
            <div :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }}
                {{ data.isSelected ? '✔️' : '' }}
                <div v-if="haveRecordOnDay(data.day)" style="text-align: center;">
                    <div v-if="getMoodOnDay(data.day) == 0">
                        <font-awesome-icon icon="fa-regular fa-face-sad-tear" style="font-size: 4em" />
                    </div>
                    <div v-else-if="getMoodOnDay(data.day) == 1">
                        <font-awesome-icon icon="fa-regular fa-face-frown" style="font-size: 4em" />
                    </div>
                    <div v-else-if="getMoodOnDay(data.day) == 2">
                        <font-awesome-icon icon="fa-regular fa-face-meh" style="font-size: 4em" />
                    </div>
                    <div v-else-if="getMoodOnDay(data.day) == 3">
                        <font-awesome-icon icon="fa-regular fa-face-smile-beam" style="font-size: 4em" />
                    </div>
                    <div v-else-if="getMoodOnDay(data.day) == 4">
                        <font-awesome-icon icon="fa-regular fa-face-laugh-beam" style="font-size: 4em" />
                    </div>
                </div>
                <div v-else>
                    
                </div>
            </div>
        </template>
    </el-calendar>
    </div>

    <hr>
    <el-button type="primary" size="large">
        New Log
    </el-button>

    <el-button type="primary" size="large" @click="openModal()">
        Open Drawer with nested form
    </el-button>

    <el-drawer
        ref="drawerRef"
        v-model="dialog"
        title="I have a nested form inside!"
        :before-close="handleClose"
        direction="ltr"
        class="demo-drawer"
        :size = formLabelWidth
    >
        <div class="demo-drawer__content">
            
            <DailyLog @callSubmit="onSubmission" ref="childLog"></DailyLog>
            <div class="demo-drawer__footer">
                <el-button @click="cancelForm">Cancel</el-button>
                <el-button type="primary" :loading="loading" @click="onSubmission">{{
                loading ? 'Submitting ...' : 'Submit'
                }}</el-button>
            </div>
        </div>
    </el-drawer>

</template>

<script>
import DailyLog from './DailyLog.vue';
import axios from 'axios';
//import { ElDrawer } from 'element-plus';

export default ({
    components: {DailyLog},
    data() {
        return {
            selectedDay: new Date(),
            records: [
                
            ],
            receivedLog: null,
            modalOpen: false,
            formLabelWidth: '50%',
            drawerRef: null,
            dialog: false,
            loading: false,
            timer: null,
        }
    },
    mounted() {
        this.retriveRecords();
        this.drawerRef = this.$refs.drawerRef;
    },
    methods: {
        /*
        receiveDailyLog(dailyLog) {
            this.receivedLog = dailyLog;
            this.records.unshift({log: this.receivedLog})
            this.$refs.closeButton.click()
        },
        */
        openModal() {
            this.dialog = true;
            this.$nextTick(() => {
                this.feedToChild();
            });
        },
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
        },
        haveRecordOnDay(date) {
            return this.records.some((record) => record.date === date)
        },
        getSelectedDay() {
            return this.selectedDay;
        },
        getRecordOnDay(date) {
            return this.records.find((record) => record.date === date)
        },
        getMoodOnDay(date) {
            var record = this.getRecordOnDay(date);
            if (record != null) {
                return record.mood
            }
        },
        getMoodForChild() {
            const selectedDateStr = this.formatDateToYYYYMMDD();
            if (this.haveRecordOnDay(selectedDateStr)) {
                return this.getMoodOnDay(selectedDateStr);
            }
            else {
                return '';
            }
        },
        feedToChild() {
            const selectedDateStr = this.formatDateToYYYYMMDD();
            if (this.haveRecordOnDay(selectedDateStr)) {
                const record = this.getRecordOnDay(selectedDateStr);

                let activityArray = record.activity;
                console.log(activityArray);
                let entertainmentsObject = { classes: false, tests: false, quizes: false, assignments: false, projects: false, party: false, boardGames: false,
                    outdoorPicnic: false, movies: false, concert: false, traveling: false, volunteerActivities: false, gaming: false, 
                    gastronomic: false, reading: false, basketBall: false, soccer: false, football: false, tennis: false, swimming: false,
                    baseball: false, golf: false, trackAndField: false, cycling: false, weightTraining: false };
                activityArray.forEach(activity => {
                    let actString = activity.trim()
                    if (actString in entertainmentsObject) {
                        
                        entertainmentsObject[actString] = true;
                    }
                });
                const toFeed = {
                    date: record.date,
                    mood: record.mood,
                    Entertainments: entertainmentsObject,
                    Diary: { title: '', content: '' },
                }
                console.log(toFeed);
                this.$refs.childLog.feedInData(toFeed);
            }
            else {
                const toFeed = {
                    date: this.formatDateToYYYYMMDD(),
                    mood: '',
                    Entertainments: { classes: false, tests: false, quizes: false, assignments: false, projects: false, party: false, boardGames: false,
                        outdoorPicnic: false, movies: false, concert: false, traveling: false, volunteerActivities: false, gaming: false, 
                        gastronomic: false, reading: false, basketBall: false, soccer: false, football: false, tennis: false, swimming: false,
                        baseball: false, golf: false, trackAndField: false, cycling: false, weightTraining: false },
                    Diary: { title: '', content: '' },
                }
                this.$refs.childLog.feedInData(toFeed);
            }
        },
        formatDateToYYYYMMDD() {
            const year = this.selectedDay.getFullYear();
            const month = String(this.selectedDay.getMonth() + 1).padStart(2, '0');
            const day = String(this.selectedDay.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        selectDate(val) {
            const currentMonth = this.selectedDay.getMonth();
            const currentYear = this.selectedDay.getFullYear();

            if (val === "today") {
                this.selectedDay = new Date();
            }
            else if (val === "prev-month") {
                const prevMonthDate = new Date(currentYear, currentMonth - 1, this.selectedDay.getDate());

                // if last month has the same date
                if (prevMonthDate.getMonth() === currentMonth - 1) {
                    this.selectedDay = prevMonthDate;
                } 
                else {
                    // if last month Does NOT has the same date, go to the Last Day of that month
                    // special note: 0 of current month is last day of last month!!
                    this.selectedDay = new Date(currentYear, currentMonth, 0); // 切换到上一个月的最后一天
                }
                //this.selectedDay = new Date(this.selectedDay.setMonth(this.selectedDay.getMonth() - 1))
            }
            else if (val === "next-month") {
                const nextMonthDate = new Date(currentYear, currentMonth + 1, this.selectedDay.getDate());

                // if last month has the same date
                if (nextMonthDate.getMonth() === currentMonth + 1) {
                    this.selectedDay = nextMonthDate;
                } 
                else {
                    // if last month Does NOT has the same date, go to the Last Day of that month
                    this.selectedDay = new Date(currentYear, currentMonth + 2, 0); // 切换到下一个月的最后一天
                }
                //this.selectedDay = new Date(this.selectedDay.setMonth(this.selectedDay.getMonth() + 1))
            }
        },
        onSubmission() {
            if (this.loading) {
                return;
            }
            this.$confirm('Do you want to submit?')
                .then(() => {
                this.loading = true;
                this.timer = setTimeout(() => {
                    this.$refs.childLog.startSubmission();
                    this.drawerRef.close();
                    this.retriveRecords();
                    //done();
                    // 动画关闭需要一定的时间
                    setTimeout(() => {
                    this.loading = false;
                    }, 400);
                }, 2000);
                })
                .catch(() => {
                // catch error
                });
                
            //this.drawerRef.close();
        },
        handleClose() {
            this.drawerRef.close();
        },
        cancelForm() {
            this.loading = false;
            this.dialog = false;
            clearTimeout(this.timer);
        },
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
.is-selected {
  color: #1989fa;
}
.test /deep/  .el-calendar-table .el-calendar-day{
    height: 8em;
  }
</style>