const fetch = require("cross-fetch");
fetch("http://localhost:3000/posts/1")
    .then(
        async (response) => {
            console.log(await response.json());
        },
        (e)=>{
            console.error("something error:",error);
        }
    )