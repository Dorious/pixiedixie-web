![](https://user-images.githubusercontent.com/2143349/72977784-7fd1b680-3dd5-11ea-917a-3bfe7660f590.png)

# Pixie & Dixie Front-end - The ultimate search!
Pixie & Dixie Front-end is the nice part of the Pixie & Dixie ultimate universe!<br>
Checkout the [[1] Pixie & Dixie API][#api] for full setup.

## Installation
Clone stuff obviously:

    $ git clone git@github.com:Dorious/pixiedixie-web.git
You will need `pixiedixie-api` anyway to run so please get that to and install it.
	
And install what is necessary:

	$ npm install
    
### Running

### Production

	$ npm run build
	# npm run production
This will build bundle of the project and run `http-server` to serve the site.

After that you can run docker stuff.
	
	$ docker image build -t pixiedixie-web:1.0.1 
	$ docker container run --publish 9000:9000 --name pixiedixie-web pixiedixie-web:1.0.1

Docker Compose (don't work fully, should forward network but I can't proxy the api, will fix later):

	$ docker-compose up
Thinking about diff approach if proxy won't work:

Instead of trying to proxy from one container to another I wil run them and then make proxy server on top to connect them both.

## Development
We are using `webpack-dev-server`, so:

	$ npm start
...and voila! If you have api on different port check `webpack.config.js` for `proxy`.

### Used techs/libs:
1. Webpack + Babel
2. React + Hooks + Styled Components
2. TypeScript
4. Axios
5. Jest (with ts-jest preset)

## TODO
1. Generally this was done really fast testing new features and Styled Components, so this is not written beautifully.
2. Ideas I haven't added:
	* DataSource picker

[#frontend]: https://github.com/Dorious/pixiedixie-api "API"
[#apidoc]: http://localhost:8001/api/v1 "API generated documentation"