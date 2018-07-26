# This project has been made pretty neat with the Aristos CMS

This is the Node version for the Aristos Content Managment System (CMS).

## Table of Contents
 - [Getting Started](#Getting-Started)
 - [Deploying](#Deploying)
 - [Changelog](#Changelog)
 - [Authors](#Authors)
 - [Contributing](#Contributing)
 - [License](#License)

## Getting Started

To run your new Aristos build, run:

```
npm run dev
```

This will run the gulp scripts, gulp styles, and gulp watch commands. Browsersync will then automatically pull up your build and you can start to build. The gulp watch command will be wtching specific folders for changes will automatically refresh your browser and server when needed.

Soon, [Aristos Builder](https://aristosbuilder.com/) will be a great resource to help you get started. It's just pretty lame right now.
For documentation, check out [Fox Design Agency](https://foxdesignagency.com/aristos/documentation)

## Deploying

When you are ready to deploy, get your code into wherever it is that you wish (we will be writing step by step guides on deploying to aws soon), and run:

```
npm run build
```

This will build your project into a dist folder. The NODE_ENV will need to be set to production but the project can be served from the root, as the index.js switch where it required the app.js from based on the NODE_ENV variable.

If you are using pm2, then there is a process.json included in the root of the project that sets the NODE_ENV variable for you. Simply run (you will need pm2 installed to run this command):

```
pm2 start process.json
```

refer to their (documentation)[http://pm2.keymetrics.io/docs/usage/application-declaration/] for more options while working with the process.json file.

## Changelog

[Current Changelog](https://foxdesignagency.com/aristos/changelog)

## Authors

* [Christopher Fox](https://foxchrisrealthe.com/)
* [Fox Design Agency](https://foxdesignagency.com)

## Contributing

Currently no contributions outside of [Fox Design Agency](https://foxdesignagency.com) will be accepted. This will change soon.

## License

Copyright 2018 Fox Design Agency

https://github.com/Fox-Design-Agency/Aristos-CMS-node
https://foxdesignagency.com/aristos

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

