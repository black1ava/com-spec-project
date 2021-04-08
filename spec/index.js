db.collection('send').get().then(snapshot => snapshot.docs.forEach(doc => {
  if(doc.data().name === 'send to spec'){
    console.log(doc.data().id);
  }
}));