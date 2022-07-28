fetch("http://localhost:8000/api/admin",{
    method:"GET",
    headers:{
        "Content-Type":"application/json"
    },
}).then(res => res.json()).then(res => console.log(res));