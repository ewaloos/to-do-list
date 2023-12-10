{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent },];

    render();
  };

  const removeTask = (index) => {
    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1),];
    render();
  };

  const toggleTaskDone = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      {
        ...tasks[index],
        done: !tasks[index].done,
      },
      ...tasks.slice(index + 1),
    ];
    render();
  };

  const hideShowDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const allDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li class="tasks__list ${
        tasks.done && hideDoneTasks ? "tasks__list--hidden" : ""
      }">
      <span class = "tasks__list">
      <button class="js-done tasks__doneButton">${
        task.done ? "✔" : ""
      } </button>
      <span class="tasks__item ${task.done ? "tasks__item--done" : ""}">
      ${task.content}
      </span>
      <button class="js-remove tasks__removeButton">🗑</button>
      </span>
      </li>
    `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const bindButtonEvents = () => {
    const toggleTaskDone = document.querySelector(".js-toggleTaskDone");
    if (toggleTaskDone) {
      toggleTaskDone.addEventListener("click", hideShowDoneTasks);
    }

    const markAllDone = document.querySelector(".js-markAllDone");
    if (markAllDone) {
      markAllDone.addEventListener("click", allDone);
    }
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector("js.newButtons");

    if (tasks.length > 0) {
      buttonsElement.innerHTML = `
      <button class = "tasks__hideOrShowAllDone js-toggleTaskDone">
      ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone zadania
      </button>
      <button class = "tasks__markAllDone js-markAllDone" ${
        tasks.every(({ done }) => done) ? "disabled" : ""
      }>
      Ukończ wszystkie zadania
      </button>
      `;
    } else {
      buttonsElement.innerHTML = ``;
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindButtonEvents();
    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    };

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
};
