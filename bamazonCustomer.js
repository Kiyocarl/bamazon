// require depedencies
const inqirer = require("inquirer");
const mysql = require("mysql");

//set up database connection
const db = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "",
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
      item: "idNumber",
      product: "productName",
      department: "departmentName",
      price: 0,
      quanity: 0,
      message: "what is the item number?",
      message: "how many do you want?",
      choices: ["Post an item", 'Post on an product']
    }
  ]).then(userResponse =>{
    if(userReponse.idNumber === "productName"){
      postItem();
    }
    else{
      postProduct();
    }
  });  
}
//post item function
const postItem =() =>{

  inqirer.prompt([
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

    db.query("INERT INTO products SET ?",{
      item_id: userReponse.item_id,
      product_name: userResponse.productName,
      department_name: userResponse.departmentName,
      price: userResponse.itemPrice,
      stock_quanity: userResponse.stockQuanity,
    },(err, dbReponse)=>{
      if(err) throw err;
      console.log(`$(dbResponse.affectedRows) item added;`);
      startPrompt();
    });

  });
}

 //post users products
const postProduct = () =>{

  db.query("SELECT * FROM product",(err, productItem)=>{

    if(err) throw err;

    inquirer.prompt([
      {
        name: "itemName",
        message: "What item do you want to bid on?",
        type: "list",
        choices: auctionItems.map(item => item.item_name)
        
      },

     
    ])

  })
}