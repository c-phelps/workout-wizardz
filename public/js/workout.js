$(document).ready(function () {
  $("body").on("click", ".button[data-exercise-id]", async function () {
    const workoutId = $(this).data("workout-id");
    const exerciseId = $(this).data("exercise-id");
    
    $.get(`/api/exercises/${exerciseId}`, function(data){
      
      $("#notes").val(data.exercises.notes); 
      $('#exercise-modal').addClass('is-active');

    });
    

    window.alert(`${workoutId}`);
    window.alert(`${exerciseId}`);
  });
});
