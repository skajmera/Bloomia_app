const mongoose = require("mongoose");
const url = "mongodb+srv://subhash:subhash123@cluster0.5luog.mongodb.net/mernstack?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to the database"))
  .catch((err) => {
    res.send(err)
  });
