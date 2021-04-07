const logo = document.querySelector("#logo").childNodes;

const imgs = Object.values(logo).filter(item => item.nodeType === 1);

db.collection('brand').get().then(snapshot => snapshot.docs.forEach(doc => {
  switch(doc.data().name.trim()){
    case 'LENOVO':
      imgs[0].setAttribute('doc-id', doc.id);
      break;
    case 'APPLE':
      imgs[1].setAttribute('doc-id', doc.id);
      break;
    case 'MSI':
      imgs[2].setAttribute('doc-id', doc.id);
      break;
    case 'ASUS':
      imgs[3].setAttribute('doc-id', doc.id);
      break;
    case 'KOOMPI':
      imgs[4].setAttribute('doc-id', doc.id);
      break;
    default:
      console.log('brand is not found', doc.data().name);
  }
}));

imgs.forEach(img => img.addEventListener('click', () => {
  db.collection('send').get().then(snapshot => snapshot.docs.forEach(doc => {
    if(doc.data().name === 'send to brand'){
      const newUpdate = {};
      newUpdate.name = doc.data().name;
      newUpdate.id = img.getAttribute('doc-id');

      db.collection('send').doc(doc.id).update(newUpdate);
    }
  }));

  setTimeout(() => {
    window.location = 'brand/index.html'
  }, 500);
}));