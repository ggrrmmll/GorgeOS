var gos_window_update = setInterval(gosUpdateTaskBarIconsState, 100);
var gos_zindex_update = setInterval(updateZIndex, 100);
var gos_litseningForMenu = setInterval(gosLitsenForMenu, 100);
var gos_taskBarMenuManager = setInterval(gosTaskBarMenuManager, 100);
var gos_litsenForMenu, gos_isOnMenu, mouseX, mouseY, menuMinX, menuMaxX, menuMinY, menuMaxY;
var gos_debuggy = setInterval(function () {document.getElementById("gos_debug").innerHTML = mouseX + ", " + mouseY + ", " + menuMinX + ", " + menuMaxX  + ", " + menuMinY + ", " + menuMaxY + ", " + gos_isOnMenu }, 100);

function updateMouseInfo(currentMouseX, currentMouseY) {
  mouseX = currentMouseX;
  mouseY = currentMouseY;
}

function updateZIndex() {
  var maxZIndex = Windows.maxZIndex
  document.getElementById("gos_dock").style.zIndex = maxZIndex + 2;
  var gos_dock_menus = document.getElementsByClassName("gos_dock_menuDiv")
  for (var i = 0; i < gos_dock_menus.length; i++) {
    gos_dock_menus[i].style.zIndex = maxZIndex + 1;
  }
}

function gosTaskBarMenuManager() {
  if (document.getElementById("gos_dock_menu_0").style.display == "block") {
    var startMenuButtons = document.getElementsByClassName("gos_dock_menuIcon")
    for (var i = 0; i < startMenuButtons.length; i++) {
      startMenuButtons[i].classList.add("gos_dock_menuIconSelected");
    }
  } else {
    var startMenuButtons = document.getElementsByClassName("gos_dock_menuIcon")
    for (var i = 0; i < startMenuButtons.length; i++) {
      startMenuButtons[i].classList.remove("gos_dock_menuIconSelected");
    }
  }
}

function gosUpdateTaskBarIconsState() {
  var WindowList = Windows.windows;
  var TaskBarIconList = document.getElementsByClassName("gos_dock_icon")
  for (var i = 0; i < TaskBarIconList.length; i++) {
    // console.log(TaskBarIconList[i].win)
    if (TaskBarIconList[i].win == Windows.focusedWindow) {
      TaskBarIconList[i].classList.add('gos_dock_icon_selected');
    } else {
      TaskBarIconList[i].classList.remove('gos_dock_icon_selected');
    }
  }
}

function gosLitsenForMenu() {
  if (gos_litsenForMenu == true) {
    if (gos_isOnMenu == false) {
      //document.getElementById("gos_menu").removeEventListener("mouseenter", function() {gos_isOnMenu=true;});
      //document.getElementById("gos_menu").removeEventListener("mouseout", function() {gos_isOnMenu=false;});
      document.getElementById("gos_menuCover").parentElement.removeChild(document.getElementById("gos_menuCover"));
      document.getElementById("gos_menu").parentElement.removeChild(document.getElementById("gos_menu"));
      gos_litsenForMenu = false;
      gos_isOnMenu = undefined;
    }
    if (mouseX >= menuMinX && mouseX <= menuMaxX && mouseY >= menuMinY && mouseY <= menuMaxY) {gos_isOnMenu=true;} else {gos_isOnMenu=false;}
  }
}

