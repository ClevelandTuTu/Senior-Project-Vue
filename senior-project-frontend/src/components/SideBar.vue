<template>
    <hr>
    <div class="d-flex flex-column flex-shrink-0 p-3 text-whitebg-light" id="Sidebar">
        <ul class="nav  flex-column mb-auto">
            <li class="nav-item" @click="swtichToDailyLog()">
                <a class="nav-link active" href="#">DailyLog</a>
            </li>
            <li class="nav-item" @click="switchToRecord()">
                <a class="nav-link" href="#">Record</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Analysis</a>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    emits: ['openRecord', 'openDailyLog'],
    methods: {
        switchToRecord() {
            this.$emit('openRecord')
        },
        swtichToDailyLog() {
            this.$emit('openDailyLog')
        }
    }
}

</script>