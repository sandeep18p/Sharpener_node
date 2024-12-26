const fs = require('node:fs');

let products = [];

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        // products.push(this);
        let filePath = "./index.json";
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify([]), "utf8");
        }

        
        fs.readFile("./index.json",'utf8',(err,data)=>{
          if(err){
           console.log("error occurred in reading file");
           return
          }
          products=[]
          products.push(...JSON.parse(data));
          products.push(this)
          console.log(products," working my code done")
          fs.writeFile("./index.json",JSON.stringify(products,null,2),(err)=>{
            console.log(err)
          })
        })

        
    
    }

    static fetchAll() {
        let filePath = "./index.json";
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, "[]", "utf8"); // Create file with an empty array
        }

        return new Promise((resolve,reject)=>{
              fs.readFile(filePath, 'utf8', (err, data)=>{
                if(err){
                  reject([]);
                }
                products=[];
                products.push(...JSON.parse(data))
                resolve(products);
              })
        })  
       
    }
}