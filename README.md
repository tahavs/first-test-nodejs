#node.js weather application

-->> Summary...
This application helps you to get temperature of any points of Earth, by entering address as its input.
The addressing part is handled by google maps apis, and the weather reporting part is handled by forecast.io website 

-->> How to Use...
1. open project folder
2. open cmd in top level root of project (to opening cmd you can: press "windows-logo + D", then type "cmd")
3. type in cmd: npm install (in order to install all dependencies)
4. type in cmd: node index -a tehran (in this example you will get Tehran, Iran temperature,
   if you want to get anywhere else temperature only change tehran to your address)
5. Only do step 4 again for diffrent addresses

-->> Some Points...
1. the result contains real temperature, feel temperature and weather summary (like cloudy or sunny)
2. the result should be something like:

    ________________________
    < forecast application >
    ------------------------
    Tehran, Tehran Province, Iran
    It is 4.59, but seems like 3.36, and it is Clear
    ________________________
