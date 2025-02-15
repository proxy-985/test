fetch('http://localhost:3000/toplist')
.then((res) => res.json())
.then((res) => console.log(res)) 
