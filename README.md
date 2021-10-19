### Dev Finder

To run this project on your machine, please clone the repository and create a .env file in the project directory.
An example .env file:

```
MONGO_URI=mongodb+srv://username:password@localhost:27017/yourdbname
JWT_SECRET=yoursecrethere
```

After cloning the repository and creating a .env file with a proper MongoDB connection string and entering a jwt secret please run
the following command inside the project directory:

```
npm i && npm run start
```
