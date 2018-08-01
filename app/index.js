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
    /* This makes upgrade available as options to be passed via --name */
    this.option("blog");
    this.option("contact");
    this.option("data");
    this.option("documentation");
    this.option("newsletter");
    this.option("portfolio");
    this.option("products");
    this.option("management");
    /* This makes the plugins available as options */

    /* start initial logs */
    this.log("Hey! Welcome the super neat Aristos Generator!!!");
    this.log("You'll just need to answer a few questions, and then");
    this.log("you should be able to build cool stuff.");
    this.log("");
    this.log("Make sure that you have this info ready:");
    this.log("  project name");
    this.log("  site title");
    this.log("  mongo uri");
    this.log("  mongo db name");
    this.log("  admin username");
    this.log("  admin pass");
    this.log("");
    this.log("Have fun!!");
    /* end intial logs */
  }
  //initialize
  initialize() {
    this.log("Now that you answered all that stuff, it's time to generate.");
    this.log("This will take a moment...");
    this.log("or two...");
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
        type: "password",
        name: "adminPass",
        message: "What is your admin password?",
        store: true
      }
    ]);
  }
  rootStuffs() {
    let prompts = this.config.get("promptValues");
    /* root stuffs */
    this.fs.copyTpl(this.templatePath("_package.json"), "package.json", {
      projectName: prompts.name
    });
    // this.fs.copy(this.templatePath("env"), ".env");
    this.fs.copy(this.templatePath("_process.json"), "process.json");
    this.fs.copy(this.templatePath("_.gitignore"), ".gitignore");

    this.fs.copy(this.templatePath("_CHANGELOG.md"), "CHANGELOG.md");
    this.fs.copy(this.templatePath("_LICENSE.md"), "LICENSE.md");
    this.fs.copy(this.templatePath("_README.md"), "README.md");

    this.fs.copy(this.templatePath("_index.js"), "index.js");
    this.fs.copy(this.templatePath("_gulpfile.js"), "gulpfile.js");
    this.fs.copy(this.templatePath("_webpack.config.js"), "webpack.config.js");
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
      }"},{"name":"aristosVersion","info": "0.1.0"},{"name": "sessionSecret","info": "sfjdnsjkfnslkejbnsifube93wjn8jg"}]`
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
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(prompts.adminPass, salt, (err, hash) => {
            db.collection("users").insertOne(
              {
                username: prompts.adminUser,
                password: hash,
                admin: 1
              },
              function(err, r) {
                if (err) {
                  return console.log(err);
                }
                client.close();
              }
            );
          });
        });
      }
    );
  }
  expansionStuffs() {
    if (this.options.blog) {
      this.fs.copy(
        this.templatePath("expansion/upgrade/blog"),
        "expansion/upgrade/blog"
      );
    }
    if (this.options.contact) {
      this.fs.copy(
        this.templatePath("expansion/upgrade/contact"),
        "expansion/upgrade/contact"
      );
    }
    if (this.options.data) {
      this.fs.copy(
        this.templatePath("expansion/upgrade/data-science"),
        "expansion/upgrade/data-science"
      );
    }
    if (this.options.documentation) {
      this.fs.copy(
        this.templatePath("expansion/upgrade/documentation-builder"),
        "expansion/upgrade/documentation-builder"
      );
    }
    if (this.options.newletter) {
      this.fs.copy(
        this.templatePath("expansion/upgrade/newletter"),
        "expansion/upgrade/newsletter"
      );
    }
    if (this.options.portfolio) {
      this.fs.copy(
        this.templatePath("expansion/upgrade/portfolio-projects"),
        "expansion/upgrade/portfolio-projects"
      );
    }
    if (this.options.products) {
      this.fs.copy(
        this.templatePath("expansion/upgrade/products"),
        "expansion/upgrade/products"
      );
      /* install paypal-rest-sdk */
    }
    if (this.options.management) {
      this.fs.copy(
        this.templatePath("expansion/upgrade/project-management"),
        "expansion/upgrade/project-management"
      );
    }
    /* if no options are passed, the folders and index files still need to be a thing */
    /* even if they are passed, they still need to be a ting */
    this.fs.copy(this.templatePath("expansion/index.js"), "expansion/index.js");
    this.fs.copy(
      this.templatePath("expansion/upgrade/index.js"),
      "expansion/upgrade/index.js"
    );
    this.fs.copy(
      this.templatePath("expansion/plugins/index.js"),
      "expansion/plugins/index.js"
    );
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

    this.log("it's all over and you have stuffs to work with and what not...");
    this.log(
      "Below you will find a list of all the files that got placed into your folder."
    );
    this.log("Have fun and stuff!");
  }

  install() {
    /* runs npm install at the end of folder creation */
    this.npmInstall();
  }
};
