// For loading button functionality
const loder = document.querySelector(".loder");
// For navigation elements
const mobileNav = document.querySelector("#navbarsExample04");
const navheader = document.querySelector(".navbar-toggler");
// For product purchase functionality
const productCards = document.getElementsByClassName("products_card_l");
const buyModal = document.querySelector(".modal-buy");
const productContainer = buyModal.querySelector(".product");
const productImgContainer = productContainer.querySelector("img");
const productDescriptionContainer = productContainer.querySelector(
  ".productBuyDescription"
);

// Stop loading function
let time = 1000;
let setTime;
function stopLoading(newTime) {
  setTimeout(() => {
    time = setTime ?? 1000;
    loder.style = "display:none;";
    setTime = null;
  }, time);
}
stopLoading(); /* Run once on page reload (stop loading) */
// Start loading function
function startLoading(newTime) {
  loder.style = "display:flex";
  setTime = newTime;
  stopLoading(setTime);
}
// Trigger function for button click event
const buttonPressed = (e) => {
  let productImg =
    e.target.src ===
    e.target.ownerDocument.activeElement.childNodes[1].childNodes[5].src
      ? e.target.src
      : undefined;
  let productDescription =
    e.target.ownerDocument.activeElement.childNodes[3].innerHTML;
  startLoading(200); /* Start loading for 200ms */
  buyModal.classList.add("active-modal");
  if (productImg) {
    productImgContainer.setAttribute("src", `${[productImg]}`);
  } else {
    productImgContainer.setAttribute(
      "src",
      `${e.target.ownerDocument.activeElement.children[0].childNodes[5].src}`
    );
  }
  productDescriptionContainer.innerHTML = `<div class="flex-center-column">
  <div>
  ${productDescription}
  <lable>
  Quantity 
  <select>
    <option> 1 </option>
    <option> 2 </option>
    <option> 3 </option>
  </select>
  </lable> 
  <lable className="address">
  <input type="text" placeholder="Deliver to.." name="address">
  </lable>
  </div>
  <button id="buy">Buy</button>
  </div>`;
};

// Add event listeners for product cards
for (let button of productCards) {
  button.addEventListener("click", buttonPressed);
}

// Cancel modal button functionality
function cancelModal() {
  buyModal.classList.remove("active-modal");
}

// Bug fix for navigation bar in mobile view
let navCount = 2;
navheader.addEventListener("click", () => {
  if (navCount % 2 == 0) {
    mobileNav.style = "display:block;";
  } else {
    mobileNav.style = "display:none;";
  }
  navCount++;
});

/* Search Bar Functionality */
// Required document elements
let searchBtn = document.querySelector("#search-button");
let searchModal = document.querySelector("#searchModal");
let searchBox = document.querySelector(".searchBox");
let searchInput = searchBox.querySelector("#searchInput");
let suggBox = searchBox.querySelector(".suggestionBox");

// Open search box on click
let seachClickCounter = 2;
searchBtn.onclick = () => {
  searchInput.setAttribute(
    "placeholder",
    `Recent: ${getData("recentSearch")}`
  );
  if (seachClickCounter % 2 == 0) {
    searchBox.classList.add("searchBox-active");
  } else {
    searchBox.classList.remove("searchBox-active");
  }
  seachClickCounter++;
};

// Get typed data in the search input
searchInput.onkeyup = (e) => {
  let searchKey = e.target.value;
  // If search key is present
  if (searchKey.length) {
    let arr = [];
    // Put search value into array and make it lowercase
    arr = suggestions.filter((data) => {
      // Convert everything to lowercase
      let lowerSearchKey = searchKey.toLocaleLowerCase();
      let loweCaseData = data.toLocaleLowerCase();
      // Only pass value which matches the search key
      let suggPresent = loweCaseData.startsWith(lowerSearchKey);
      return suggPresent;
    });
    // Wrap data with li tags
    arr = arr.map((toConvertData) => {
      return `<li>${toConvertData}</li>`;
    });
    // Show data on suggestion box
    showSuggestions(arr);
    suggBox.classList.add("suggestionBox-active");

    // Select data from suggestion box to input
    let allDynamicList = suggBox.querySelectorAll("li");
    for (let i = 0; i < allDynamicList.length; i++) {
      allDynamicList[i].setAttribute("onclick", "select(this)");
    }
  }
  // If search key is empty
  else {
    suggBox.classList.remove("suggestionBox-active");
  }
};

// Function to select the suggestion to input
function select(ele) {
  let selection = ele.textContent;
  saveData(selection);
  
  switch (selection) {
    // These URLs are taken with respect to the index page
    case "Leather Bag - Product": {
      window.location.href = "./html/products.html";
      break;
    }
    case "Leather Bagpack - Product": {
      window.location.href = "./html/products.html";
      break;
    }
    case "Leather Cap - Product": {
      window.location.href = "./html/products.html";
      break;
    }
    case "Leather Purse - Product": {
      window.location.href = "./html/products.html";
      break;
    }
    case "Products Page": {
      window.location.href = "./html/products.html";
      break;
    }
    case "About Page": {
      window.location.href = "#about";
      break;
    }
    case "Contributors": {
      window.location.href = "#about";
      break;
    }
    case "Testimonials": {
      window.location.href = "";
      break;
    }
    case "Customer Review": {
      window.location.href = "";
      break;
    }
    case "Contact Us": {
      window.location.href = "#ContactUs";
      break;
    }
    case "How to contact for issue": {
      window.location.href = "#ContactUs";
      break;
    }
    case "How to report an issue": {
      window.location.href = "#ContactUs";
      break;
    }
    case "Cap - Product": {
      window.location.href = "./html/products.html";
      break;
    }
    case "Bagpack - Product": {
      window.location.href = "./html/products.html";
      break;
    }
    case "Purse - Product": {
      window.location.href = "./html/products.html";
      break;
    }
  }
  suggBox.classList.remove("suggestionBox-active");
}

// Function to show the suggestion data
function showSuggestions(arr) {
  let arrData;
  if (!arr.length) {
    let inputValue = searchInput.value;
    arrData = "<li>" + inputValue + " - not found 🙁</li>";
  } else {
    // Join the array
    arrData = arr.join("");
  }
  // Pass array to suggestion box
  suggBox.innerHTML = arrData;
}

// Save data to local storage
function saveData(data) {
  localStorage.setItem("recentSearch", `${data}`);
}

// Get data from local storage
function getData() {
  return localStorage.getItem("recentSearch");
} 