## build&deploy_node.js&deploy_surge&test the app
tvshows - a React.js app for looking up a tv show<br>
*tvshows-logging-server - a Spring Boot server for error logging (build&run in submodule's README)*<br>

### build
1. $ cd tvshows<br>
2. $ npm install<br>
3. $ npm build<br>

### deploy_Dockerfile
1. $ cd build<br>
2. $ npm run build<br>
4. $ mv ../Dockerfile.react.prod .
5. $ docker build -t tvshows .
6. $ docker run -d tvshows
7. go to http://localhost:3000<br>

### deploy_node.js
1. $ cd tvshows<br>
2. $ npm run node<br>
3. go to http://localhost:3000<br>

### deploy_surge
1. $ cd tvshows<br>
2. $ npm run surge<br>
3. project: [your/clone/path]/tvshows/build<br>
4. domain: http://tvshows.surge.sh<br>
5. go to http://tvshows.surge.sh<br>

### test
1. $ cd tvshows<br>
2. $ npm run test<br>
<br>

## User flow:
#### 1 - Landing page
![alt text](https://raw.githubusercontent.com/k-wasilewski/tvshows/master/screenshots/1landing_page.png)

#### 2 - Search results
![alt text](https://raw.githubusercontent.com/k-wasilewski/tvshows/master/screenshots/2results.png)

#### 3 - Show details
![alt text](https://raw.githubusercontent.com/k-wasilewski/tvshows/master/screenshots/3details.png)

#### 4 - Show original image
![alt text](https://raw.githubusercontent.com/k-wasilewski/tvshows/master/screenshots/4original_img.png)

