const express = require("express");
const app = express();
const port = 3000;
const baseUrl = "http://192.168.1.104:3000";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/get-endpoints/:appKey", (req, res) => {
  console.log("getting endpoints",req.params.appKey);
  if(req.params.appKey == 'oHlEsC7CD3dwV1DZBcZ9WzJx8wsjAZf7'){
    res.json({
      reportingURL: `${baseUrl}/sendreports`,
      servers: [
        { id: 0, name: "cdn1", weight: 60, price: 20, url: `${baseUrl}/first` },
        { id: 2, name: "cdn3", weight: 10, price: 50, url: `${baseUrl}/third` },
        { id: 3, name: "cdn4", weight: 10, price: 100, url: `${baseUrl}/forth` },
        { id: 1, name: "cdn5", weight: 30, price: 80, url: `${baseUrl}/fifth` },
      ],
    });
  }else if(req.params.appKey == 'key1'){
    res.json({
      reportingURL: `${baseUrl}/sendreports`,
      servers: [
        { id: 0, name: "cdn1", weight: 60, price: 20, url: `${baseUrl}/first` },
        { id: 1, name: "cdn2", weight: 30, price: 60, url: `${baseUrl}/second` },
        { id: 2, name: "cdn3", weight: 10, price: 50, url: `${baseUrl}/third` },
      ],
    });
  }
  else{
    res.status(400).json('invalid app key')
  }

});

app.post("/sendreports", (req, res) => {
  console.log("BODY", req.body);
  res.json({ success: true });
});

app.get("/first", (req, res) => {
  setTimeout(() => res.json({ success: true }), 2000);
});
app.get("/second", (req, res) => {
  setTimeout(() => res.sendStatus(400), 500);
});
app.get("/third", (req, res) => {
  setTimeout(() => res.json({ success: true }), 1000);
});
app.get("/forth", (req, res) => {
  setTimeout(() => res.json({ success: true }), 100);
});
app.get("/fifth", (req, res) => {
  setTimeout(() => res.json({ success: true }), 200);
});

app.listen(port, () => {
  console.log("backend is lisening on port", port);
});
