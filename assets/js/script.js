const APIkeyNj = `+WGKXajBz6Z4hpQa9XjQDg==8TIctngv8D6TWbxT`

const userFormEl = document.querySelector('#workout-form');
const workoutInputEl = document.querySelector('#workout');
const workoutDisplayEl = document.querySelector('#workoutDisplay');
const nutrientFormEl = document.querySelector('#nutrient-form');

// might need an element to hold the workout input

const workoutFormSubmitHandler = function(event) {
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

let selectedWorkout = []

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
            selectedWorkout = result_data_json
            displayWorkout(result_data_json);
            // console.log(selectedWorkout);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

const displayWorkout = function (data) {


    const cardContainer = document.createElement('div');
    const cardList = document.createElement('ul');
    cardList.setAttribute('id', 'listDiv');
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const cardItem = document.createElement('li');
        cardItem.innerHTML = element.name
        
        cardList.append(cardItem)
    }
    cardContainer.append(cardList)
    workoutDisplayEl.append(cardContainer);
    
    console.log(data)
}



// Nutrition 

const nutritionFormSubmitHandler = function(event) {
    event.preventDefault();
    const sex = document.getElementById('sex').value
    const age = document.getElementById('age').value
    const feet = document.getElementById('feet').value
    const inches = document.getElementById('inches').value
    const lbs = document.getElementById('lbs').value
    const activityLvl = document.getElementById('activity-lvl').value
    console.log(sex)
    getNutrition(sex, age, feet, inches, lbs, activityLvl);

}

const getNutrition = async function(sex, age, feet, inches, lbs, activityLvl) {
    // What needs to change:
    // Sex input
    // age value
    // feet 
    // inches
    // lbs
    // activity_level

    const url = `https://nutrition-calculator.p.rapidapi.com/api/nutrition-info?measurement_units=std&sex=${sex}&age_value=${age}&age_type=yrs&feet=${feet}&inches=${inches}&lbs=${lbs}&activity_level=${activityLvl}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0c705c3e5dmsh8d04577d140948cp1032eejsn82b9fd068692',
            'X-RapidAPI-Host': 'nutrition-calculator.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(JSON.parse(result));
    } catch (error) {
        console.error(error);
    }
}

userFormEl.addEventListener('submit', workoutFormSubmitHandler);
nutrientFormEl.addEventListener('submit', nutritionFormSubmitHandler);
