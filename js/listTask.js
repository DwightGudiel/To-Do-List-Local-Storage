import { showMessage } from "./showMessage.js";

export function listTask() {
  /*========================VARIABLES==========================*/
  const containerTasks = document.querySelector("#list-tasks");
  const form = document.querySelector("#form");
  const containerAlert = document.querySelector("#alert-error");

  //Array Tasks
  let Tasks = [];

  /*========================EVENT==========================*/

  form.addEventListener("submit", addTask);

  /*========================FUNCTION==========================*/
  // Obtener tareas almacenada en el local storage
  getTasksLocalStorage();
  function getTasksLocalStorage() {
    // Obtener Tareas almacenadas del local Storage
    Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    // Crear Tareas
    createTask();
  }

  // TAREA
  function addTask(e) {
    e.preventDefault();
    // variables
    const inputTask = document.querySelector("#task").value.trim();

    // Validar que el input no este vacío
    if (inputTask === "") {
      alertError("El campo está vacío");
      return;
    }

    // Objeto
    const taskObj = {
      id: Date.now(), // simulando un id
      text: inputTask, // contenido de la tarea
    };

    // Agregando los objetos "taskjObj" al array "Tasks"
    Tasks = [...Tasks, taskObj];

    // Creando una tarea
    createTask();

    // Reiniciando formulario
    form.reset();

    // Mostrar una alerta de exito
    showMessage(`Task successfully added :) `, "success");
  }

  function createTask() {
    // Prevenir que se dupliquen tareas ya agregadas
    cleanPreviousTask();

    // Verificar si el areglo no está vacío
    if (Tasks.length > 0) {
      Tasks.forEach((task) => {
        // Botón eliminar tarea
        const btnDelete = document.createElement("a");
        btnDelete.classList.add("btn", "btn-danger", "me-2");
        btnDelete.textContent = "Delete";

        //  Botón Finalizar tarea
        const btnFinish = document.createElement("a");
        btnFinish.classList.add("btn", "btn-success");
        btnFinish.textContent = "Completed";

        // Evento para eliminar una tarea
        btnDelete.onclick = () => {
          deleteTask(task.id);
        };

        // Evento para completar una tarea
        btnFinish.onclick = () => {
          completedTask(task.id);
        };

        // Tarea
        const tr = document.createElement("tr");
        const tdTask = document.createElement("td");
        tdTask.classList.add('fs-2');
        const tdAction = document.createElement("td");
        tdTask.textContent = task.text;

        // add ID
        tdTask.dataset.taskId = task.id;

        // agregar HTML creado al contenedor correspondiente
        tdAction.appendChild(btnDelete);
        tdAction.appendChild(btnFinish);
        tr.appendChild(tdTask);
        tr.appendChild(tdAction);
        containerTasks.appendChild(tr);
      });
    }
    // Guardar datos en el local storage
    setTasksLocalStorage();
  }

  function cleanPreviousTask() {
    while (containerTasks.firstChild) {
      /* ===== Eliminado el primer Elemento hijo del elemento padre containerResult =====*/
      containerTasks.removeChild(containerTasks.firstChild);
    }
  }

  function setTasksLocalStorage() {
    // Guardar array "Tasks" en el local storage
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
  }

   // BOTONES
  function deleteTask(id) {
    /* Filtrar el array de tareas y devolver un nuevo array con la tarea que tiene el id que no es igual al id que se pasa. */
    Tasks = Tasks.filter((task) => task.id != id);
    // crear tarea con el array filtrado
    createTask();
    // mostrar alerta
    showMessage("Task successfully eliminated", "red");
  }

  function completedTask(id) {
    /* Filtrar el array de tareas y devolver un nuevo array con la tarea que tiene el id que no es igual al id que se pasa. */
    Tasks = Tasks.filter((task) => task.id != id);
    // crear tarea con el array filtrado
    createTask();
    // mostrar alertas
    showMessage("Task completed 💪💪💪💪", "success");
  }

  // ALERTA ERROR
  function alertError(text) {
    //Prevenir que se cree más de una alerta
    cleanAlert();

    //crear alerta
    const error = document.createElement("p");
    error.textContent = text;
    error.classList.add("alert", "alert-danger", "text-center", "mt-3");

    // agregar al contenedor
    containerAlert.appendChild(error);

    // Eliminar alerta despues de 2 segundos
    setTimeout(() => {
      error.remove();
    }, 2000);
  }

  function cleanAlert() {
    while (containerAlert.firstChild) {
      /* ===== Eliminado el primer Elemento hijo del elemento padre containerResult =====*/
      containerAlert.removeChild(containerAlert.firstChild);
    }
  }
}
