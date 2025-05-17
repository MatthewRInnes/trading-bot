// Customer reviews data array
const reviews=[
    {
        name:"William Lucas",
        reviews:"Hi it's William from Livingston! I just received my new backpack and it is exactly what I've been looking for!!!! I totally love it!!!! I just love your stuff!!!!! Thanks so much and thanks to Matthew's Clothes."
    },
    {
        name:"Marry Noah",
        reviews:"Recently purchased a jacket from them and I am fairly satisfied with quality as well as the service. The tooling, stitching, quality of the leather, all of it is really really great. You guys totally rock!"
    }, 
    {
        name:"Sania Khan",
        reviews:"I received my backpack today. Thank you. I did not expect such fast service and was very pleased to be able to use the bag this weekend. The shoulder strap is perfect. Thanks you once again. I am a handbag nut and I must say that I have never been as pleased as I have been with the bags I have purchased from you. They are just perfect."
    }
];

// Select elements for review display
const Name=document.querySelector(".test_box h4");
const Review=document.querySelector(".test_box p");
const btn=document.getElementsByClassName("next-circle");

// Initialise counter and timer
let i = 0;
setInterval(myTimer, 2000);
const reviewName = document.querySelector(".test_box");

// Function to update review display and button styles
function myTimer() {
	Name.textContent = reviews[i%3].name;
	Review.textContent = reviews[i%3].reviews;
	btn[i%3].style.backgroundColor = "black";
	btn[(i+1)%3].style.backgroundColor = "#ff8aa5";
	btn[(i+2)%3].style.backgroundColor = "#ff8aa5";
	i++;
} 