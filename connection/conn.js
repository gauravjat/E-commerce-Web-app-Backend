const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/EcommerceProject')
    .then(() => {
       console.log("Connetction Done");
    }).catch((e) => {
       console.log(e);
    })
