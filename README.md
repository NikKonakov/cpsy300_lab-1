# Hey there! This is the README for the cpsy300_lab-1 repository.
# cpsy300_lab-1

## Description
This repository contains the code for the first lab of the CPSY 300 course. The lab focuses on using docker to run the Web Application connected to DB. 

## How to Setup?
 
1. Clone the repository:
   ```bash
   git clone <repository-url>
2. Open the terminal, navigate to the cloned directory and open cpsy300_lab-1 folder:
   ```bash
   cd cpsy300_lab-1
   ```
3. Copy the `.env` file to the project root directory:
   ```bash
   cp .env.example .env
   ```
   Make sure to fill in the necessary environment variables in the `.env` file.
3. Build the Docker image:
   ```bash
   docker build -t cpsy300_lab-1 .
   ```
4. Run the Docker container:
   ```bash
   docker run -p 3000:3000 cpsy300_lab-1
   ```