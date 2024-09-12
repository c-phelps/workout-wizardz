$(document).ready(function () {
  // when any button with data-exercise-id is click on
  $("body").on("click", ".button[data-exercise-id]", async function (event) {
    event.preventDefault();
    // retrieve the data-workout-id and exercise-id values
    const workoutId = $(this).data("workout-id");
    const exerciseId = $(this).data("exercise-id");

    // retrieve the workout data by workout-id found above
    $.get(`/api/workout/${workoutId}`, function (data) {
      // find specific exercise
      const exercise = data.exercises.find((ex) => ex.id === exerciseId);
      // if the array has returned a value for workout exercises
      if (exercise && exercise.workoutexercises) {
        $("#notes").val(exercise.workoutexercises.notes || "");
      } else {
        $("#notes").val("");
      }
      // activate modal
      $("#exercise-modal").addClass("is-active");
      // pass workout id and exercise id to modal
      $("#exercise-modal").data("workout-id", workoutId);
      $("#exercise-modal").data("exercise-id", exerciseId);
      // take the exercise name and store it in a data variable to be read by the modal

      const formTitle = `${exercise.Name}`;
      $("#exercise-title").text(formTitle);
    });
  });
  // when user clicks save for a note
  $("#exercise-form").on("submit", async function (event) {
    event.preventDefault();
    // retrieve values passed from the button click above
    const workoutId = $("#exercise-modal").data("workout-id");
    const exerciseId = $("#exercise-modal").data("exercise-id");

    // set the formData to an object with a value from the notes field if retrieved from above
    const formData = {
      notes: $("#notes").val(),
    };
    // attempt to update the workout/exercise notes
    try {
      const response = await fetch(`/api/workout/${workoutId}/exercise/${exerciseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
    // de-activate the modal
    $("#exercise-modal").removeClass("is-active");
    location.reload();
  });

  // coppied a lot of functionality from put function above
  $("#btn-delete").on("click", async function (event) {
    event.preventDefault();
    // retrieve values passed from the button click above
    const workoutId = $("#exercise-modal").data("workout-id");
    const exerciseId = $("#exercise-modal").data("exercise-id");
    // verify that the user actually wants to remove the exercises
    if (!window.confirm("Are you sure you want to delete this exercise from the workout?")) {
      return;
    }
    // attempt to delete the exercises by workout and exercise id
    try {
      const response = await fetch(`/api/workout/${workoutId}/exercise/${exerciseId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log("Success:", result);
    } catch (err) {
      console.error("Error:", error);
    }
    // hide modal
    $("#exercise-modal").removeClass("is-active");
    location.reload();
  });

  // if the button with the class delete (the x on the modal) is clicked
  // close the modal
  $(".delete, .modal-background").on("click", function () {
    $("#exercise-modal").removeClass("is-active");
  });

  // copied functionality from exercise deletion for workout deletion
  $(".btn-delete-workout").on("click", async function () {
    const workoutId = $(this).data("workout-id");
    if (!window.confirm("Are you sure you want to delete this workout?")) {
      return;
    }
    try {
      const response = await fetch(`/api/workout/${workoutId}`, {
        method: "DELETE",
      });
      const result = await response.json();
      console.log("Success:", result);
      location.reload();
    } catch (err) {
      console.error("Error:", error);
    }
  });

  $("#btn-add-workout").on("click", function () {
    document.location.replace("/api/exercise");
  });
});
