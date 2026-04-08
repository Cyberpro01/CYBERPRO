'use strict';

const fs = require('fs');
const path = require('path');

const pluginsDirectory = path.join(__dirname, 'plugins');
const plugins = [];

// Function to load a single plugin
function loadPlugin(pluginPath) {
    try {
        const plugin = require(pluginPath);
        plugins.push(plugin);
        console.log(`Successfully loaded plugin: ${pluginPath}`);
    } catch (error) {
        console.error(`Error loading plugin at ${pluginPath}:`, error);
    }
}

// Read the plugins directory
fs.readdir(pluginsDirectory, (err, files) => {
    if (err) {
        console.error('Error reading plugins directory:', err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(pluginsDirectory, file);
        // Load only .js files
        if (file.endsWith('.js')) {
            loadPlugin(filePath);
        }
    });
});

module.exports = plugins;