function gosToggleTaskbarMenu(menuId) {
  if (menuId == 0) {
    var menu = document.getElementById("gos_dock_menu_0")
    if (menu.style.display == "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }
}

function gosCreateMenu(positionX, positionY, elements) {
  var menuCoverDiv = document.createElement("div");
  menuCoverDiv.style.width = "100%";
  menuCoverDiv.style.height = "100%";
  menuCoverDiv.style.background = "transparent";
  menuCoverDiv.style.position = "absolute";
  menuCoverDiv.style.top, menuCoverDiv.style.left = "0";
  menuCoverDiv.style.zIndex = Windows.maxZIndex + 3
  menuCoverDiv.setAttribute("id", "gos_menuCover")
  var menuDiv = document.createElement("div");
  menuDiv.setAttribute("class", "gos_menu");
  menuDiv.setAttribute("id", "gos_menu");
  menuDiv.style.left = positionX - 5;
  menuDiv.style.top = positionY - 5;
  menuDiv.style.zIndex = Windows.maxZIndex + 4;
  for (var i = 0; i < elements.length; i++) {
    var menuItem = document.createElement("div");
    var menuItemText = document.createTextNode(elements[i]);
    menuItem.appendChild(menuItemText);
    menuDiv.appendChild(menuItem);
  }
  document.body.appendChild(menuCoverDiv);
  document.body.appendChild(menuDiv);
  //document.getElementById("gos_menu").addEventListener("mouseenter", function() {gos_isOnMenu=true;console.log("true");});
  //document.getElementById("gos_menu").addEventListener("mouseout", function() {gos_isOnMenu=false;console.log("false");});
  menuMinX = positionX - 5;
  menuMaxX = positionX - 5 + document.getElementById("gos_menu").offsetWidth;
  menuMinY = positionY - 5;
  menuMaxY = positionY - 5 + document.getElementById("gos_menu").offsetHeight;
  gos_litsenForMenu = true;

}

function gosToggleMinState(W1nd0w) {
  console.log(W1nd0w);
  if (W1nd0w.element.classList.contains("gos_win_hidden")) {
    W1nd0w.element.classList.toggle("gos_win_hidden");
    Windows.focus(W1nd0w.getId())
    W1nd0w.setZIndex(Windows.maxZIndex + 1);
  } else {
  if (Windows.focusedWindow == W1nd0w) {
    console.log("Main Window Selected");
    W1nd0w.element.classList.toggle("gos_win_hidden");

  } else {
    var windowSelected = Windows.focusedWindow;
    var windowToSelect = W1nd0w;
    Windows.focus(W1nd0w.getId())
    W1nd0w.setZIndex(Windows.maxZIndex + 1);
  }
  }

}

// Overide WindowUtilities getPageSize to remove dock height (for maximized windows)
WindowUtilities._oldGetPageSize = WindowUtilities.getPageSize;
WindowUtilities.getPageSize = function() {
  var size = WindowUtilities._oldGetPageSize();
  var dockHeight = $('gos_dock').getHeight();

  size.pageHeight -= dockHeight;
  size.windowHeight -= dockHeight;
  return size;
};


// Overide Windows minimize to move window inside dock
Windows.oldClose = Windows.close;
Object.extend(Windows, {
  close: function(winId, Event) {
    Windows.oldClose(winId, Event);
    var WindowToDelete = document.getElementById("taskbarWindow_" + winId);
    console.log(WindowToDelete)
    WindowToDelete.parentElement.removeChild(WindowToDelete);
  },

  maximize: function(id, event) {
    var win = this.getWindow(id)
    //var oldWinLocation = win.getLocation();
    var dockHeight = document.getElementById("gos_dock").style.height;
    if (win && win.visible)
      win.maximize();
      win.element.classList.toggle("gos_win_max")
    Event.stop(event);
  },
  minimize: function(id, event) {
    gosToggleMinState(Windows.getWindow(id))
    gosUpdateTaskBarIconsState();
  },

  // Restore function
  restore: function(event) {
    var element = Event.element(event);
    // Show window
    console.log(win)
    element.win.element.style.display = "block";
    //Windows.focus(element.win.getId());
    element.win.toFront();
    // Fade and destroy icon
    element.remove()
  },
  // Custom hide function
  goshide: function(event) {
    var e = Event.element(event);
    console.log(e)
    if (e.style.display = "none") {} else {
      e.style.display = "none"
    }
  }
})







// blur focused window if click on document
Event.observe(document, "click", function(event) {
  var e = Event.element(event);
  var win = e.up(".dialog");
  var dock = e == $('gos_dock') || e.up("#gos_dock");
  if (!win && !dock && Windows.focusedWindow) {
    Windows.blur(Windows.focusedWindow.getId());
  }
})
