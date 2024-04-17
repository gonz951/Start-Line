const APIkeyNj = `+WGKXajBz6Z4hpQa9XjQDg==8TIctngv8D6TWbxT`

const userFormEl = document.querySelector('#workout-form');
const workoutInputEl = document.querySelector('#workout');
const workoutDisplayEl = document.querySelector('#workoutDisplay');
const nutrientFormEl = document.querySelector('#nutrient-form');
const nutrientDisplayEl = document.querySelector('#nutrientDisplay');

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
        // * Set PERMANENTLY to 'beginner'
        url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle + '&difficulty=beginner',
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
    for (let i = 0; i < data.length; i++) {
        const workout = data[i];
        const cardItem = document.createElement('li');
        cardItem.innerHTML = workout.name

        const cardBody = document.createElement('div');
        const cardEquip = document.createElement('p');
        cardEquip.innerHTML = workout.equipment
        console.log(cardEquip)

        // todo: need instructions to be hidden in an optional dropdown
        const cardInstruct = document.createElement('p');
        cardInstruct.innerHTML = workout.instructions

        cardBody.append(cardEquip)
        cardBody.append(cardInstruct)
        cardItem.append(cardBody)
        cardList.append(cardItem)
    }
    cardContainer.append(cardList)
    workoutDisplayEl.append(cardContainer);
    
    localStorage.setItem('workout', JSON.stringify(data));

}



// Nutrition ===================

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

userNutrientData = []

const getNutrition = async function(sex, age, feet, inches, lbs, activityLvl) {

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
        //console.log(JSON.parse(result));
        userNutrientData = JSON.parse(result);
        //console.log(userNutrientData)
        displayNutrition(JSON.parse(result))

    } catch (error) {
        console.error(error);
    }
<<<<<<< HEAD
=======

}

const displayNutrition = function(data) {
    console.log(data)
    console.log(data.BMI_EER)
    const ntrContainer = document.createElement('div');
    const ntrList = document.createElement('ul');
    ntrList.setAttribute('id', 'ntrDiv');
    for (let i = 0; i < data.length; i++) {
        const nutrients = data[i];
        console.log(nutrients)
        const ntrItem = document.createElement('li');
        const ntrBody = document.createElement('div');

        ntrItem.innerHTML = nutrients.BMI_EER



        ntrList.append(cardItem)
    }

    ntrContainer.append(ntrList)
    nutrientDisplayEl.append(ntrContainer)

>>>>>>> 1f206fba095d6e70bad8971a6841aca837f96f20
}

userFormEl.addEventListener('submit', workoutFormSubmitHandler);
nutrientFormEl.addEventListener('submit', nutritionFormSubmitHandler);
