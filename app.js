const express = require("express");
const app = express();
const pug = require("pug");
const path = require("path");
const bodyparser = require("body-parser");
const port = process.env.PORT || 5000;
app.set("view engine", "pug");
var user = [
  {
    username: "Shahzaib",
    Password: "12345",
    Amount: "500000",
  },
  {
    username: "Faisal",
    Password: "54321",
    Amount: "500000",
  },
  {
    username: "admin",
    Password: "admin",
    Amount: "50000",
  },
];
app.set(bodyparser.json());
var total = 50000;

app.get("/balance", (req, res) => {
  res.render("BalanceEnquiry", { balance: total });
});
app.get("/balanceslip/:bal", (req, res) => {
  var balance = req.params.bal;
  if (req.query == undefined) {
    res.render("BalanceSlip", {
      amount: req.params.bal,
      RemainingBalance: total - balance,
    });
  } else {
    if (req.query.Amount == undefined) {
      var amount = req.query.amount;
      res.render("BalanceSlip", {
        amount: amount,
        RemainingBalance: total - amount,
      });
    } else {
      var accountcode = req.query.Accountno;
      var Amount = req.query.Amount;
      res.render("BalanceSlip", {
        Amount: Amount,
        RemainingBalance: total - Amount,
        Accountcode: accountcode,
      });
    }
  }
});
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/withdrawl", (req, res) => {
  res.render("CashWithDrwal");
});

app.get("/fastcash", (req, res) => {
  res.render("FastCash");
});

app.get("/transfer", (req, res) => {
  res.render("Transfer");
});

app.get("/mainmenu", (req, res) => {
  var username = req.query.username;
  var passwrd = req.query.password;
  if (username != undefined && passwrd != undefined) {
    user.forEach((users) => {
      if (username == users.username) {
        if (passwrd == users.Password) {
          res.render("MainMenu");
          console.log("This is Main Menu page");
        } else {
          res.render("login", { Message: "Enter valid username and password" });
        }
      }
    });
  } else {
    res.render("login", { Message: "Enter valid username and password" });
  }
});

app.listen(port, () => {
  console.log(`Server has been started on port 5000`);
});
