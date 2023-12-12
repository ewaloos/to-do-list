{
  let tasks = [
    {
      content: "Pójść na spacer",
      done: false,
    },
    {
      content: "Odwiedzić babcię",
      done: true,
    },
  ];

  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleHideDoneTasks = () => {
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
        task.done && hideDoneTasks ? "tasks__list--hidden" : ""
      }">
      <span class = "tasks__toDoList">
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
    const markAllDone = document.querySelector(".js-markAllDone");
    if (markAllDone) {
      markAllDone.addEventListener("click", allDone);
    }

    const toggleHideDoneTasksButton = document.querySelector(
      ".js-toggleHideDoneTasks"
    );
    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-newButtons");

    if (tasks.length > 0) {
      buttonsElement.innerHTML = `
      <button class = "tasks__hideOrShowAllDone js-toggleHideDoneTasks">
      ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone 
      </button>
      <button class = "tasks__markAllDone js-markAllDone" ${
        tasks.every(({ done }) => done) ? "disabled" : ""
      }>
      Ukończ wszystkie 
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
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
