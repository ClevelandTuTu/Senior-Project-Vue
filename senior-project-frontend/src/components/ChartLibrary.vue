<template>
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
    <hr>
    <br>
    <el-row>
        <el-col :span="1"></el-col>
        <el-col :span="23" id="chart" style="width: 100%; height:800px;"></el-col>
    </el-row>
</template>

<script>
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { ElLoading } from 'element-plus';
//import VChart from 'vue-echarts'
//import { ref } from 'vue'
import axios from 'axios';
import * as echarts from 'echarts';

use([GridComponent, LineChart, CanvasRenderer])

export default {
    data() {
        return {
            records: [],
            monthData: [],
            month: "",
            option: {
                xAxis: {
                    type: 'category',
                    interval: 1,
                    min: 0,
                    max: 31
                },
                yAxis: {
                    type: 'value',
                    interval: 1,
                    min: 0,
                    max: 4
                },
                series: [
                    {
                        data: this.monthData,
                        type: 'line',
                        smooth: true
                    }
                ]
            }
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
        },
        retriveRecords() {
            return new Promise((resolve, reject) => {
                // clear records first
                this.records = [];

                const userLoginData = localStorage.getItem("user_login");
                const userData = JSON.parse(userLoginData);
                const userID = userData.email; // don't forget to change this to ID if database changes
                const request = 'http://localhost:8080/entry/selectEntries/' + userID;

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
                    text: this.month + ' mood change'
                },
                tooltip: {},
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
        }

    }
}
</script>

<style scoped>
.chart {
  height: 40vh;
}
</style>