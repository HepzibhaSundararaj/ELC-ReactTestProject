/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require('./data');
const http = require('http');
const url = require('url');
const hostname = 'localhost';
const port = 3035;

/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
http.createServer(function (req, res) {
    // .. Here you can create your data response in a JSON format

    // Added CORS enablement code
    res.setHeader("Access-Control-Allow-Origin", "*");

    // @Hepzi: Trying to get query params
    const queryObj = url.parse(req.url, true);
    if (queryObj) {
        // looking for search param in url
        const searchTerm = queryObj.query['search'];

        // if we have searchTerm, do a filter else return original data
        if (searchTerm) {
            const searchedResult = data.filter(item => {
                // Trying to search on name and about as well
                return item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.about.toLowerCase().includes(searchTerm.toLowerCase())
            })
            res.write(JSON.stringify(searchedResult));
            res.end();
            return;
        }
    }

    // returning original data
    res.write(JSON.stringify(data)); 
    res.end(); //end the response


}).listen(port);


console.log(`[Server running on ${hostname}:${port}]`);
