const header = document.querySelector('#header');
const display = document.querySelector("#display");


db.collection('send').get().then(snapshot => snapshot.docs.forEach(doc => {
  if(doc.data().name === 'send to brand'){
    db.collection('brand').doc(doc.data().id).get().then(snapshot => {
      const ids = snapshot.data();
      header.innerHTML = snapshot.data().name;
      delete ids.name;
      Object.values(ids).forEach(id => {
        db.collection('spec').doc(id).get().then(data => {
          const img = document.createElement('img');
          img.src = data.data().url;
          console.log(data.data().url);
          img.setAttribute('class', 'image');
          display.appendChild(img);
        });
      });
    });
  }
}));