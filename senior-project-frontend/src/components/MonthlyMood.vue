<template>
    <br>
    <br>
    <el-row>
        <el-col :span="21"></el-col>
        <el-col :span="3">
            <el-button-group>
                <el-button type="primary" size="large" @click="toPreviousMonth()">
                Previous Month
                </el-button>
                <el-button type="primary" size="large" @click="toNextMonth()">
                Next Month
                </el-button>
            </el-button-group>
        </el-col>
    </el-row>
    <br>
    <el-row>
        <el-col :span="1"></el-col>
        <el-col :span="23">
            <el-row>
                <el-col :span="23" id="chart" style="width: 100%; height:800px;"></el-col>
            </el-row>
            <hr>
            <br>
            <el-row>
                <el-col :span="22"></el-col>
                <el-col :span="2">
                    <div class="flex flex-wrap items-center">
                        <el-dropdown>
                        <el-button type="primary" size="large">
                            Length
                            <font-awesome-icon icon="fa-solid fa-caret-down" style="font-size: 1.7em; margin-left: 10px" />
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="ChangeAverageLength(5)">5</el-dropdown-item>
                                <el-dropdown-item @click="ChangeAverageLength(6)">6</el-dropdown-item>
                                <el-dropdown-item @click="ChangeAverageLength(7)">7</el-dropdown-item>
                                <el-dropdown-item @click="ChangeAverageLength(8)">8</el-dropdown-item>
                                <el-dropdown-item @click="ChangeAverageLength(9)">9</el-dropdown-item>
                                <el-dropdown-item @click="ChangeAverageLength(10)">10</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                        </el-dropdown>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col id="rollingAverage" style="width: 100%; height:800px;"></el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { ElLoading } from 'element-plus';
import axios from 'axios';
import * as echarts from 'echarts';

use([GridComponent, LineChart, CanvasRenderer])

