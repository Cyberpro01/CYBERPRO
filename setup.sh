#!/data/data/com.termux/files/usr/bin/bash

# Comprehensive Termux Setup Script for CYBERPRO WhatsApp Bot

# Current Date and Time: 2026-04-08 08:48:34
echo "Starting setup for CYBERPRO WhatsApp bot at $(date -u +\"%Y-%m-%d %H:%M:%S\")"

# Step 1: Update Termux and Packages
echo "Updating package lists..."
pkg update && pkg upgrade -y

# Step 2: Install necessary packages
echo "Installing required packages..."
pkg install python git curl -y

# Step 3: Clone the CYBERPRO repository
echo "Cloning the CYBERPRO repository..."
git clone https://github.com/Cyberpro01/CYBERPRO.git

# Step 4: Navigate to the project directory
cd CYBERPRO

# Step 5: Install Python requirements
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Step 6: Provide instructions for pairing code
echo "To start the bot with pairing code support, run the following command:"
echo "python main.py --pairing-code <YOUR_PAIRING_CODE>"

echo "Setup completed. You can now run the CYBERPRO WhatsApp bot."