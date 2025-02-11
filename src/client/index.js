import { handleSubmit } from "./js/app";
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";

export { handleSubmit };

// Add event listener to the form after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("trip-form");
  form.addEventListener("submit", handleSubmit);
});
