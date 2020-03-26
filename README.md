![Chefmate Logo](client/frontend/src/images/logo.png)

<h3>
Arshad Khan,
Ashwin Mahesh,
Nathan Venckus,
Richa Tenany,
Turner Dunlop,
Vishva Pandya
</h3>
<h2>Features</h2>
<h3>Crawler</h3>
<p>Update later</p>
<h3>Ranker</h3>
<p>Update later</p>
<h3>Client</h3>
<p>Update later</p>

<h2>Running the Project</h2>
<h4>On initial download: "chmod +x start"</h4>
<h4>./start {mode: dev | prod} {install}</h4>
<p>To run the static build (with full, ie User login and storage, functionality), do "npm run build in client/frontend", then use localhost:8000</p>

<h2>Visual Studio Add-Ons</h2>
<p>Install Prettier and ESLint if you are using Visual Studio. Set formatOnSave to True in your user settings</p>

<h2>Important Commands</h2>
<h4>Creating a Python Virtual Environment</h4>
<p>python3 -m venv venv</p>
<h4>Activating a Virtual Environment</h4>
<p>source venv/bin/activate</p>
<h4>Exiting Virtual Environment</h4>
<p>deactivate</p>
<h4>Installing Dependencies</h4>
<p>pip3 install -r requirements.txt</p>
<h4>Adding a New Dependency</h4>
<p>pip3 install (new dependency)</p>
<p>pip freeze > requirements.txt </p>
<h4>Running the NodeJS Client Server</h4>
<p>npm run startDev</p>
<h4>Running the React Build Server</h4>
<p>run "npm start" inside of the frontend folder</p>
<h4>Running the Python Servers</h4>
<p>python3 (server name)</p>
<h4>Creating a static Build of React Client</h4>
<p>In client "npm run build"</p>

<h2>Git Commands</h2>
<h4>Creating a branch</h4>
<p>git checkout -b (branch name)</p>
<h4>Pulling changes</h4>
<p>git pull</p>
<h4>Checking what changes have been made since the last commit</h4>
<p>git status</p>
<h4>Adding files to a commit</h4>
<p>git add (file name)*</p>
<h4>Making a commit</h4>
<p>git commit -m "(commit message)"</p>
<h4>Pushing a commit to the repo</h4>
<p>git push</p>

<h2>Connecting To AWS DB Server</h2>
<p>Download Chefmate.pem and move it to the keys/ folder in the project</p>
<p>chmod 400 chefmate.pem</p>
<p>ssh -i Chefmate.pem ec2-user@18.222.251.5 OR run ./connect in the keys folder</p>
<p>Congratulations you are in the Chefmate DB</p>
<h4>Running the Crawler in the Background of the AWS Server</h4>
<p>nohup ./buildIndex > output.txt &</p>
<h4>Running the Ranker as a Service in AWS</h4>
<p>export FLASK_ENV="production"; python3 ranker.py</p>

<h2>Running the Crawler</h2>
<p>Set the desired number of iterations in main.py</p>
<p>./buildIndex</p>
