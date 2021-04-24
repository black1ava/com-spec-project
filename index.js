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

const category = document.getElementsByClassName('cat-items');
const cat = document.getElementsByClassName('cat');


function transferToDom(doc, dom, chi){
  const random = [];
  const data = doc.data();
  delete data.name;

  while(random.length < 3){
    const index = Math.floor(Math.random() * Object.keys(data).length);
    if(random.every(item => item.id !== index)){
      random.push({
        id: index,
        value: Object.values(data)[index]
      });
    }
  }

  chi.setAttribute('doc-id', doc.id);

  const imgContainer = document.createElement('div');
  imgContainer.setAttribute('class', 'img-cont');

  Object.values(random).forEach(item => {
    db.collection('spec').doc(item.value).get().then(snapshot => {
      const img = document.createElement('img');
      img.src = snapshot.data().url;
      img.setAttribute('doc-id', snapshot.id);

      img.addEventListener('click', function(){
        db.collection('send').get().then(ss => ss.docs.forEach(s => {
          if(s.data().name === 'send to spec'){
            const data = s.data();
            data.id = img.getAttribute('doc-id');
            data.src = 'home';

            db.collection('send').doc(s.id).update(data)
              .then(() => window.location = 'spec/index.html');
          }
        }));
      });

      imgContainer.appendChild(img);
    });
  });

  dom.appendChild(imgContainer);
}

db.collection('category').get().then(snapshot => snapshot.docs.forEach(doc => {
  switch(doc.data().name){
    case 'Office':
      transferToDom(doc, category[0], cat[0]);
      break;
    case 'Gaming':
      transferToDom(doc, category[1], cat[1]);
      break;
    case 'Design':
      transferToDom(doc, category[2], cat[2]);
      break;
    default:
      console.log('Category not found', doc.data().name);
  }
}));

Object.values(cat).forEach(item => {

  item.addEventListener('click', function(){
    setTimeout(function(){

      db.collection('send').get().then(function(snapshot){
        snapshot.docs.forEach(function(doc){
          if(doc.data().name === 'send to category'){

            const data = doc.data();
            data['id'] = item.getAttribute('doc-id');
            db.collection('send').doc(doc.id).update(data);

            setTimeout(function(){ window.location = 'category/index.html' }, 400);
          }
        })
      });
    }, 200);
  });
});