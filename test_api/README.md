# Apower
## DOCKER

How did I build the image:   
1. ``` npm init ``` to start the project   
2. ``` npm install ``` install and save dependencies into package.json file   
3. Specify script of ```"start": "node app.js"``` (Doesn't have to do, can be different based on your application's entry)
4. Make sure your application runs   
5. Create new file name it "Dockerfile", and fill out the contents (Check documentation online, or ask me)   
6. ```docker build -t test-api-docker .```    
7. ```docker run -it -p 8000:3000 test-api-docker``` This line will create an container    
8. Should check the container work properly
9. Update your image ```docker build -t test-api-docker .```  same code   
10. To test the code, we mapped containter port 3000 to host machine port 8000, so   
check ```localhost://8000/testpath``` should display the message