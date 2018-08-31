const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

// Project model Queries
const CountLogs = require("../models/queries/changelog/CountLogs");
const FindAllLogs = require("../models/queries/changelog/FindAllLogs");
const FindLogsWithParams = require("../models/queries/changelog/FindLogWithParams");
const FindOneLogsByID = require("../models/queries/changelog/FindOneLogByID");
const CreateLogs = require("../models/queries/changelog/CreateLogs");
const EditLogs = require("../models/queries/changelog/EditLog");
const DeleteLogs = require("../models/queries/changelog/DeleteLog");
const FindAllSortedLogs = require("../models/queries/changelog/FindAllSortedLogs");
const FindSortedLogsWithParam = require("../models/queries/changelog/FindSortedLogsWithParams");
const FindAllRevSortedLogs = require("../models/queries/changelog/FindAllSortedLogs");
const sortLogsById = require("../models/queries/changelog/SortLogByID");
/* media model Queries */
const FindAllMedia = require("../../../../important/admin/adminModels/queries/media/FindAllMedia");
/* media categories Queries */
// const FindAllMediaCategories = require("../../../../important/adminModels/queries/mediaCategories/FindAllMediaCategories");
/* Documentation Category model Queries */
const FindAllDocumentationCategories = require("../models/queries/documentationCategories/FindAllDocumentationCategories");
/* User Model Queries */
const FindOneUserByID = require("../../../../important/admin/adminModels/queries/user/FindOneUserWithID");
module.exports = {
  index(req, res, next) {
    Promise.all([
      FindAllSortedLogs(),
      FindAllDocumentationCategories(),
      CountLogs()
    ]).then(result => {
      res.render(
        "../../../expansion/upgrade/documentation-builder/views/changelog",
        {
          projects: result[0],
          categories: result[1],
          count: result[2]
        }
      );
    });
  } /* end of index function */,
  catIndex(req, res, next) {
    Promise.all([
      FindSortedLogsWithParam({ category: req.params.category }),
      FindAllDocumentationCategories(),
      CountLogs()
    ]).then(result => {
      res.render(
        "../../../expansion/upgrade/documentation-builder/views/changelog",
        {
          projects: result[0],
          categories: result[1],
          count: result[2]
        }
      );
    });
  } /* end of cat index function */,
  addIndex(req, res, next) {
    let title,
      content,
      price,
      keywords,
      description,
      author = "";
    Promise.all([FindAllDocumentationCategories(), FindAllMedia()]).then(
      result => {
        res.render(
          "../../../expansion/upgrade/documentation-builder/views/add_changelog",
          {
            title: title,
            content: content,
            categories: result[0],
            price: price,
            media: result[1],
            description: description,
            keywords: keywords,
            author: author
          }
        );
      }
    );
  } /* end of add index function */,

  create(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }
        if (!req.body.content) {
          errors.push({ text: "Content must have a value." });
        }

        let title = req.body.title;
        let slug = title.replace(/\s+/g, "-").toLowerCase();
        let content = req.body.content;
        let category = req.body.category;
        let keywords = req.body.keywords;
        let description = req.body.description;
        let author = req.session.passport.user;

        if (errors.length > 0) {
          Promise.all([FindAllDocumentationCategories(), FindAllMedia()]).then(
            result => {
              res.render(
                "../../../expansion/upgrade/documentation-builder/views/add_changelog",
                {
                  errors: errors,
                  title: title,
                  content: content,
                  categories: result[0],
                  media: result[1],
                  description: description,
                  keywords: keywords,
                  author: author
                }
              );
            }
          );
        } else {
          const CheckIfExists = FindLogsWithParams({
            slug: slug,
            category: category
          });
          CheckIfExists.then(project => {
            if (project.length > 0) {
              errors.push({ text: "Log title exists, chooser another." });
              Promise.all([
                FindAllDocumentationCategories(),
                FindAllMedia()
              ]).then(result => {
                res.render(
                  "../../../expansion/upgrade/documentation-builder/views/add_changelog",
                  {
                    errors: errors,
                    title: "",
                    content: content,
                    categories: result[0],
                    media: result[1],
                    description: description,
                    keywords: keywords,
                    author: author
                  }
                );
              });
            } else {
              const ProjectProps = {
                title: title,
                slug: slug,
                content: content,
                category: category,
                description: description,
                keywords: keywords,
                sorting: 0,
                author: author
              };
              CreateLogs(ProjectProps);
              req.flash("success_msg", "Log added!");
              res.redirect("/admin/changelog-builder");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,

  editIndex(req, res, next) {
    Promise.all([
      FindAllDocumentationCategories(),
      FindOneLogsByID(req.params.id),
      FindAllMedia()
    ]).then(result => {
      res.render(
        "../../../expansion/upgrade/documentation-builder/views/edit_changelog",
        {
          title: result[1].title,
          content: result[1].content,
          categories: result[0],
          selectedCat: result[1].category,
          id: result[1]._id,
          media: result[2],
          author: result[1].author,
          description: result[1].description,
          keywords: result[1].keywords
        }
      );
    });
  } /* end of edit index function */,

  edit(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }
        if (!req.body.content) {
          errors.push({ text: "Content must have a value." });
        }

        let title = req.body.title;
        let slug = title.replace(/\s+/g, "-").toLowerCase();
        let content = req.body.content;
        let category = req.body.category;
        let id = req.params.id;
        let description = req.body.description;
        let keywords = req.body.keywords;
        if (errors.length > 0) {
          req.flash("error_msg", "Stuff is wrong, fix stuffs.");
          res.redirect("/admin/portfolio/edit-project/" + id);
        } else {
          const ProjectParams = {
            title: title,
            slug: slug,
            content: content,
            category: category,
            description: description,
            keywords: keywords
          };
          EditLogs(id, ProjectParams);

          req.flash("success_msg", "Changelog updated!");
          res.redirect("/admin/changelog-builder");
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of edit function */,
  deleteProject(req, res, next) {
    let id = req.params.id;
    DeleteLogs(id);
    req.flash("success_msg", "Changelog deleted!");
    res.redirect("/admin/changelog-builder");
  } /* end of delete project */,

  reorder(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let ids = req.body["id[]"];
        sortLogsById(ids);
        FindAllSortedLogs();
      } else {
        res.redirect("/users/login");
      }
    });
  }
};