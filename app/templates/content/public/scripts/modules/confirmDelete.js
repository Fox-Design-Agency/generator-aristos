import $ from "jquery";
$("a.confirmDeletion").on("click", function() {
  if (!confirm("Confirm deletion")) {
    return false;
  }
});
