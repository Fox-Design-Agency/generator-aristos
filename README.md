# Aristos CMS - Node Version
- **Should be production ready within a few updates**

This is the Node version for the Aristos Content Managment System (CMS).

## Getting Started

You will can globally install the project and you will need yo if you do not have it.
```
npm install -g generator-aristos
npm install -g yo
```

When that is done, just make a folder, go into said folder and run the generator.
You will be prompted for information so have this ready before starting the installer:
- Project Name
- Website Name (Not the Url, just the name)
- Mongodb URI 
- Mongodb database name
- admin username
- admin password
Once you have this information, then make whatever you want.

```
mkdir <whatever you name your directory>
cd <whatevevr you named your directory>
yo aristos
```

If you would like to also install an upgrade/plugin package, add the appropiate flag:
```
--blog
--contact
--documentation
--newsletter
--portfolio
--products
--management
```

an example of using a simple or multiple option flags are as shown:
```
yo aristos --blog
yo aristos --products --blog
```

You can also change the default color layout by using the flags:
```
--blue
--orange
--pink
--purple
```
an example of using the color option flags are as shown:
```
yo aristos --blue
```
Each option flag needs a space after it, otherwise two options will be seen by the generator as a single option and not function correctly.

The current state of the upgrade/plugin packages should also be noted:
#### Upgrades
    - blog: very close to be fully working
    - contact: can recieve contact but not much else
    - documentation: Mostly works
    - newsletter: not a thing
    - portfolio: Mostly works, editing images doesnt always work on first try
    - products: Mostly works, orders and coupons still being worked on
    - management: Mostly working
#### Plugins
    - printful: option flag not set, mostly works

Soon, [Aristos Builder](https://aristosbuilder.com/) will be a great resource to help you get started. It's just pretty lame right now.

For documentation, check out [Fox Design Agency](https://foxdesignagency.com/aristos/documentation)


## Changelog

[Current Changelog](https://foxdesignagency.com/aristos/changelog)

## Authors

* [Christopher Fox](https://foxchrisrealthe.com/)
* [Fox Design Agency](https://foxdesignagency.com)

## Contributing

Currently no contributions outside of [Fox Design Agency](https://foxdesignagency.com) will be accepted. This will change soon.

## Acknowledgments

* This will be updated soon.

## License

Copyright 2018 Fox Design Agency

https://github.com/Fox-Design-Agency/Aristos-CMS-node
https://foxdesignagency.com/aristos

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
