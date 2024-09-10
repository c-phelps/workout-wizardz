$(document).ready(function () {
  $("body").on("click", ".muscle-group", async function () {
    const muscleGroup = $(this).data("muscle-group");
    try {
      const response = await fetch(`/api/exercise/group/${muscleGroup}`);
      const exercises = await response.json();

      const exercisesList = $("#exercises-list");
      exercisesList.empty();
      const exerciseData = $("#exercise-data");
      exerciseData.empty();

      exercises.forEach((exe) => {
        exercisesList.append(`<div class="column is-one-quarter">
          <button class="exercise button is-info is-fullwidth" data-exercise="${exe.Name}">
            ${exe.Name}
          </button>
        </div>`);
      });
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  });
  $(document).ready(function () {
    $("body").on("click", ".exercise", async function () {
      const exercise = $(this).data("exercise");
      try {
        const response = await fetch(`/api/exercise/${exercise}`);

        const exerciseData = await response.json();

        const exerciseContainer = $("#exercise-data");
        exerciseContainer.empty();

        const strHTML = `<div class="column is-three-fifths is-offset-one-fifth">
          <p class="has-text-weight-bold">
            ${exerciseData.Name} description:
          </p>
          <p class="description">
            ${exerciseData.Description}
          </p>
          <button class="button" id="add-exercise" data-add="${exerciseData.Name}">Add '${exerciseData.Name}' to workout</button>
        </div>`;

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

      strHTML = `<div class="column is-one-quarter"><div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered has-text-link">${exercises.MuscleGroup}</p>
          </header>
          <div class="card-content has-text-weight-bold has-text-white has-text-centered" data-selected-exercise='${exercises.Name}'>
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

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
