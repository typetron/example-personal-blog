<div style="text-align: center;">
<h1>A simple personal blog app </h1>
<h3>Created using Typetron</h3>
<h4>Frontend created using Angular</h4>
</div>

### How to start the project

This project is using Angular as a frontend framework, serving all its assets statically using Typetron. This means that
you will need to build the Angular app before opening the browser. Usually, apps using Angular have their own server
that resolves the frontend resources, but in this Typetron app we wanted to demonstrate it can serve static assets as
well. There are other examples on the [Typetron website](https://typetron.org) about how you can run Typetron and a
frontend server separately. That kind of setup makes use of the `CORSMiddleware` because they run on different ports.

##### Install dependencies

```bash
$ npm install
$ cd frontend
$ npm install
```

##### Run the build script to build the Angular app.

```bash
# inside the `frontend` directory
$ npm run build
# or
$ npm run build:watch # if you want to rebuild the Angular app after doing some modifications
```

##### Start the app by running this command in the root directory of the project

```bash
$ npm start
```

The app comes with some dummy data already in the database. You can login with the admin user using:

```
Email: admin@typetron.org
Password: password
```

Visit (localhost:8000)[http://localhost:8000] in a browser and explore the app.

Have fun!
