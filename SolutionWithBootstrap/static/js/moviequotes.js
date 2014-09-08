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


rh.wp.attachEventHandlers = function() {
  $('#insert-quote-modal').on('shown.bs.modal', function() {
    $("input[name='quote']").focus();
  });
};


rh.mq.enableButtons = function() {
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
    $("#insert-quote-modal input[name=quote]").val("");
    $("#insert-quote-modal input[name=movie]").val("");
    $("#insert-quote-modal input[name=entity_key]").val("").prop("disabled", true);
    $("#insert-quote-modal .modal-title").html("Add a MovieQuote");
    $("#insert-quote-modal button[type=submit]").html("Add Quote");
    rh.mq.hideNavbar();
  });

  $(".edit-movie-quote").click(function() {
    quote = $(this).find(".quote").html();
    movie = $(this).find(".movie").html();
    entityKey = $(this).find(".entity-key").html();
    $("#insert-quote-modal input[name=quote]").val(quote);
    $("#insert-quote-modal input[name=movie]").val(movie);
    $("#insert-quote-modal input[name=entity_key]").val(entityKey).prop("disabled", false);
    $("#insert-quote-modal .modal-title").html("Edit this MovieQuote");
    $("#insert-quote-modal button[type=submit]").html("Edit Quote");
  });

  $(".delete-movie-quote").click(function() {
    entityKey = $(this).find(".entity-key").html();
    $("#delete-quote-modal input[name=entity_key]").val(entityKey);
  });

};


$(document).ready(function() {
  rh.mq.enableButtons();
  rh.wp.attachEventHandlers();
});
