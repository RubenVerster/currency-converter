Clone the repo with 'git clone https://github.com/RubenVerster/currency-converter.git'

Install all the package dependencies with 'npm i'

Once dependencies have been installed, you can start the app by running 'npm run start', this starts the application on your local server

If you're working on the app in production, have the SCSS compiler running by using 'npm run compile-sass' command in your terminal
This compiles the SCSS you write into CSS

When you have cloned this repo, create a .env file in the root of the project
Use the .env.example file as a reference for creating your .env

If an error message appears that mentions something along the lines of my API call limit being reached for the month,
I suggest going to https://manage.exchangeratesapi.io/ and creating an account for yourself
You will receive your own access key that you can use in the app to do API calls
If you do create your own access key, update your .env file in the root directory with the API Access Key that is generated for your account

Your .env file should look like this:
**REACT_APP_ACCESS_KEY=e5669707e0dca90df6c9f5a0ca835476**
\*This is one of my access keys, feel free to use it until my API calls limit is reached for the month XP

You can find this app live on this URL, "https://rubenverster.github.io/currency-converter/", but the API does not allow calls over HTTPS
You can only use the full app by cloning it and running it on a local server
