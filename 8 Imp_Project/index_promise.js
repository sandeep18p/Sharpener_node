const bodyParser = require("body-parser");
const express = require("express");
const fs = require('fs').promises;
const path = require("path");

const app = express();
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


app.get("/login", (req, res) => {
    res.send(`
    <form id="loginForm" action="/working" method="POST" onsubmit="saveToLocalStorage(event)">
        <input name="username" id="username" placeholder="Enter your username" required />
        <button type="submit">Submit</button>
    </form>
    <script>
        function saveToLocalStorage(event) {
            const username = document.getElementById('username').value;
            localStorage.setItem('username', username);
        }
    </script>
    `);
});

app.post("/working", (req, res) => {
    res.redirect("/");
});

app.get("/", (req, res) => {
    console.log("one");

    fs.readFile('test.txt', 'utf-8', (err, data) => {
        console.log("one ek bar aur");
        
        if (err) {
            console.log("Error happened", err);
            res.send("Error reading the file.");
            return;
        }

        console.log("File content:", data);

        res.send(`
            <p>File Content: ${data}</p>
            <form id="loginForm" action="/" method="POST" onsubmit="get(event)">
                <input name="message" id="username" placeholder="Enter your message" required />
                <input id="un" type="hidden" placeholder="Enter your username" name="kk" />
                <button type="submit">Send</button>
            </form>
            <script>
                function get(event) {
                    event.preventDefault(); 
                    let key = localStorage.getItem("username"); 
                    if (key) {
                        document.getElementById('un').value = key; 
                    }
                    document.getElementById('loginForm').submit(); 
                }
            </script>
        `);
    });
});

app.post("/",(req, res)=>{
    const {message,kk} = req.body
    console.log("coming  ",kk," ",message,);
    const msg = " "+kk+" "+message;
    async function example(msg) {
        try {
        
          await fs.appendFile('test.txt', msg);
          res.redirect("/")
        } catch (err) {
          console.log(err);
        }
    }

      example(msg);

})
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
