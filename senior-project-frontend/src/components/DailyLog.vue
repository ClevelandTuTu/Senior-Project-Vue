<template>
    <div class="container-fluid">
            <form id="dailyQuiz">
                {{ log.date }}

                
                <div class="title">
                    <h4>Please choose the date you want to record for:</h4>
                </div>
                <div class="col-3">
                    <VueDatePicker v-model="log.date" :max-date="new Date()" :enable-time-picker="true" />
                </div>
                
                <hr>
                
                <div class="accordion" id="dailyLog">
                    <div class="accordion-item" id="moodLog">
                        <h2 class="accordion-header" id="moodQuiz-heading">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Mood
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                <h4>How do you feel?</h4>
                                <div class="row">
                                    <div class="col">
                                        <i class="fa-solid fa-face-grin-stars"></i>
                                        <input type="radio" v-model="log.mood" value="Super Great" class="btn-check" name="mood" id="mood1" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="mood1">Super Great</label>
                                    </div>
                                    <div class="col">
                                        <input type="radio" v-model="log.mood" value="Great" class="btn-check" name="mood" id="mood2" autocomplete="off">
                                        <label class="btn btn-outline-info" for="mood2">Great</label>
                                    </div>
                                    <div class="col">
                                        <input type="radio" v-model="log.mood" value="So So" class="btn-check" name="mood" id="mood3" autocomplete="off">
                                        <label class="btn btn-outline-warning" for="mood3">So So</label>
                                    </div>
                                    <div class="col">
                                        <input type="radio" v-model="log.mood" value="Bad" class="btn-check" name="mood" id="mood4" autocomplete="off">
                                        <label class="btn btn-outline-dark" for="mood4">Bad</label>
                                    </div>
                                    <div class="col">
                                        <input type="radio" v-model="log.mood" value="Super Bad" class="btn-check" name="mood" id="mood5" autocomplete="off">
                                        <label class="btn btn-outline-danger" for="mood5">Super Bad</label>
                                    </div>
                                </div>
                          
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item" id="sportsQuiz-heading">
                        <h2 class="accordion-header" id="sportsQuiz-heading">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Activities
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                                <h4>What did you do today?</h4>
                                <br>
                                <h6>1. Study and Work</h6>
                                <div class="row">
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.classes" class="btn-check" id="Classes" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Classes">Classes</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.tests" class="btn-check" id="Tests" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Tests">Tests</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.quizes" class="btn-check" id="Quizes" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Quizes">Quizes</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.assignments" class="btn-check" id="Assignments" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Assignments">Assignments</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.projects" class="btn-check" id="Projects" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Projects">Projects</label>
                                    </div>
                                </div>
                                <br>
                                <h6>2. Entertainments</h6>
                                <div class="row">
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.party" class="btn-check" id="Party" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Party">Party</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.boardGames" class="btn-check" id="Board Games" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Board Games">Board Games</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.outdoorPicnic" class="btn-check" id="outdoor picnic" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="outdoor picnic">outdoor picnic</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.movies" class="btn-check" id="Movies" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Movies">Movies</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.concert" class="btn-check" id="Concert" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Concert">Concert</label>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.traveling" class="btn-check" id="Traveling" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Traveling">Traveling</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.volunteerActivities" class="btn-check" id="Volunteer Activities" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Volunteer Activities">Volunteer Activities</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.gaming" class="btn-check" id="Gaming" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Gaming">Gaming</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.gastronomic" class="btn-check" id="Gastronomic" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Gastronomic">Gastronomic</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.reading" class="btn-check" id="Reading" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Reading">Reading</label>
                                    </div>
                                </div>
                                <br>
                                <h6>3. Sports</h6>
                                <div class="row">
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.basketBall" class="btn-check" id="Basketball" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Basketball">Basketball</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.soccer" class="btn-check" id="Soccer" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Soccer">Soccer</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.football" class="btn-check" id="Football" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Football">Football</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.tennis" class="btn-check" id="Tennis" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Tennis">Tennis</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.swimming" class="btn-check" id="Swimming" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Swimming">Swimming</label>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.baseball" class="btn-check" id="Baseball" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Baseball">Baseball</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.golf" class="btn-check" id="Golf" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Golf">Golf</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.trackAndField" class="btn-check" id="Track and Field" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Track and Field">Track and Field</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.cycling" class="btn-check" id="Cycling" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Cycling">Cycling</label>
                                    </div>
                                    <div class="col">
                                        <input type="checkbox" v-model="log.Entertainments.weightTraining" class="btn-check" id="Weight Training" autocomplete="off">
                                        <label class="btn btn-outline-primary" for="Weight Training">Weight Training</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                          Diary
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                        <div class="accordion-body">
                            <h4>Record your mood and your day</h4>
                            <br>
                            <h6>Title:</h6>
                            <div class="input-group">
                                <input type="text" v-model="log.Diary.title" class="form-control" placeholder="Title of diary" aria-label="TitleOfDiary" aria-describedby="basic-addon1">
                            </div>
                            <br>
                            <h6>Content:</h6>
                            <div class="input-group">
                                <textarea v-model="log.Diary.content" class="form-control" placeholder="Write something about your day" aria-label="diaryContent"></textarea>
                            </div>
                        </div>
                      </div>
                    </div>
                    <br>
                    <hr>
                    <div class="row">
                        <div class="col-10"></div>
                        <button type="button" class="btn btn-success col-2" @click="sendToRecord()">Save</button>
                    </div>
                    <br>
                    
                    
                </div>
            </form>
        </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';

export default {
    name: 'DailyLog',
    components: { VueDatePicker },
    emits: ['transmitDailyLog'],
    data() {
        return {
            log: {
                date: '',
                mood: 'TBD',
                Entertainments: { classes: false, tests: false, quizes: false, assignments: false, projects: false, party: false, boardGames: false,
                    outdoorPicnic: false, movies: false, concert: false, traveling: false, volunteerActivities: false, gaming: false, 
                    gastronomic: false, reading: false, basketBall: false, soccer: false, football: false, tennis: false, swimming: false,
                    baseball: false, golf: false, trackAndField: false, cycling: false, weightTraining: false },
                Diary: { title: '', content: '' }
            },
            date: ref(new Date())
        }
    },
    methods: {
        sendToRecord() {
            console.log(this.log)
            this.$emit('transmitDailyLog', this.log)
        }
    }
}
</script>

<style scoped>
#dailyQuiz {
    text-align: left
}
.title {
    font-weight: bold;
}
</style>