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
          img.setAttribute('class', 'image');

          img.addEventListener('click', function(){
            sendToSpec();
          });

          const div = document.createElement('div');
          const ul = document.createElement('ul');
          const h3 = document.createElement('h3');

          h3.setAttribute('doc-id', data.id);

          h3.addEventListener('click', () => {
            sendToSpec();
          });

          function sendToSpec(){
            db.collection('send').get().then(snap => snap.docs.forEach(doc => {
              console.log(h3.getAttribute('doc-id'));
              if(doc.data().name === 'send to spec'){
                const newUpdate = {
                  name: doc.data().name,
                  id: h3.getAttribute('doc-id'),
                  src: 'brand'
                };

                db.collection('send').doc(doc.id).update(newUpdate)
                  .then(function(){ window.location = '../spec/index.html' });
              }
            }));
          }

          div.setAttribute('class', 'container');

          const list = data.data();
          delete list.url;

          h3.innerHTML = list.name;
          delete list.name;

          const keys = Object.keys(list).map(key => key.replace('_', ' '));
          const values = Object.values(list);

          const listOfSpec = [];

          for(let i = 0; i < keys.length; i++){
            const list = { label: keys[i], data: values[i] };
            listOfSpec.push(list);
          }

          listOfSpec.forEach(spec => {
            const li = document.createElement('li');
            li.innerHTML = `${spec.label}: ${spec.data}`;
            ul.appendChild(li);
          });

          div.appendChild(h3);
          div.appendChild(img);
          div.appendChild(ul);

          display.appendChild(div);
        });
      });
    });
  }
}));