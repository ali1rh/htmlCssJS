const ul = document.querySelectorAll("#navBottom")[0];
const lis = ul.querySelectorAll("li");

const ulParent = ul.parentNode.getAttribute('class');




lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    // e.preventDefault();
    const target = e.currentTarget;
    console.log('e.currentTarget: ', e.currentTarget);



    if (
      target.classList.contains("follow")
    ) {
      return;
    }

    ul.parentNode.setAttribute(
      "class",
      `${ulParent} ${target.getAttribute("data-where")}-style`
    );

    // remove All active
    lis.forEach((item) => item.classList.remove("active"));


    // ul.parentNode.classList.add(`${target.classList}-style`);
    /// add active to target
    target.classList.add("active");
  });
});