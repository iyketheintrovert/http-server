// Create a simple server using the core ‘node:http’ module that can handle multiple concurrent requests.
// Each request should respond with a message after a random delay
// (simulating some asynchronous operation) without blocking the server.
 
// The server should be configured to handle CORS.
// Provide a GET route that when hit, returns information about the user’s CPU and OS
// (any information you’d like to return).

const http = require('node:http');
const os = require('node:os');

//Function to generate a random delay
const generateRandomDelay = () => Math.floor(Math.random() * 5000);

// Function to handle HTTP requests
const handleRequest = (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Simulate asynchronous operation
    setTimeout(() => {
        if (req.url === '/info') {
            // Get CPU and OS information
            const cpuInfo = os.cpus();
            const osInfo = {
                platform: os.platform(),
                release: os.release(),
                type: os.type(),
                uptime: os.uptime(),
            };
            const info = {
                cpu: cpuInfo,
                os: osInfo,
            };
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(info));
        } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Ikenna says, Welcome to the Zuri server!');
        }

    }, generateRandomDelay());
};

// Create server instance
const server = http.createServer(handleRequest);

// Start server
server.listen(3000, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Server is running on port 3000');
});