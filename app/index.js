const Generator = require("yeoman-generator");
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcryptjs");
module.exports = class extends Generator {
  //     // The name `constructor` is important here
  //   constructor(args, opts) {
  //     // Calling the super constructor is important so our generator is correctly set up
  //     super(args, opts);

  //     // Next, add your custom code
  //     this.option('babel'); // This method adds support for a `--babel` flag
  //   }
  constructor(args, opts) {
    super(args, opts);

    // This makes `appname` a required argument.
    this.argument("appname", { type: String, required: false });

    // And you can then access it later; e.g.
    // this.log(this.options.appname);

    this.templatePath();
    this.log("Hey! Welcome the super neat Aristos Generator!!!");
  }
  //initialize
  initialize() {
    this.log("Hey! Welcome the super neat Aristos Generator!!!");
  }
  //prompt
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname, // Default to current folder name
        store: true
      },
      {
        type: "input",
        name: "site",
        message: "Your site title",
        default: this.appname, // Default to current folder name
        store: true
      },
      {
        type: "input",
        name: "mongoURI",
        message: "What is your mongo connection string?",
        store: true
      },
      {
        type: "input",
        name: "dbName",
        message: "What is your mongo database name?",
        store: true
      },
      {
        type: "input",
        name: "adminUser",
        message: "What is your admin username?",
        store: true
      },
      {
        type: "input",
        name: "adminPass",
        message: "What is your admin password?",
        store: true
      }
    ]).then(answers => {});
  }
  rootStuffs() {
    /* root stuffs */
    this.fs.copy(this.templatePath("package.json"), "package.json");
    // this.fs.copy(this.templatePath("env"), ".env");
    this.fs.copy(this.templatePath("process.json"), "process.json");
    this.fs.copy(this.templatePath(".gitignore", ".gitignore"))

    this.fs.copy(this.templatePath("CHANGELOG.md"), "CHANGELOG.md");
    this.fs.copy(this.templatePath("COPYRIGHT.md"), "COPYRIGHT.md");
    this.fs.copy(this.templatePath("LICENSE.md"), "LICENSE.md");
    this.fs.copy(this.templatePath("README.md"), "README.md");

    this.fs.copy(this.templatePath("index.js"), "index.js");
    this.fs.copy(this.templatePath("gulpfile.js"), "gulpfile.js");
    this.fs.copy(this.templatePath("webpack.config.js"), "webpack.config.js");
  }
  importantStuffs() {
    this.fs.copy(this.templatePath("important"), "important");
    let prompts = this.config.get("promptValues");
    // create the stuffs.json file
    this.fs.write(
      "important/AppStuff/config/stuff.json",
      `[{"name": "database","info": "${
        prompts.mongoURI
      }"},{"name": "site-title","info": "${
        prompts.site
      }"},{"name":"aristosVersion","info": "0.0.3"},{"name": "sessionSecret","info": "asdibslvblblesiflbuibeb3893hbwp9fnb"}]`
    );
    //create db collection
    //hash pass
    MongoClient.connect(
      prompts.mongoURI,
      {
        useNewUrlParser: true
      },
      function(err, client) {
        if (err) {
          return console.log(err);
        }
        const db = client.db(prompts.dbName);
        db.collection("users").insertOne({
          username: prompts.adminUser,
          password: prompts.adminPass,
          admin: 1
        }, function(err, r){
            if (err) {
                return console.log(err);
              }
            client.close()
        });
      }
    );
  }
  expansionStuffs() {
    this.fs.copy(this.templatePath("expansion"), "expansion");
  }
  contentStuffs() {
    this.fs.copy(this.templatePath("content"), "content");
  }
  gulpstuffs() {
    this.fs.copy(this.templatePath("gulp"), "gulp");
  }
  testStuffs() {
    this.fs.copy(this.templatePath("test"), "test");
  }
  //end
  methodEnd() {
    this.config.delete("promptValues");
    this.log(
      "it's all over and you have stuffs to work with and what not... enjoy!"
    );
  }
};
