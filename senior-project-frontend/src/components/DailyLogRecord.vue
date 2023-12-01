<template>
    <br>

    <div class="test">
        <el-calendar v-model="selectedDay">
        <template #header="{ date }">
            <span style="font-weight: bold; font-size: 30px;">{{ date }}</span>
            <el-button-group>
                <el-button type="primary" size="large" @click="selectDate('prev-month')">
                Previous Month
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
    <el-button v-if="!haveRecordOnFormatedSelectedDay()" type="primary" size="large" @click="openModal()">
        Add Log
    </el-button>

    <el-button v-if="haveRecordOnFormatedSelectedDay()" type="primary" size="large" @click="openModalForUpdate()">
        Update Log
    </el-button>

    <el-button v-if="haveRecordOnFormatedSelectedDay()" type="danger" size="large" @click="deleteRecord()">
        Delete Log
    </el-button>

    <el-drawer
        ref="drawerRef"
        v-model="dialog"
        title="Log"
        :before-close="handleClose"
        direction="ltr"
        class="demo-drawer"
        :size = formLabelWidth
    >
        <div class="demo-drawer__content">
            
            <DailyLog @callSubmit="onSubmission" ref="childLog"></DailyLog>
            <!--
            <div class="demo-drawer__footer">
                <el-button @click="cancelForm">Cancel</el-button>
                <el-button type="primary" :loading="loading" @click="onSubmission">{{
                loading ? 'Submitting ...' : 'Submit'
                }}</el-button>
            </div>-->
        </div>
    </el-drawer>

</template>

<script>
import DailyLog from './DailyLog.vue';
import axios from 'axios';
import { ElLoading } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
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
            update: false
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
            this.update = false;
            this.$nextTick(() => {
                this.feedToChild();
            });
        },
        openModalForUpdate() {
            this.dialog = true;
            this.update = true;
            this.$nextTick(() => {
                this.feedToChild();
            });
        },
        retriveRecords() {
            // clear records first
            this.records = [];

            const userLoginData = localStorage.getItem("user_login");
            const userData = JSON.parse(userLoginData);
            const userID = userData.email; // don't forget to change this to ID if database changes
            console.log(userData);
            const request = 'http://localhost:8080/entry/selectEntries/' + userID
            axios.get(request).then(res => {
                const entriesRetrived = res.data
                entriesRetrived.forEach(entry => {
                    const log = {
                        date: entry.entryDate,
                        mood: entry.mood,
                        activity: entry.activities.split(',').filter(element => element.trim() !== ''),
                        journal: entry.journal
                    }
                    this.records.push(log)
                    
                });
            })
            .catch(error => {
                console.log(error)
            })
        },
        deleteRecord() {
            ElMessageBox.confirm(
                'Permanently delete the ' + this.formatDateToYYYYMMDD(this.selectedDay) + ' record, Continue?',
                'Warning',
                {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
                }
            )
                .then(() => {
                    this.deleteLogOnSelectedDay();
                    this.recordLoading();
                    setTimeout(() => {
                        ElMessage({
                            type: 'success',
                            message: 'Delete completed',
                        })
                    }, 2000);
                    
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: 'Delete canceled',
                    })
                })
        },
        async deleteLogOnSelectedDay() {
            try {
                const userLoginData = localStorage.getItem("user_login");
                const userData = JSON.parse(userLoginData);
                const userID = userData.email; // don't forget to change this to ID if database changes
                const request = 'http://localhost:8080/entry/deleteEntry/' + userID + '/' + this.formatDateToYYYYMMDD(this.selectedDay);
                console.log(request);
                await axios.delete(request);
            }
            catch (error) {
                console.log(error);
            }
        },
        haveRecordOnDay(date) {
            return this.records.some((record) => record.date === date)
        },
        haveRecordOnFormatedSelectedDay() {
            return this.haveRecordOnDay(this.formatDateToYYYYMMDD());
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
            // if updating
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
                    Diary: record.journal,
                    update: this.update
                }
                console.log(toFeed);
                console.log("update: " + this.update);
                this.$refs.childLog.feedInData(toFeed);
            }
            // if adding new
            else {
                const toFeed = {
                    date: this.formatDateToYYYYMMDD(),
                    mood: '',
                    Entertainments: { classes: false, tests: false, quizes: false, assignments: false, projects: false, party: false, boardGames: false,
                        outdoorPicnic: false, movies: false, concert: false, traveling: false, volunteerActivities: false, gaming: false, 
                        gastronomic: false, reading: false, basketBall: false, soccer: false, football: false, tennis: false, swimming: false,
                        baseball: false, golf: false, trackAndField: false, cycling: false, weightTraining: false },
                    Diary: '',
                    update: this.update
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
                this.$refs.childLog.startSubmission();
                    this.drawerRef.close();
                    this.recordLoading();
                    //done();
                    // 动画关闭需要一定的时间
                    setTimeout(() => {
                        this.loading = false;
                        ElMessage({
                            type: 'success',
                            message: 'Submit completed',
                        })
                    }, 2000);
                })
                .catch(() => {
                // catch error
                });
        },
        onUpdate() {
            if (this.loading) {
                return;
            }
            this.$confirm('Do you want to update the log?')
                .then(() => {
                    this.loading = true;
                    this.$refs.childLog.startSubmission();
                    this.drawerRef.close();
                    this.recordLoading();
                    //done();
                    // 动画关闭需要一定的时间
                    setTimeout(() => {
                        this.loading = false;
                        ElMessage({
                            type: 'success',
                            message: 'Submit completed',
                        })
                    }, 2000);
                })
                .catch(() => {
                // catch error
                });
        },
        handleClose() {
            this.drawerRef.close();
        },
        cancelForm() {
            this.loading = false;
            this.dialog = false;
            clearTimeout(this.timer);
        },
        recordLoading() {
            const loadingInstance = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            setTimeout(() => {
                // 模拟加载完成后的操作
                loadingInstance.close() // 关闭加载状态
                this.$nextTick(() => {
                    // 在DOM更新后执行操作
                    this.retriveRecords();
                })
            }, 2000)
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
.is-selected {
  color: #1989fa;
}
.test /deep/  .el-calendar-table .el-calendar-day{
    height: 8em;
  }
</style>