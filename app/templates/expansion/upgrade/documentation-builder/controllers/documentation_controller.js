const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/* Documentation model Queries */
const CountDocumentation = require("../models/queries/documentation/CountDocumentation");
const FindAllDocumentation = require("../models/queries/documentation/FindAllDocumentation");
const FindDocumentationWithParams = require("../models/queries/documentation/FindDocumentationWithParams");
const FindOneDocumentationByID = require("../models/queries/documentation/FindOneDocumentationByID");
const CreateDocumentation = require("../models/queries/documentation/CreateDocumentation");
const EditDocumentation = require("../models/queries/documentation/EditDocumentation");
const DeleteDocumentation = require("../models/queries/documentation/DeleteDocumentation");
const FindAllSortedDocumentation = require("../models/queries/documentation/FindAllSortedDocumentations");
const SortDocumentationByID = require("../models/queries/documentation/SortDocumentationByID");
const FindAllSortedDocumentationWithParams = require("../models/queries/documentation/FindSortedDocumentationWithParams");
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
      FindAllSortedDocumentation(),
      FindAllDocumentationCategories(),
      CountDocumentation()
    ]).then(result => {
      res.render(
        "../../../expansion/upgrade/documentation-builder/views/documentation",
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
      FindAllSortedDocumentationWithParams({
        category: req.params.category
      }),
      FindAllDocumentationCategories(),
      CountDocumentation()
    ]).then(result => {
      res.render(
        "../../../expansion/upgrade/documentation-builder/views/documentation",
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
      description = "";
    Promise.all([FindAllDocumentationCategories(), FindAllMedia()]).then(
      result => {
        res.render(
          "../../../expansion/upgrade/documentation-builder/views/add_documentation",
          {
            title: title,
            content: content,
            categories: result[0],
            price: price,
            media: result[1],
            description: description,
            keywords: keywords
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
                "../../../expansion/upgrade/documentation-builder/views/add_documentation",
                {
                  errors: errors,
                  title: title,
                  content: content,
                  categories: result[0],
                  media: result[1],
                  description: description,
                  keywords: keywords
                }
              );
            }
          );
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
          CreateDocumentation(ProjectProps);

          req.flash("success_msg", "Documentation added!");
          res.redirect("/admin/documentation-builder");
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,

  editIndex(req, res, next) {
    Promise.all([
      FindAllDocumentationCategories(),
      FindOneDocumentationByID(req.params.id),
      FindAllMedia()
    ]).then(result => {
      res.render(
        "../../../expansion/upgrade/documentation-builder/views/edit_documentation",
        {
          title: result[1].title,
          content: result[1].content,
          categories: result[0],
          selectedCat: result[1].category.slug,
          id: result[1]._id,
          media: result[2],
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
          res.redirect("/admin/documentation-builder/edit-documentation/" + id);
        } else {
          const ProjectParams = {
            title: title,
            slug: slug,
            content: content,
            category: category,
            description: description,
            keywords: keywords
          };
          EditDocumentation(id, ProjectParams);

          req.flash("success_msg", "Documentation updated!");
          res.redirect("/admin/documentation-builder");
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of edit function */,
  deleteProject(req, res, next) {
    let id = req.params.id;
    DeleteDocumentation(id);
    req.flash("success_msg", "Documentation deleted!");
    res.redirect("/admin/documentation-builder");
  } /* end of delete project */,

  reorder(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let ids = req.body["id[]"];

        SortDocumentationByID(ids);
        FindAllSortedDocumentation();
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of reorder documentation */
};