export default {
    data() {
        return {
            records: [],
            monthData: [],
            month: "",
            datePair: [],
            moodPair: [],
        }
    },
    components: {
        
    },
    setup() {
    },
    mounted() {
        this.SetUp();
    },
    methods: {
        async SetUp() {
            this.LoadingPage(1000);
            await this.retriveRecords();
            var date = new Date();
            var yearPart = date.getFullYear();
            var monthPart = date.getMonth();
            this.month = yearPart + '-' + monthPart;
            this.toNextMonth();
            this.draw();
            await this.RetrieveMoodData(5);
            this.SortData();
            this.drawRollingAverage();
        },
        retriveRecords() {
            return new Promise((resolve, reject) => {
                // clear records first
                this.records = [];

                const userLoginData = localStorage.getItem("user_login");
                const userData = JSON.parse(userLoginData);
                const userID = userData.email; // don't forget to change this to ID if database changes
                const request = 'http://70.42.212.64:8080/entry/selectEntries/' + userID;

                axios.get(request).then(res => {
                    const entriesRetrieved = res.data;
                    entriesRetrieved.forEach(entry => {
                        const log = {
                            date: entry.entryDate,
                            mood: entry.mood,
                            activity: entry.activities.split(',').filter(element => element.trim() !== ''),
                            journal: entry.journal
                        }
                        this.records.push(log);
                    });

                    resolve(); // Resolve the promise when retrieval is complete
                }).catch(error => {
                    console.log(error);
                    reject(error); // Reject the promise if there's an error
                });
            });
        },
        RetrieveMoodData(length) {
            return new Promise((resolve, reject) => {
                // clear records first
                this.datePair = [];
                this.moodPair = [];

                const userLoginData = localStorage.getItem("user_login");
                const userData = JSON.parse(userLoginData);
                const userID = userData.email; // don't forget to change this to ID if database changes
                const request = 'http://70.42.212.64:8080/entry/rollingAvg/' + userID + '/' + length;

                axios.get(request).then(res => {
                    const dataRetrieved = res.data;
                    console.log(dataRetrieved);
                    Object.keys(dataRetrieved).forEach(date => {
                        const fullDate = date
                        this.datePair.push(date.substring(0,10));
                        this.moodPair.push(Math.round(dataRetrieved[fullDate] * 10) / 10)
                        //this.moodPair.push(mood);
                    })
                    console.log(this.datePair);
                    console.log(this.moodPair);

                    resolve(); // Resolve the promise when retrieval is complete
                }).catch(error => {
                    console.log(error);
                    reject(error); // Reject the promise if there's an error
                });
            });
        },
        SortData() {
            // 创建包含对象的数组
            let combinedArray = this.datePair.map((date, index) => ({ date, mood: this.moodPair[index] }));
            // 按日期从前往后排序
            combinedArray.sort((a, b) => new Date(a.date) - new Date(b.date));
            console.log(combinedArray)
            // 恢复为原始的 dateArray 和 moodArray
            this.datePair = combinedArray.map(item => item.date);
            this.moodPair = combinedArray.map(item => item.mood);

            //console.log(this.datePair);
            //console.log(this.moodPair);
        },
        getRecordsInMonth(yearAndMonth) {
            return this.records.filter(record => record.date.includes(yearAndMonth));
        },
        createArrayForRecords(yearAndMonth) {
            const records = this.getRecordsInMonth(yearAndMonth);
            var dataArray = []
            records.forEach(item => {
                const dateString = item.date;
                const parts = dateString.split('-');
                const dayPart = parts[2];
                
                var moodPart = item.mood;
                dataArray.push([dayPart, moodPart])
            })
            console.log(dataArray);
            return dataArray;
        },
        toNextMonth() {
            const parts = this.month.split('-');
            var yearPart = JSON.parse(Number(parts[0]).toString());
            var monthPart = JSON.parse(Number(parts[1]).toString());
            var newMonth = '';
            if (monthPart == 12) {
                newMonth = (yearPart + 1) + "-" + "01";
            }
            else if (monthPart >= 9) {
                newMonth = yearPart + "-" + (monthPart + 1);
            }
            else {
                newMonth = yearPart + "-0" + (monthPart + 1);
            }
            console.log(newMonth);
            this.month = newMonth;
            this.draw();
        },
        toPreviousMonth() {
            const parts = this.month.split('-');
            var yearPart = JSON.parse(Number(parts[0]).toString());
            var monthPart = JSON.parse(Number(parts[1]).toString());
            var newMonth = '';
            if (monthPart == 1) {
                newMonth = (yearPart - 1) + "-" + "12";
            }
            else if (monthPart >= 11) {
                newMonth = yearPart + "-" + (monthPart - 1);
            }
            else {
                newMonth = yearPart + "-0" + (monthPart - 1);
            }
            console.log(newMonth);
            this.month = newMonth;
            this.draw();
        },
        draw() {
            var myChart = echarts.init(document.getElementById('chart'));

            myChart.setOption({
                title: {
                    text: this.month + ' Mood Chart'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    interval: 1,
                    min: 0,
                    max: 31
                 },
                yAxis: {
                    type: 'value',
                    interval: 1,
                    min: 0,
                    max: 4,
                    axisLabel: {
                        formatter: function (value) {
                            if (value === 0) {
                                return 'super bad';
                            } else if (value === 1) {
                                return 'bad';
                            } else if (value === 2) {
                                return 'not bad';
                            } else if (value === 3) {
                                return 'good';
                            } else if (value === 4) {
                                return 'super good';
                            } else {
                                return ''; // 返回空字符串或其他默认值
                            }
                        }
                    }
                },
                series: [
                    {
                        data: this.createArrayForRecords(this.month),
                        type: 'line',
                        smooth: true
                    }
                ]
            });
        },
        drawRollingAverage() {
            var myChart = echarts.init(document.getElementById('rollingAverage'));

            myChart.setOption({
                title: {
                    text: 'Rolling Average Mood Chart'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.datePair,
                        axisLabel: {
                            alignWithLabel: true,
                            interval: 0,
                            rotate: 45,
                        }
                    }
                ],
                yAxis: {
                    type: 'value',
                    interval: 1,
                    min: 0,
                    max: 4,
                },
                series: [
                    {
                        data: this.moodPair,
                        type: 'line',
                        smooth: true
                    }
                ]
            });
        },
        LoadingPage(time) {
            const loadingInstance = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            setTimeout(() => {
                // 模拟加载完成后的操作
                loadingInstance.close() // 关闭加载状态
            }, time)
        },
        async ChangeAverageLength(length) {
            await this.RetrieveMoodData(length);
            this.SortData();
            this.drawRollingAverage();
        }

    }
}
</script>

<style scoped>
.chart {
  height: 40vh;
}
</style>