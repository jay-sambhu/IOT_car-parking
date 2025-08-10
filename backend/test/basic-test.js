const http = require('http');

// Basic test for the car parking backend server
console.log('Starting basic backend tests...');

// Test 1: Check if server responds
function testServerResponse() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/',
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            if (res.statusCode === 200) {
                console.log('✓ Server responds correctly');
                resolve(true);
            } else {
                console.log('✗ Server response error:', res.statusCode);
                resolve(false);
            }
        });

        req.on('error', (err) => {
            console.log('✗ Server connection failed:', err.message);
            resolve(false);
        });

        req.setTimeout(5000, () => {
            console.log('✗ Server response timeout');
            req.destroy();
            resolve(false);
        });

        req.end();
    });
}

// Test 2: Check sensor data endpoint
function testSensorEndpoint() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/sensor-data?type=1',
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                if (res.statusCode === 200 && data.includes('Sensor data updated')) {
                    console.log('✓ Sensor endpoint works correctly');
                    resolve(true);
                } else {
                    console.log('✗ Sensor endpoint error:', res.statusCode, data);
                    resolve(false);
                }
            });
        });

        req.on('error', (err) => {
            console.log('✗ Sensor endpoint connection failed:', err.message);
            resolve(false);
        });

        req.setTimeout(5000, () => {
            console.log('✗ Sensor endpoint timeout');
            req.destroy();
            resolve(false);
        });

        req.end();
    });
}

// Run tests
async function runTests() {
    console.log('Testing Car Parking IoT Backend...\n');
    
    const serverTest = await testServerResponse();
    const sensorTest = await testSensorEndpoint();
    
    console.log('\n--- Test Results ---');
    console.log(`Server Response: ${serverTest ? 'PASS' : 'FAIL'}`);
    console.log(`Sensor Endpoint: ${sensorTest ? 'PASS' : 'FAIL'}`);
    
    const allPassed = serverTest && sensorTest;
    console.log(`\nOverall: ${allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
    
    if (!allPassed) {
        console.log('\nNote: Make sure the server is running with "npm start" before running tests');
        process.exit(1);
    }
}

// Check if this is being run directly
if (require.main === module) {
    runTests();
}

module.exports = { testServerResponse, testSensorEndpoint };