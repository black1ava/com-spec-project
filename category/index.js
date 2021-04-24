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
          const div = document.createElement('div');
          const h2 = document.createElement('h2');
          const ul = document.createElement('ul');


          h2.setAttribute('class', 'item-name');

          h2.setAttribute('doc-id', s.id);

          h2.addEventListener('click', function(){
            sendToSpec();
          });

          function sendToSpec(){
            db.collection('send').get().then(snps =>snps.forEach(snp => {
              if(snp.data().name === 'send to spec'){
                const data = snp.data();
                data.id = h2.getAttribute('doc-id');
                data.src = 'category';
                db.collection('send').doc(snp.id).update(data)
                  .then(function(){ window.location = '../spec/index.html'; });
              }
            }));
          }

          div.setAttribute('class', 'item-cont');
          const data = s.data();
          h2.innerHTML = data.name;

          img.src = data.url;

          img.addEventListener('click', function(){
            sendToSpec();
          });

          div.appendChild(h2);
          div.appendChild(img);

          delete data.name;
          delete data.url;

          const keys = Object.keys(data).map(d => d.replace('_', ' '));

          const values = Object.values(data);

          for(let i = 0; i < keys.length; i++){
            const li = document.createElement('li');
            li.innerHTML = `${ keys[i] }: ${ values[i] }`;
            ul.appendChild(li);
          }

          div.appendChild(ul);

          _items.appendChild(div);
        });
      });
    });
  }
}));