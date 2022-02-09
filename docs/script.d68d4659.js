// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ZES1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$rightclick = exports.$dblclick = exports.$click = exports.$all = exports.$ = void 0;

function $(query) {
  return document.querySelector(query);
}

exports.$ = $;

function $all(query) {
  return document.querySelectorAll(query);
}

exports.$all = $all; //TAKA KONWENCJA Z TYM $

function $click(HTMLel, callback) {
  HTMLel.addEventListener("click", callback);
}

exports.$click = $click;

function $dblclick(HTMLel, callback) {
  HTMLel.addEventListener("dblclick", callback);
}

exports.$dblclick = $dblclick;

function $rightclick(HTMLel, callback) {
  HTMLel.addEventListener("contextmenu", callback);
}

exports.$rightclick = $rightclick; // $click($("#cośtam"), ()=>{})
// $click("#cośtam", ()=>{})
},{}],"iPdJ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.padLeft = exports.showTodaysDate = void 0;

function showTodaysDate() {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  return "".concat(year, "-").concat(padLeft(month, 2), "-").concat(padLeft(day, 2));
}

exports.showTodaysDate = showTodaysDate;

function padLeft(value, width) {
  var valueAsString = value.toString();
  var numberOfZerosToPad = width - valueAsString.length;

  for (var i = 0; i < numberOfZerosToPad; i++) {
    if (valueAsString.length < width) {
      valueAsString = "0" + valueAsString;
    }
  }

  return valueAsString;
}

exports.padLeft = padLeft;
},{}],"Ezfi":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalizeFirstLetter = void 0;

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

exports.capitalizeFirstLetter = capitalizeFirstLetter;
},{}],"mTOz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createListLabel = void 0;

var CapitalizeFirstLetter_1 = require("./CapitalizeFirstLetter");

function createListLabel(inputDate) {
  var dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  var defaultListLabel = new Date(inputDate).toLocaleDateString("pl-PL", dateOptions);
  var formattedListLabel = (0, CapitalizeFirstLetter_1.capitalizeFirstLetter)(defaultListLabel);
  return formattedListLabel;
}

