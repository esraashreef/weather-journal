/* Global Variables */
const apikey = '3c2a94be5c11b6121cfbd9c7f35a0893';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


const generate = document.querySelector('#generate');

generate.addEventListener('click', function() {
    handleGenerateBtnClick();

});
const zipCode = document.querySelector("#zip").value
const feelings = document.querySelector("#feelings").value
let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apikey}&units=metric`


function handleGenerateBtnClick() {
    if (!zipCode) {

        getdata()


        .then(result => {
                postdata(result, feelings)
            })
            .then(result => {
                updateui(result)
            })

    } else {
        alert("please enter a zip code");
    }
}



async function getdata() {

    const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apikey}&units=metric`)

    try {

        const newdata = await responce.json();
        console.log(newdata)
        const temp = newdata.main.temp
        return temp

    } catch (error) {

        console.log("error", error);
    }
}

async function postdata() {

    await fetch('http://localhost:8000/add', {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            date: newDate,
            temp: temp,
            feelings: feelings
        })
    });


    try {
        const request = await fetch('http://localhost:8000/all', { credentials: "same-origin" }


        )
        const ndata = await request.json();
        console.log(ndata)

    } catch (error) {

        console.log("error", error);
    }
}


async function updateui() {
    const r = await fetch('http://localhost:8000/all');
    try {
        const all = await r.json()



        document.getElementById('date').innerHTML = all.date;
        document.getElementById('temp').innerHTML = all.temp;
        document.getElementById('userResponse').innerHTML = all.feelings;
    } catch (error) {
        console.log("error", error);
    }
};