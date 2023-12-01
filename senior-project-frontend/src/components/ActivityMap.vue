<template>
    <br>
    <br>
    <el-row>
        <el-col :span="1"></el-col>
        <el-col :span="23">
            <el-row>
                <el-col id="activityMoodChart" style="width: 100%; height:800px;"></el-col>
            </el-row>
            <hr>
            <br>
            <el-row>
                <el-col id="activityChart" style="width: 100%; height:800px;"></el-col>
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
            activityPair: [],
            moodPair: [],
            activityPair1: [],
            numPair: [],
        }
    },
    mounted() {
        this.SetUp();
    },
    methods: {
        async SetUp() {
            this.LoadingPage(1000);
            await this.RetriveActivityMapData();
            await this.RetrieveActivityData();
            this.SortData();
            this.drawActivityMoodChart();
            this.drawActivityChart();
        },
        RetriveActivityMapData() {
            return new Promise((resolve, reject) => {
                // clear records first
                this.activityPair = [];
                this.moodPair = [];

                const userLoginData = localStorage.getItem("user_login");
                const userData = JSON.parse(userLoginData);
                const userID = userData.email; // don't forget to change this to ID if database changes
                const request = 'http://localhost:8080/entry/activityMoodMap/' + userID;

                axios.get(request).then(res => {
                    const dataRetrieved = res.data;
                    Object.keys(dataRetrieved).forEach(key => {
                        const value = dataRetrieved[key];
                        this.activityPair.push(key);
                        this.moodPair.push(Math.round(value * 10) / 10);
                    })

                    resolve(); // Resolve the promise when retrieval is complete
                }).catch(error => {
                    console.log(error);
                    reject(error); // Reject the promise if there's an error
                });
            });
        },
        RetrieveActivityData() {
            return new Promise((resolve, reject) => {
                // clear records first
                this.activityPair1 = [];
                this.numPair = [];

                const userLoginData = localStorage.getItem("user_login");
                const userData = JSON.parse(userLoginData);
                const userID = userData.email; // don't forget to change this to ID if database changes
                const request = 'http://localhost:8080/entry/activityHistogram/' + userID;

                axios.get(request).then(res => {
                    const dataRetrieved = res.data;
                    Object.keys(dataRetrieved).forEach(key => {
                        const value = dataRetrieved[key];
                        this.activityPair1.push(key);
                        this.numPair.push(value);
                    })

                    resolve(); // Resolve the promise when retrieval is complete
                }).catch(error => {
                    console.log(error);
                    reject(error); // Reject the promise if there's an error
                });
            });
        },
        SortData() {
            const data = this.activityPair.map((value, index) => ({
                activity: value,
                mood: this.moodPair[index]
            }));

            data.sort((a, b) => (b.mood - a.mood));

            this.activityPair = data.map(item => item.activity);
            this.moodPair = data.map(item => item.mood);


            const data1 = this.activityPair1.map((value, index) => ({
                activity: value,
                num: this.numPair[index]
            }));

            data1.sort((a, b) => (b.num - a.num));

            this.activityPair1 = data1.map(item => item.activity);
            this.numPair = data1.map(item => item.num);
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
        drawActivityMoodChart() {
            var myChart = echarts.init(document.getElementById('activityMoodChart'));

            myChart.setOption({
                title: {
                    text: 'Activity Mood Map'
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
                        data: this.activityPair,
                        axisLabel: {
                            alignWithLabel: true,
                            interval: 0,
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '80%',
                        data: this.moodPair,
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            });
        },
        drawActivityChart() {
            var myChart = echarts.init(document.getElementById('activityChart'));

            myChart.setOption({
                title: {
                    text: 'Activity Histogtam'
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
                        data: this.activityPair1,
                        axisLabel: {
                            alignWithLabel: true,
                            interval: 0,
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '80%',
                        data: this.numPair,
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            });
        }
    }
}
</script>