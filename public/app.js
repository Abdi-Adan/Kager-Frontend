const pickupOptions = document.querySelector("#pickup-options");
const carnamepOptions = document.querySelector("#carname-options");
const form = document.querySelector("#book-tour");
const myDiv = document.querySelector("#car-page");
const myCarousel = document.querySelector("#carousel-page");
const myServices = document.querySelectorAll("#service-page");
const bookButton = document.querySelector("#book-buttons");

//render services
function renderServices(doc) {
  myServices.innerHTML += `
    <div class="col-md-4 d-flex align-self-stretch">
    <div class="d-block services d-flex justify-content-between">
      <div class="icon d-flex align-items-center justify-content-center">
        <span class="material-icons">airport_shuttle</span>
      </div>
      <div class="media-body">
        <h3 class="heading">${doc.data().title}</h3>
        <p class="mb-0">${doc.data().detail} </p>
      </div>
    </div>      
  </div>
`;
}

//render div
function renderDiv(doc) {
  myDiv.setAttribute("data-id", doc.id);
  myDiv.innerHTML += `<div class="col-md-6 col-lg-4  " >
    <div class="block-7">
        <div class="img" style="background-image: url(${
          doc.data().image
        });" ></div>
        <div class="text-center p-4">
            <span class="excerpt d-block">${doc.data().name}</span>
            <span class="price"><sup>$</sup> <span class="number">${
              doc.data().price
            }</span> <sub>/Day</sub></span>
            
            <ul class="pricing-text mb-5">
                <li><span class="material-icons mr-2">airline_seat_recline_extra</span>${
                  doc.data().seats
                }Seats</li>
                <li><span class="material-icons mr-2">emoji_transportation</span>${
                  doc.data().doors
                } car Doors</li>
                <li><span class="material-icons mr-2">ac_unit</span>Auto,petrol</li>
            </ul>

            <a href="#book-tour" class="btn btn-primary d-block px-3 py-3" id='book-buttons'>Get Started</a>
        </div>
    </div>
</div>
`;

  // deleting data
  myDiv.addEventListener("click", (e) => {
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("cars").doc(id).delete();
  });
  //
}
function setOption(doc) {
  pickupOptions.innerHTML += `
    <option value="${doc.data().name}">${doc.data().name}</option>
   `;
}
function carsOption(doc) {
  carnamepOptions.innerHTML += `
    <option value="${doc.data().name}">${doc.data().name}</option>
   `;
}

function renderCarousel(doc) {
  myCarousel.innerHTML += `
            <div class="testimony-wrap py-4 pb-5 d-flex justify-content-between">
                <div class="user-img" style="background-image: url(${
                  doc.data().image
                })">
                    <span class="quote d-flex align-items-center justify-content-center">
                        <i class="fa fa-quote-left"></i>
                    </span>
                </div>
                <div class="text">
                    <p class="mb-4">${doc.data().message}</p>
                    <p class="name">${doc.data().name}</p>
                    <span class="position">${doc.data().role}</span>
                </div>
            </div>
            `;
}

//saving data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("bookings").add({
    name: form.name.value,
    email: form.email.value,
    pickup: form.pickup.value,
    date: form.date.value,
    time: form.time.value,
    message: form.carname.value,
    phone: form.phone.value,
  });
  form.name.value = "";
  form.email.value = "";
  form.pickup.value = "";
  form.date.value = "";
  form.time.value = "";
  form.carname.value = "";
  form.phone.value = "";
});

// real-time listener
db.collection("cars")
  .orderBy("name")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderDiv(change.doc);
      } else if (change.type == "removed") {
        let li = myDiv.querySelector("[data-id=" + change.doc.id + "]");
        myDiv.removeChild(li);
      }
    });
  });
// real-time listener
db.collection("offices")
  .orderBy("name")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        setOption(change.doc);
      } else if (change.type == "removed") {
        let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
        cafeList.removeChild(li);
      }
    });
  });
// real-time listener
db.collection("cars")
  .orderBy("name")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        carsOption(change.doc);
      } else if (change.type == "removed") {
        let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
        cafeList.removeChild(li);
      }
    });
  });
// real-time listener for services
db.collection("services")
  .orderBy("title")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderServices(change.doc);
      } else if (change.type == "removed") {
        let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
        cafeList.removeChild(li);
      }
    });
  });
// real-time listener
db.collection("testimonials")
  .orderBy("name")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderCarousel(change.doc);
      } else if (change.type == "removed") {
        let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
        cafeList.removeChild(li);
      }
    });
  });

// updating records (console demo)
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     name: 'mario world'
// });

// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     city: 'hong kong'
// });

// setting data
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     city: 'hong kong'
// });
