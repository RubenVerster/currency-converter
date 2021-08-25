Clone the repo with 'git clone https://github.com/RubenVerster/currency-converter.git'

Install all the package dependencies with 'npm i'

Once dependencies have been installed, you can start the app by running 'npm run start', this starts the application on your local server

If you're working on the app in production, have the SCSS compiler running by using 'npm run compile-sass' command in your terminal
This compiles the SCSS you write into CSS

You can find this app live on this URL, "https://rubenverster.github.io/currency-converter/", but the API does not allow calls over HTTPS
You can only use the full app by cloning it and running it on a local server

If an error message appears that mentions something along the of my API call limit being reached for the month,
I suggest going to https://manage.exchangeratesapi.io/ and creating an account for yourself
You will receive your own access key that you can use in the app to do API calls
If you do create your own access key, go to the following components and enter your unique API Access Key:
App.tsx - on line 9, replace the ACCESS_KEY const with you API Access Key
HistoricalData.tsx - on line 16, replace the ACCESS_KEY const with you API Access Key
