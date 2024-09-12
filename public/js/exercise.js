// make sure DOM is loaded
$(document).ready(function () {
  // when a button with muscle-group class is clicked
  $("body").on("click", ".muscle-group", async function () {
    // determine the muscle-group from the data-muscle-group
    const muscleGroup = $(this).data("muscle-group");
    try {
      // retrieve the data from the api/exercise/group/muscle-group GET route
      const response = await fetch(`/api/exercise/group/${muscleGroup}`);
      // convert the response to json data
      const exercises = await response.json();
      // define location for exercise list and exercise data and empty them out
      const exercisesList = $("#exercises-list");
      const exerciseData = $("#exercise-data");
      exercisesList.empty();
      exerciseData.empty();

      // for each of the values returned create a button element a quarter of the screen wide and append them to the list area
      exercises.forEach((exe) => {
        exercisesList.append(`<div class="column is-one-quarter">
          <button class="exercise button is-light is-fullwidth" data-exercise="${exe.Name}">
            ${exe.Name}
          </button>
        </div>`);
      });
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  });
  // on click of an exercise
  $(document).ready(function () {
    $("body").on("click", ".exercise", async function () {
      // set the exercise = to the data-exercise value
      const exercise = $(this).data("exercise");
      // attempt a get request on api/exercise/id and pass the exercise name
      try {
        const response = await fetch(`/api/exercise/${exercise}`);
        // convert the response to json data
        const exerciseData = await response.json();
        // define the exercise container and empty it
        const exerciseContainer = $("#exercise-data");
        exerciseContainer.empty();
        // constructor string for HTML elements
        const strHTML = `<div class="column is-three-fifths is-offset-one-fifth">
          <p class="has-text-weight-bold">
            ${exerciseData.Name} description:
          </p>
          <p class="description">
            ${exerciseData.Description}
          </p>
          <button class="button" id="add-exercise" data-add="${exerciseData.Name}">Add '${exerciseData.Name}' to workout</button>
        </div>`;
        // append the constructor string to the container
        exerciseContainer.append(strHTML);
      } catch (err) {
        console.error("Error:", err);
      }
    });
  });

  $("body").on("click", "#add-exercise", async function () {
    const exercise = $(this).data("add");
    try {
      // send fetch request with specific exercise from the clicked exercise
      const response = await fetch(`/api/exercise/${exercise}`);
      // recieve the exercises as json data
      const exercises = await response.json();
      // determine where the data will be displayed
      const selectedData = $("#selected-exercises");
      const group = exercises.MuscleGroup;

      strHTML = `<div class="column is-one-quarter"><div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">${group.toUpperCase()}</p>
          </header>
          <div class="card-content has-text-weight-bold has-text-centered" data-selected-exercise='${exercises.Name}'>
          ${exercises.Name}
          </div>
          <footer class="card-footer">
            <button class="card-footer-item has-text-danger has-text-weight-bold">Delete</button>
          </footer>
        </div></div>`;
      selectedData.append(strHTML);
      if ($("#select-date").val()) {
        $("#btn-save").removeClass("is-hidden");
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  });

  $(document).on("click", ".card-footer-item", function () {
    $(this).closest(".column").remove();
  });

  $("#btn-save").on("click", async function () {
    let arrExercises = [];
    const strDate = $("#select-date").val();
    // find all selected exercises, loop through them and push them to the empty array
    $("[data-selected-exercise]").each(function () {
      arrExercises.push($(this).data("selected-exercise"));
    });
    try {
      // attempt to post to api/workout with the date and array of exercises
      const response = await fetch("/api/workout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: strDate,
          exercises: arrExercises,
        }),
      });
      // retireve results as json data
      const result = await response.json();
      console.log("Success:", result);
      window.location.replace("/api/workout");
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
