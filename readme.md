# Whatsapp Clone

## Whatsapp Web Clone (New Version)


https://user-images.githubusercontent.com/64752455/135771911-fc71b88c-6665-461a-814b-44af7fae3fd0.mp4

A complete clone of whatsapp web using React Js as the front end and Node Js as the back end. MongoDB is used as the database. Use of 3rd party library is minimum. Redux is used for managing the entire state and redux saga for handling side effects. AWS S3 is used for data storage and retrieval.

### **Used Technologies:**<br/>
a) **Front End**: React Js, Redux, Redux-Saga, Axios, Socket Client, Peer JS, React Spring.<br/>
b) **Back End**: Node Js, Redis, Cluster, Socket.io, Mongo DB, Peer and Express, AWS S3.

For more details about the functionalities of the clone, please visit the following link.<br />
https://joeljaimon.com/whatsapp-clone/about


#### Initial Setup:

Create a .env file inside of client and server folders respectively:

**- whatsapp-client/.env**
```
REACT_APP_GAUTH_CLIENT_ID=<Your_gauth_client_id>
REACT_APP_SERVER_URL=http://localhost:8181
REACT_APP_PEER_SERVER_URL=http://localhost:9000
```

**- whatsapp-server/.env**
```
MONGO_PASSWORD=<your_mondodb_password>
MONGO_USERNAME=<your_mongo_username>

GAUTH_CLIENT_ID=1<Your_gauth_client_id>
GAUTH_CLIENT_SECRET=<Your_gauth_client_secret>

JWT_REFRESH_SECRET=ERDTFGYUHIJKOftgybhjnkmTYFYGBHUNJ%^TUGHYNJKBVGFYGUHKJHVHFCV~BJHk
JWT_ACCESS_SECRET=TYFGHBJNKU*&YIUGJBHNKMLIYUHJKML<*&^YGHBNM<LO*&^%REW@ERFVBHJUYGVBN

AWS_S3_BUCKET_NAME=<s3_bucket_name>
AWS_S3_REGION_NAME=<s3_region_name>

AWS_ACCESS_KEY_ID=<access_key_id>
AWS_SECRET_ACCESS_KEY=<aws_secret_access_key>

```

Make sure to create a IAM user with the required policies. For this project I've used my custom policy:
![policy example](https://user-images.githubusercontent.com/64752455/142682383-2371f184-0679-4574-9dce-89907541e37f.PNG)

Also, you should have node installed, also a Redis server running on its default port (6379).
Once the above part is done.

### Installation:

- In whatsapp-server run:<br>
`npm i && npm run dev`

- In whatsapp-client run:<br>
`npm i && npm start`

### Redux Store
https://user-images.githubusercontent.com/64752455/142684906-f56231a1-8c20-4304-afee-f305b43a2077.mp4

### Mongo DB:
![mongo-db](https://user-images.githubusercontent.com/64752455/142684716-194b2ba5-1a3f-4ee7-a987-f594e00b2ea1.PNG)

### AWS S3:
![aws-s3](https://user-images.githubusercontent.com/64752455/142684407-1d79162e-b73b-41ab-a36d-ac408200f712.PNG)

<br>
<br>

## Whatsapp clone using firebase (Old Version):

A modified version of WhatsApp Web where you can create global rooms and chat in realtime. It uses firebase for google authentication and uses its NoSQL and SQL hybrid as database. React Context API is used for managing global state.

**Repo link**<br />
https://github.com/joel-jaimon/whatsapp-clone/tree/e4967914370de302d5dd3f8bfb5fc88e82d2b147

**Preview**<br />
![enter image description here](https://raw.githubusercontent.com/joel-jaimon/whatsapp-clone/e4967914370de302d5dd3f8bfb5fc88e82d2b147/Demo.gif)
