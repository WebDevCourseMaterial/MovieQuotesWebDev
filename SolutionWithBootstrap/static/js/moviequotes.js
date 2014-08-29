/** namespace. */
var rh = rh || {};
rh.mq = rh.mq || {};

rh.mq.editing = false;

rh.mq.hideNavbar = function() {
  $navbar = $(".collapse.navbar-collapse");
  if ($navbar.hasClass("in")) {
    $navbar.collapse('hide');
  }
};

rh.mq.enableButtons = function() {
  $('#add-quote-modal').on('shown.bs.modal', function() {
    $("input[name='quote']").focus();
  });

  $("#toggle-edit").click(function() {
    if (rh.mq.editing) {
      rh.mq.editing = false;
      $(".edit-actions").addClass("hidden");
      $(this).html("Edit");
    } else {
      rh.mq.editing = true;
      $(".edit-actions").removeClass("hidden");
      $(this).html("Done");
    }
    rh.mq.hideNavbar();
  });

  $("#add-quote").click(function() {
    $("#add-quote-modal input[name=quote]").val("");
    $("#add-quote-modal input[name=movie]").val("");
    $("#add-quote-modal input[name=entity_key]").val("").prop("disabled", true);
    $("#add-quote-modal .modal-title").html("Add a MovieQuote");
    $("#add-quote-modal button[type=submit]").html("Add Quote");
    rh.mq.hideNavbar();
  });

  $(".edit-movie-quote").click(function() {
    quote = $(this).find(".quote").html();
    movie = $(this).find(".movie").html();
    entityKey = $(this).find(".entity-key").html();
    $("#add-quote-modal input[name=quote]").val(quote);
    $("#add-quote-modal input[name=movie]").val(movie);
    $("#add-quote-modal input[name=entity_key]").val(entityKey).prop("disabled", false);
    $("#add-quote-modal .modal-title").html("Edit this MovieQuote");
    $("#add-quote-modal button[type=submit]").html("Edit Quote");
  });

  $(".delete-movie-quote").click(function() {
    entityKey = $(this).find(".entity-key").html();
    $("#delete-quote-modal input[name=entity_key]").val(entityKey);
  });

};


$(document).ready(function() {
  rh.mq.enableButtons();
});
