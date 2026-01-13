const express = require("express");
const app = express();
app.use(express.json());

let users = [];

app.post("/invest", (req, res) => {
  const { amount, type } = req.body;

  const yearlyReturn = {
    fd: 0.06,
    gold: 0.07,
    bond: 0.065
  };

  const valueAfterYear = amount + amount * yearlyReturn[type];

  res.json({
    message: "Investment Successful",
    valueAfterYear
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
