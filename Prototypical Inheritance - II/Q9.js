function Device(name, type, status = "off") {
    this.name = name;
    this.type = type;
    this.status = status;
}

Device.prototype.turnOn = function() {
    this.status = "on";
    console.log(`${this.name} is now ON.`);
};

Device.prototype.turnOff = function() {
    this.status = "off";
    console.log(`${this.name} is now OFF.`);
};

Device.prototype.getStatus = function() {
    return `${this.name} is currently ${this.status}.`;
};

function SmartHome(owner) {
    this.owner = owner;
    this.devices = [];
}

SmartHome.prototype.addDevice = function(device) {
    this.devices.push(device);
    console.log(`${device.name} added to ${this.owner}'s smart home.`);
};

SmartHome.prototype.removeDevice = function(deviceName) {
    this.devices = this.devices.filter(device => device.name !== deviceName);
    console.log(`${deviceName} removed from ${this.owner}'s smart home.`);
};

SmartHome.prototype.listDevices = function() {
    this.devices.forEach(device => console.log(device.getStatus()));
};

function SmartDevice(name, type, brand, connectivity, status = "off") {
    Device.call(this, name, type, status);
    this.brand = brand;
    this.connectivity = connectivity;
}

SmartDevice.prototype = Object.create(Device.prototype);
SmartDevice.prototype.constructor = SmartDevice;

SmartDevice.prototype.updateFirmware = async function() {
    console.log(`Checking for firmware update for ${this.name}...`);
    try {
        const response = await fetch("https://api.mockserver.com/firmware");
        const data = await response.json();
        console.log(`Firmware update for ${this.name}: ${data.message}`);
    } catch (error) {
        console.log(`Error updating firmware for ${this.name}: ${error}`);
    }
};

SmartDevice.prototype.checkConnectivity = function() {
    console.log(`${this.name} connectivity: ${this.connectivity}`);
};

function SmartLight(name, brand, connectivity, brightness = 50, color = "white") {
    SmartDevice.call(this, name, "light", brand, connectivity);
    this.brightness = brightness;
    this.color = color;
}

SmartLight.prototype = Object.create(SmartDevice.prototype);
SmartLight.prototype.constructor = SmartLight;

SmartLight.prototype.setBrightness = function(level) {
    this.brightness = level;
    console.log(`${this.name} brightness set to ${this.brightness}.`);
};

SmartLight.prototype.setColor = function(newColor) {
    this.color = newColor;
    console.log(`${this.name} color changed to ${newColor}.`);
};

function SmartThermostat(name, brand, connectivity, temperature = 22, mode = "cool") {
    SmartDevice.call(this, name, "thermostat", brand, connectivity);
    this.temperature = temperature;
    this.mode = mode;
}

SmartThermostat.prototype = Object.create(SmartDevice.prototype);
SmartThermostat.prototype.constructor = SmartThermostat;

SmartThermostat.prototype.setTemperature = function(temp) {
    this.temperature = temp;
    console.log(`${this.name} temperature set to ${this.temperature}°C.`);
};

SmartThermostat.prototype.setMode = function(newMode) {
    this.mode = newMode;
    console.log(`${this.name} mode set to ${newMode}.`);
};

function User(username, password) {
    this.username = username;
    this.password = password;
    this.smartHome = new SmartHome(username);
}

User.prototype.authenticate = async function() {
    try {
        const response = await fetch("https://api.mockserver.com/auth", {
            method: "POST",
            body: JSON.stringify({ username: this.username, password: this.password }),
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        console.log(`Authentication for ${this.username}: ${data.status}`);
    } catch (error) {
        console.log(`Authentication failed: ${error}`);
    }
};

User.prototype.addDeviceToHome = function(device) {
    this.smartHome.addDevice(device);
};

User.prototype.removeDeviceFromHome = function(deviceName) {
    this.smartHome.removeDevice(deviceName);
};

const user1 = new User("Alice", "password123");
const light = new SmartLight("Living Room Light", "Philips", "WiFi");
const thermostat = new SmartThermostat("Bedroom Thermostat", "Nest", "WiFi");

user1.addDeviceToHome(light);
user1.addDeviceToHome(thermostat);
user1.smartHome.listDevices();

light.turnOn();
light.setBrightness(75);
light.setColor("blue");

thermostat.setTemperature(24);
thermostat.setMode("heat");

light.updateFirmware();
thermostat.checkConnectivity();
