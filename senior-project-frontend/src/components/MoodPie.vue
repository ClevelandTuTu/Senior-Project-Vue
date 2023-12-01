<template>
    <br>
    <br>
    <el-row>
        <el-col :span="1"></el-col>
        <el-col :span="23">
            <el-row>
                <el-col id="moodPie" style="width: 100%; height:90vh;"></el-col>
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
            moodNum: []
        }
    },
    mounted() {
        this.SetUp();
    },
    methods: {
        async SetUp() {
            this.LoadingPage(1000);
            await this.RetrieveMoodData();
            this.drawMoodHistogram();
        },
        RetrieveMoodData() {
            return new Promise((resolve, reject) => {
                // clear records first
                this.moodNum = [];

                const userLoginData = localStorage.getItem("user_login");
                const userData = JSON.parse(userLoginData);
                const userID = userData.email; // don't forget to change this to ID if database changes
                const request = 'http://localhost:8080/entry/moodHistogram/' + userID;

                axios.get(request).then(res => {
                    const dataRetrieved = res.data;
                    dataRetrieved.forEach(value => {
                        console.log(value);
                        this.moodNum.push(value);
                    })
                    console.log(this.moodNum);

                    resolve(); // Resolve the promise when retrieval is complete
                }).catch(error => {
                    console.log(error);
                    reject(error); // Reject the promise if there's an error
                });
            });
        },
        drawMoodHistogram() {
            var myChart = echarts.init(document.getElementById('moodPie'));

            myChart.setOption({

                legend: {
                    top: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: 'Nightingale Chart',
                        type: 'pie',
                        radius: [50, 250],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 8
                        },
                        data: [
                            { value: this.moodNum[0], name: 'Super Great Mood', itemStyle: { color: '#0074D9' } },
                            { value: this.moodNum[1], name: 'Great Mood', itemStyle: { color: '#3498db' } },
                            { value: this.moodNum[2], name: 'Not Bad Mood', itemStyle: { color: '#FFD700' } },
                            { value: this.moodNum[3], name: 'Bad Mood', itemStyle: { color: '#FFA500' } },
                            { value: this.moodNum[4], name: 'Super Bad Mood', itemStyle: { color: '#FF4500' } },
                        ]
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