// require depedencies
const inquirer = require("inquirer");
const mysql = require("mysql");

//set up database connection
const db = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "password",
database: "bamazon_db"
});

// turn on connection to database
db.connect(err =>{
  if (err) throw err;

  console.log("You're now connected to the database.");
  // start our application
  startPrompt();
});

//ask user for id
const startPrompt = () =>{
  inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "pic an action",
      choices: ["Post an item", 'Post on an product']
    }
  ]).then(userResponse =>{
    console.log(userResponse)
    if(userResponse.action === "post an item"){
      postItem();
    }
    else{
      postProduct();
    }
  }).catch(err => {
    console.log(err)
  });  
}
//post item function
const postItem =() =>{

  inquirer.prompt([
    {
      name: "itemId",
      message: "right id number",
      type: "input",
      default: "unlisted"
    },
    {
      name: "productName",
      message: "place name of product",
      type: "input",
      default: "unlisted"
    },
    {
      name: "departmentName",
      message: "place what department",
      type: "input",
      default: "unlisted"
    },
    {
      name: "price",
      message: "place price",
      type: "input",
      default: 0,
      validate: function(placePrice){
        if (!isNaN(placePrice)){
          return true;
        }
        else{
          return false;
        }
      }
    },
    {
      name: "stockQuanity",
      message: "quanity amount?",
      type: "input",
      default: 0,
      validate: function(quanityAmount){
        if (!isNaN(quanityAmount)){
          return true;
        }
        else{
          return false;
        }
      }
    }
    
  ]).then(userResponse =>{

    db.query("INSERT INTO products SET ?",{
      item_id: userReponse.item_id,
      product_name: userResponse.productName,
      department_name: userResponse.departmentName,
      price: userResponse.itemPrice,
      stock_quanity: userResponse.stockQuanity,
    },(err, userReponse )=>{
      if(err) throw err;
      console.log(`$(dbResponse.affectedRows) item added;`);
      startPrompt();
    });

  }).catch(err => {
    console.log(err)
  });
}

 //post users products
const postProduct = () =>{

  db.query("SELECT * FROM products",(err, productItem)=>{

    if(err) throw err;

    inquirer.prompt([
      {
        name: "itemName",
        message: "What item do you want to bid on?",
        type: "list",
        choices: productItem.map(item => item.item_name)
        
      },

     
    ]).then(res => {
      console.log(res)
    }).catch(err => {
      console.log("ERROR!!!!!")
      console.log(err)
    })

  })
}