exports.createListLabel = createListLabel;
},{"./CapitalizeFirstLetter":"Ezfi"}],"g4tf":[function(require,module,exports) {
"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Todo = void 0;

var EventListenersShortcuts_1 = require("./EventListenersShortcuts");

var ShowTodaysDate_1 = require("./creatingListLabels/ShowTodaysDate");

var CreateListLabel_1 = require("./creatingListLabels/CreateListLabel");

var $dateInput = (0, EventListenersShortcuts_1.$)("#date-input"); // TODO: typy generyczne

var $addListButton = (0, EventListenersShortcuts_1.$)("#add-list-button");
var $listMenu = (0, EventListenersShortcuts_1.$)("#current-lists-container");
var $infoBox = (0, EventListenersShortcuts_1.$)("#info");
var $infoText = (0, EventListenersShortcuts_1.$)("#info-text");
var $createTodoContainer = (0, EventListenersShortcuts_1.$)("#create-todo-container");
var $todoListContainer = (0, EventListenersShortcuts_1.$)("#todos-ul");
$dateInput.defaultValue = (0, ShowTodaysDate_1.showTodaysDate)();
var allLists;

if (localStorage.getItem("todoLists") !== null) {
  var todoLists = localStorage.getItem("todoLists");
  allLists = JSON.parse(todoLists);
} else {
  allLists = [];
}

displayCurrentListsTitles(allLists);

var TodoList = /*#__PURE__*/_createClass(function TodoList(label) {
  var todos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  _classCallCheck(this, TodoList);

  this.label = label;
  this.todos = todos;
});

var Todo = /*#__PURE__*/_createClass(function Todo(text, completed) {
  _classCallCheck(this, Todo);

  this.text = text;
  this.completed = completed;
});

exports.Todo = Todo; //zrobić "kopiuj tekst"
//przenoszenie na inny dzień?

(0, EventListenersShortcuts_1.$click)($infoBox, function () {
  $infoBox.classList.toggle("hidden"); // TODO: extension method
});
(0, EventListenersShortcuts_1.$click)($addListButton, function () {
  createNewList();
  $listMenu.innerHTML = "";
  displayCurrentListsTitles(allLists);
  updateLocalStorage();
});

function createNewList() {
  var newListLabel = (0, CreateListLabel_1.createListLabel)($dateInput.value);
  var newList = new TodoList(newListLabel);
  var found = allLists.find(function (element) {
    return element.label === newListLabel;
  });

  if (found !== undefined) {
    showAlert();
  } else {
    allLists.push(newList);
  }

  console.log("pusz do currentLists", allLists);
}

function displayCurrentListsTitles(lists) {
  lists.forEach(function (list) {
    var listLabelDiv = document.createElement("div");
    listLabelDiv.classList.add("list-label-box");
    var listLabel = document.createElement("button");
    listLabelDiv.appendChild(listLabel);
    listLabel.textContent = list.label;
    listLabel.classList.add("list-label");
    $listMenu.appendChild(listLabelDiv);
    showRemoveListButton(listLabelDiv, listLabelDiv, list);
    (0, EventListenersShortcuts_1.$click)(listLabel, function () {
      $todoListContainer.innerHTML = "";
      $createTodoContainer.innerHTML = "";
      showTodoInput($createTodoContainer);
      showAddButton(list);
      list.todos.forEach(function (todo) {
        showTodo(todo, $todoListContainer, list);
      });
    });
  });
}

function showAddButton(list) {
  var addButton = document.createElement("button");
  addButton.classList.add("add-todo-button");
  addButton.textContent = "+";
  $createTodoContainer.appendChild(addButton);
  var todoInput = (0, EventListenersShortcuts_1.$)(".todo-input");
  (0, EventListenersShortcuts_1.$click)(addButton, function () {
    addTodoToList(todoInput, list);
    todoInput.value = "";
    $createTodoContainer.innerHTML = "";
    $todoListContainer.innerHTML = "";
    showTodoInput($createTodoContainer);
    showAddButton(list);
    list.todos.forEach(function (todo) {
      showTodo(todo, $todoListContainer, list);
    });
  });
}

function showTodoInput(destination) {
  var todoInput = document.createElement("input");
  todoInput.type = "text";
  todoInput.placeholder = "My next todo is...";
  todoInput.classList.add("todo-input");
  destination.appendChild(todoInput);
}

function showRemoveListButton(destination, listToRemove, list) {
  var removeButton = document.createElement("button");
  removeButton.textContent = "x";
  removeButton.classList.add("remove-list-button");
  destination.appendChild(removeButton);
  (0, EventListenersShortcuts_1.$click)(removeButton, function () {
    $listMenu.removeChild(listToRemove);
    allLists = allLists.filter(function (todoList) {
      return todoList.label !== list.label;
    });
    $todoListContainer.innerHTML = "";
    $createTodoContainer.innerHTML = "";
    updateLocalStorage();
  });

  if (!allLists.length) {
    $listMenu.innerHTML = "";
  }
}

function addTodoToList(input, list) {
  var todoText = input.value;

  if (todoText !== "") {
    list.todos.push(new Todo(todoText, false));
  }

  updateLocalStorage();
}

function showTodo(todo, destination, list) {
  var newTodo = document.createElement("li");
  newTodo.classList.add("todo");
  newTodo.textContent = todo.text;

  if (todo.completed === true) {
    newTodo.classList.add("crossed");
  }

  destination.appendChild(newTodo);
  (0, EventListenersShortcuts_1.$dblclick)(newTodo, function () {
    return removeTodo(newTodo, list);
  });
  (0, EventListenersShortcuts_1.$click)(newTodo, function () {
    crossTodo(newTodo, todo);
    updateLocalStorage();
  });
  newTodo.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    uncrossTodo(newTodo, todo);
    updateLocalStorage();
  });
}

function removeTodo(todo, list) {
  var editedTodos = list.todos.filter(function (todoEl) {
    return todoEl.text !== todo.textContent;
  });
  list.todos = editedTodos;
  $todoListContainer.removeChild(todo);
}

function crossTodo(todoEl, todo) {
  todoEl.classList.add("crossed");
  todo.completed = true;
}

function uncrossTodo(todoEl, todo) {
  todoEl.classList.remove("crossed");
  todo.completed = false;
}

function updateLocalStorage() {
  localStorage.setItem("todoLists", JSON.stringify(allLists));
}

function showAlert() {
  $addListButton.classList.toggle("red-border");
  setTimeout(function () {
    $addListButton.classList.toggle("red-border");
  }, 200);
}
},{"./EventListenersShortcuts":"ZES1","./creatingListLabels/ShowTodaysDate":"iPdJ","./creatingListLabels/CreateListLabel":"mTOz"}]},{},["g4tf"], null)
//# sourceMappingURL=script.d68d4659.js.map