const itemsName = document.querySelector('#name');
const image = document.querySelector('#image');
const list = document.querySelector('#list');
const src =  document.querySelector('#src');

db.collection('send').get().then(snapshot => snapshot.docs.forEach(doc => {
  if(doc.data().name === 'send to spec'){

    db.collection('spec').doc(doc.data().id).get().then(data => {
      itemsName.innerHTML = data.data().name;

      image.src = data.data().url;

      const list_ = data.data();
      delete list_.name;
      delete list_.url;

      const keys = Object.keys(list_).map(key => key.replace('_', ' '));
      const values = Object.values(list_);

      const listOfSpec = [];

      for(let i = 0; i < keys.length; i++){
        const list = { label: keys[i], data: values[i] };
        listOfSpec.push(list);
      }

      listOfSpec.forEach(spec => {
        const li = document.createElement('li');
        li.innerHTML= `${spec.label}: ${spec.data}`;

        list.appendChild(li);
      });
    });

    switch(doc.data().src){
      case 'category':
        src.setAttribute('href', '../category/index.html');
        break;
  
      case 'brand':
        src.setAttribute('href', '../brand/index.html');
        break;
      
      case 'home':
        src.setAttribute('href', '../index.html');
        break;
        
      default:
        console.log(`${ doc.data().src } is undefined`);
    }
  }
}));