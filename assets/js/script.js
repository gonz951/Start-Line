const APIkeyNj = `+WGKXajBz6Z4hpQa9XjQDg==8TIctngv8D6TWbxT`

const userFormEl = document.querySelector('#workout-form');
const workoutInputEl = document.querySelector('#workout');


// might need an element to hold the workout input

const formSubmitHandler = function(event) {
    event.preventDefault();

    const workouts = workoutInputEl.value.trim();

    if (workouts) {
        getWorkouts(workouts);
        console.log(workouts)

        workoutInputEl.value = '';

    } else {
        alert('add workout');
    }
    // can have an alert, but might be intrusive
};



const getWorkouts = function (muscle) {
    // need to change var for user input 
    //var muscle= 'biceps'

    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
        headers: { 'X-Api-Key': '+WGKXajBz6Z4hpQa9XjQDg==8TIctngv8D6TWbxT'},
        contentType: 'application/json',
        success: function(result_data_json) {
            console.log(result_data_json);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

const displayWorkout = function (data) {

    console.log(data)
}

userFormEl.addEventListener('submit', formSubmitHandler);