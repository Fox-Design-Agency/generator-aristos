const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/* media model Queries */
const FindAllMedia = require("../../../../important/admin/adminModels/queries/media/FindAllMedia");
/* media categories Queries */
// const FindAllMediaCategories = require("../../../../important/adminModels/queries/mediaCategories/FindAllMediaCategories");
/* Project Category model Queries */
const CountDocumentationCategories = require("../models/queries/documentationCategories/CountDocumentationCategories");
const FindAllDocumentationCategories = require("../models/queries/documentationCategories/FindAllDocumentationCategories");
const CreateDocumentationCategory = require("../models/queries/documentationCategories/CreateDocumentationCategories");
const EditDocumentationCategory = require("../models/queries/documentationCategories/EditDocumentationCategories");
const DeleteDocumentationCategory = require("../models/queries/documentationCategories/DeleteDocumentationCategories");
const FindDocumentationCategoryWithParams = require("../models/queries/documentationCategories/FindDocumentationWithParamsCategories");
const FindDocumentationCategoryByID = require("../models/queries/documentationCategories/FindOneDocumentationCategoriesByID");
const FindAllSortedDocumentationCategories = require("../models/queries/documentationCategories/FindAllSortedDocumentationsCategories");
const SortDocumentationCategories = require("../models/queries/documentationCategories/SortDocumentationCategoriesByID");
/* User Model Queries */
const FindOneUserByID = require("../../../../important/admin/adminModels/queries/user/FindOneUserWithID");
module.exports = {
  index(req, res, next) {
    const countDocumentationCategories = CountDocumentationCategories();
    const SortedCategories = FindAllSortedDocumentationCategories();
    Promise.all([countDocumentationCategories, SortedCategories]).then(
      result => {
        res.render(
          "../../../expansion/upgrade/documentation-builder/views/categories/documentation_categories",
          {
            categories: result[1],
            count: result[0]
          }
        );
      }
    );
  } /* end of index function */,

  addIndex(req, res, next) {
    let title,
      author,
      description,
      keywords = "";
    const AllMedia = FindAllMedia();
    AllMedia.then(media => {
      res.render(
        "../../../expansion/upgrade/documentation-builder/views/categories/add_documentation_category",
        {
          title: title,
          author: author,
          description: description,
          keywords: keywords,
          media: media
        }
      );
    });
  } /* end of add index function */,

  create(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }

        let title = req.body.title;
        let slug = title.replace(/\s+/g, "-").toLowerCase();
        let author = req.body.author;
        let description = req.body.description;
        let keywords = req.body.keywords;

        if (errors.length > 0) {
          FindAllMedia().then(media => {
            return res.render(
              "../../../expansion/upgrade/portfolio-projects/views/categories/add_project_category",
              {
                errors: errors,
                title: title,
                author: author,
                description: description,
                keywords: keywords,
                media: media
              }
            );
          });
        } else {
          const CheckIfExists = FindDocumentationCategoryWithParams({ slug: slug });
          CheckIfExists.then(category => {
            if (category.length > 0) {
              errors.push({ text: "Category title exists, choose another." });
              FindAllMedia().then(media => {
                return res.render(
                  "../../../expansion/upgrade/portfolio-projects/views/categories/add_project_category",
                  {
                    title: title,
                    author: author,
                    description: description,
                    keywords: keywords,
                    media: media
                  }
                );
              });
            } else {
              const CategoryProps = {
                title: title,
                slug: slug,
                author: author,
                description: description,
                keywords: keywords
              };
              CreateDocumentationCategory(CategoryProps);
              req.flash("success_msg", "Documentation Category Added!");
              res.redirect("/admin/documentation-builder-categories");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,

  editIndex(req, res, next) {
    const documentationCategory = FindDocumentationCategoryByID(req.params.id);
    const AllMedia = FindAllMedia();
    Promise.all([documentationCategory, AllMedia]).then(result => {
      res.render(
        "../../../expansion/upgrade/documentation-builder/views/categories/edit_documentation_category",
        {
          title: result[0].title,
          id: result[0]._id,
          author: result[0].author,
          description: result[0].description,
          keywords: result[0].keywords,
          media: result[1]
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

        let title = req.body.title;
        let slug = title.replace(/\s+/g, "-").toLowerCase();
        let id = req.params.id;
        let author = req.body.author;
        let description = req.body.description;
        let keywords = req.body.keywords;
        let imagepath = req.body.imagepath;

        if (errors.length > 0) {
          return res.render(
            "../../../expansion/upgrade/documentation-builder/views/categories/edit_documentation_category",
            {
              errors: errors,
              title: title,
              id: id,
              author: author,
              description: description,
              keywords: keywords
            }
          );
        } else {
          const CheckIfExists = FindDocumentationCategoryWithParams({
            slug: slug,
            _id: { $ne: id }
          });
          CheckIfExists.then(category => {
            if (category.length > 0) {
              errors.push({ text: "Category title exists, chooser another." });
              return res.render(
                "../../../expansion/documentation-builder/views/categories/edit_documentation_category",
                {
                  errors: errors,
                  title: title,
                  id: id,
                  author: author,
                  description: description,
                  keywords: keywords
                }
              );
            } else {
              const categoryProps = {
                title: title,
                slug: slug,
                author: author,
                description: description,
                keywords: keywords,
                imagepath: imagepath
              };
              EditDocumentationCategory(id, categoryProps);
              req.flash("success_msg", "Documentation Category Edited!");
              res.redirect("/admin/documentation-builder-categories");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of edit function */,
  delete(req, res, next) {
    DeleteDocumentationCategory(req.params.id);
    req.flash("success_msg", "Documentation Category Deleted!");
    res.redirect("/admin/documentation-builder-categories");
  } /* end of delete function */,
  reorder(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let ids = req.body["id[]"];
        SortDocumentationCategories(ids);
        /* look into this more */
        //   req.app.locals.pages = sortedRes;
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of reorder function */
};
