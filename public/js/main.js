$(document).ready(async function () {
  // determine if user is logged in or not
  const responseLoggedIn = await fetch(`/api/user/loggedIn`);
  // convert the response to json data
  const loggedIn = await responseLoggedIn.json();

  // array of images to randomly populate homepage
  images = ["/img/workout-wizard-1.jpg", "/img/workout-wizard-2.jpg"];
  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * 2);
    return images[randomIndex];
  }
  // set the source to the random image from the function above
  $("#random-image").attr("src", getRandomImage());

  if (loggedIn.logged_in) {
    if (window.location.pathname === "/api/workout") {
      $("#btn-workout").addClass("is-hidden");
    } else {
      $("#btn-workout").removeClass("is-hidden");
    }
    $("#btn-logout").removeClass("is-hidden");
  } else {
    $("#btn-logout").addClass("is-hidden");
    $("#btn-workout").addClass("is-hidden");
  }

  //   event listener for logout
  $("#btn-logout").on("click", async function () {
    const response = await fetch("/api/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log out.");
    }
  });

  $("#btn-home").on("click", async function () {
    document.location.replace("/");
  });

  $("#btn-workout").on("click", async function () {
    document.location.replace("/api/workout");
  });
});
