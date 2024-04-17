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
    
    //console.log(data)
}



// Nutrition ===================

function renderUserNutrition() {
    const personalInfo = localStorage.getItem('personal-information');
    console.log(personalInfo)

    if (!personalInfo) {
        return;
    }
}

console.log(renderUserNutrition())


const nutritionFormSubmitHandler = function(event) {
    event.preventDefault();
    const sex = document.getElementById('sex').value
    const age = document.getElementById('age').value
    const feet = document.getElementById('feet').value
    const inches = document.getElementById('inches').value
    const lbs = document.getElementById('lbs').value
    const activityLvl = document.getElementById('activity-lvl').value
    getNutrition(sex, age, feet, inches, lbs, activityLvl);

    let personalInfo = {
        sex: sex,
        age: age,
        feet: feet,
        inches: inches,
        lbs: lbs,
        activityLvl: activityLvl
    }
    
    localStorage.setItem('personal-information', JSON.stringify(personalInfo));
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
        userNutrientData = result;
        //console.log(userNutrientData)
        displayNutrition(JSON.parse(result));

    } catch (error) {
        console.error(error);
    }

}


const displayNutrition = function(data) {
    // ! NEED LOCAL STORAGE FUNCTIONS HERE

    console.log(data)

    // * Things to take 
    // Macronutrients:
    // 0-4 
    const BMI = data.BMI_EER.BMI
    const recCalories = data.BMI_EER['Estimated Daily Caloric Needs']
    const carbohydrate = data.macronutrients_table['macronutrients-table'].at(1).at(1)
    const totalFiber = data.macronutrients_table['macronutrients-table'].at(2).at(1)
    const protein = data.macronutrients_table['macronutrients-table'].at(3).at(1)
    const fat = data.macronutrients_table['macronutrients-table'].at(4).at(1)
    //console.log(data.macronutrients_table['macronutrients-table'].at(1).at(1))
    

    const ntrContainer = document.createElement('div');
    ntrContainer.setAttribute('id', 'ntrDiv');
    ntrBody = document.createElement('div')
    const cardBMI = document.createElement('h2')
    cardBMI.textContent = `Your BMI: ${BMI}`
    const cardCal = document.createElement('h2')
    cardCal.textContent = `Estimated Caloric Needs: ${recCalories}`
    
    const cardNeeds = document.createElement('ul')
    const cardItems = document.createElement('li')
    cardItems.textContent = `Recommended nutrients:`
    const cardCarb = document.createElement('p')
    cardCarb.textContent = `Carbohydrates: ${carbohydrate}`
    const cardFiber = document.createElement('p')
    cardFiber.textContent = `Total Fiber: ${totalFiber}`
    const cardProtein = document.createElement('p')
    cardProtein.textContent = `Protein: ${protein}`
    const cardFat = document.createElement('p')
    cardFat.textContent = `Fat: ${fat}`
    

    cardItems.append(cardCarb)
    cardItems.append(cardFiber)
    cardItems.append(cardProtein)
    cardItems.append(cardFat)
    cardNeeds.append(cardItems)
    ntrBody.append(cardBMI)
    ntrBody.append(cardCal)
    ntrBody.append(cardNeeds)


    ntrContainer.append(ntrBody)
    nutrientDisplayEl.append(ntrContainer)

}

userFormEl.addEventListener('submit', workoutFormSubmitHandler);
nutrientFormEl.addEventListener('submit', nutritionFormSubmitHandler);
