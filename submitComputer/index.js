const brands = [];
db.collection('brand').get().then(snapshot => snapshot.docs.forEach(doc => {
  brands.push({
    name: doc.data().name,
    id: doc.id
  });
}));

const form = document.querySelector('#form');
const button = document.querySelector('#button');
const yearError = document.querySelector('#yearError');

form.addEventListener('submit', e => {

  e.preventDefault();
  
  button.disabled = true;

  const year = form.year.value;
  const chars = year.split('');

  const brandName = form.brand.value.toUpperCase();
  
  if(chars.every(char => (Number.isInteger(parseInt(char))) && year.length >= 4) || year === 'unknown'){
    yearError.style.display = 'none';
    
    db.collection('spec').add({
      brand: brandName,
      name: form.name.value,
      year: form.year.value,
      category: form.category.value,
      url: form.url.value,
      cpu: form.cpu.value,
      max_speed: form['max-speed'].value,
      l3: form.l3.value,
      memory: form.memory.value,
      total_memory: form['total-memory'].value,
      graphic: form.graphic.value,
      gpu: form.gpu.value,
      hdd: form.hdd.value
    });

    setTimeout(() => {
      db.collection('spec').get().then(snapshot => snapshot.docs.forEach(doc => {
        if(doc.data().name === form.name.value){
          if(brands.some(brand => brand.name === brandName)){
            brands.forEach(brand => {
              if(brand.name === brandName){
                db.collection('brand').doc(brand.id).get().then(snapshot => {
                  const data = snapshot.data();
                  data[`id${Object.keys(data).length}`] = doc.id;
                  db.collection('brand').doc(brand.id).update(data);
                });          
              }
            })
          }else{
            if(doc.data().name === form.name.value){
              db.collection('brand').add({
                name: brandName,
                id: doc.id
              });
            }
          }

          db.collection('category').get().then(snapshot => snapshot.docs.forEach(category => {
            if(category.data().name === form.category.value){
              const data = category.data();
              data[`id${Object.keys(data).length}`] = doc.id;
              console.log(data);
              db.collection('category').doc(category.id).update(data);
            }
          }));
        }
        setTimeout(() => {
          window.location = '';
        }, 1500);
      }));

    }, 2000);
  }else{
    yearError.style.display = 'block';
    button.disabled = false;
  }
});