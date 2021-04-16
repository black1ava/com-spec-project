const header = document.querySelector('#header');
const _items = document.querySelector('#items');

db.collection('send').get().then(snapshot => snapshot.docs.forEach(doc => {
  if(doc.data().name === 'send to category'){
    db.collection('category').doc(doc.data().id).get().then(data => {
      const items = data.data();

      header.innerHTML = items.name;
      delete items.name;

      Object.values(items).forEach(item => {
        db.collection('spec').doc(item).get().then(s => {
          const img = document.createElement('img');
          img.src = s.data().url;
          _items.appendChild(img);
        });
      });
    });
  }
}));