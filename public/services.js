
const myServices= document.querySelector('#service-pages');

const myServices= document.querySelector('#office-options');
const myServicesCars= document.querySelector('#servicecar-options');
const form = document.querySelector('#book-form');
const contactForm = document.querySelector('#contactus-form');

//render services
function renderServices(doc){
    myServices.innerHTML +=`
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
`
}



function setOption(doc){
    pickupOptions.innerHTML +=`
    <option value="${doc.data().name}">${doc.data().name}</option>
   `

}

function setmyCarOption(doc){
    myServicesCars.innerHTML +=`
    <option value="${doc.data().name}">${doc.data().name}</option>
   `

}





//saving data


// real-time listener
db.collection('services').orderBy('title').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderServices(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});

// real-time listener
db.collection('offices').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            setOption(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});
// real-time listener carname
db.collection('cars').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            setmyCarOption(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});
//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('bookings').add({
        name: form.name.value,
        email: form.email.value,
        pickup:form.pickup.value,
        date:form.date.value,
        time:form.time.value,
        message:form.message.value,
        phone:form.phone.value,


    });
    form.name.value = '';
    form.email.value = '';
    form.pickup.value='';
    form.date.value ='';
    form.time.value='';
    form.message.value='';
    form.phone.value='';
});
//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('contacts').add({
        name: form.name.value,
        email: form.email.value,
        pickup:form.subject.value,

        message:form.message.value,
      

    });
    form.name.value = '';
    form.email.value = '';
    form.subject.value='';
    form.message.value='';
    form.phone.value='';
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