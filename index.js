const imgs = document.querySelectorAll('.img');

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

imgs.forEach(img => img.addEventListener('click', () => console.log(img.getAttribute('doc-id'))));