var gos = {
  version: 0.1, codeName: "beta", debug: true, app: {
    appList: [{
        name: 'Gorge OS Test Application',
        description: 'Simple Gorge OS testing application',
        command: 'test',
        openWindow: true,
        requireDebug: true,
        onRun: function () {
          console.log("Program initalized")
        },
        win: {
          title: 'Test',
          inner: 'Hello there, this is a test',
          onWindowStart: function () { console.log("Window Enabled.") },
          width: 200,
          height: 150,
          backgroundColor: "#000"
        }
    }, {
        name: 'Gorge OS Test Application',
        description: 'Gorge OS Debugger Application',
        command: 'debug',
        openWindow: true,
        requireDebug: true,
        onRun: function () {
          console.log("Program initalized")
        },
        win: {
          title: 'Debugger',
          inner: '<div class="gos_debug">Hello there, this is a test</div>',
          onWindowStart: function () { console.log(document.getElementsByClassName("gos_debug")) },
          width: 200,
          height: 150,
          backgroundColor: "#000"
        }
      }, {
        name: 'Gorge OS Test Application',
        description: 'Gorge OS Debugger Application',
        command: 'debug',
        openWindow: true,
        requireDebug: false,
        onRun: function () {
          console.log("Program initalized")
        },
        win: {
          title: 'Debugger',
          inner: '<div>Hello there, this is a test</div>',
          onWindowStart: function () { console.log(document.getElementsByClassName("gos_debug")) },
          width: 200,
          height: 150,
          backgroundColor: "#000"
        }
      }, {
        name: 'Gorge OS Command Line Test Application',
        description: 'This tests the command line',
        command: 'cmdtest',
        openWindow: false,
        requireDebug: true,
        onRun: function () {
          console.log("Program initalized")
        },
        onCliOut: function (cliField) {
          // Run on CLI

          // gos.functions.cliPrntTxt("Text", cliField)
          // Write "Text" to the CLI field in a new line
        }
      }],
      functions:{
        /* getFormatedAppList: function (qualities) {
          var appList = gos.app.appList;
          var appListFinal = [];

          // Need to give array like ["name", "command", "requiresDebug"]
          for (var i = 0; i < qualities.length; i++) {
            if (qualities[i] == "name") {
              appListFinal.push(appList)
            }
          }
        }, */
        launchApp: function (app, cliOut) {
          
          // Check if all required factors are specifyed in app.
          if (app.name !== undefined && app.requireDebug !== undefined && app.openWindow !== undefined && app.onRun !== undefined) {console.log("Valid application, now launching.")

          // Launch the app Ep.2: The code
          // Check if can launch the app
          if (app.requireDebug) {
            if (gos.debug) {
              // Launch app
              console.log("Launching app with debug.")
              // Launch app
              app.onRun(); // Launch the onRun function
              if (app.openWindow) {
                gos.functions.createWindow(app.win.title, app.win.width, app.win.height, app.win.inner, app.win.backgroundColor);
                app.win.onWindowStart();
              }
              if (app.onCliOut !== undefined) {
                app.onCliOut(cliOut);
              }
            } else {
              console.log("This applicaion requires debug mode to be executed." + "\n" + "To enable debug execute the following command: 'gos.debug = true'," + "\n" + "then restart the system.")
            }
          } else {
            // Launch app
            app.onRun(); // Launch the onRun function
            if (app.openWindow) {
              gos.functions.createWindow(app.win.title, app.win.width, app.win.height, app.win.inner, app.win.backgroundColor);
              app.win.onWindowStart();
            }
            if (app.onCliOut !== undefined) {
              app.onCliOut(cliOut);
            }

            // Log app in recent apps
            if (gos.var.recentApps[3] !== undefined) {gos.var.recentApps[3] = gos.var.recentApps[2];}
            if (gos.var.recentApps[2] !== undefined) { gos.var.recentApps[2] = gos.var.recentApps[1]; }
            if (gos.var.recentApps[1] !== undefined) { gos.var.recentApps[1] = gos.var.recentApps[0]; }
            if (gos.var.recentApps[0] !== app) {gos.var.recentApps[0] = app;}
          }
          } else {
            console.log("Coudn't launch the app.")
          }
        
      }
    }
}, functions:{
  updateMouseInfo: function(currentMouseX, currentMouseY) {
    gos.var.mouse.x = currentMouseX;
    gos.var.mouse.y = currentMouseY;
  },
  updateZIndex: function() {
    var maxZIndex = Windows.maxZIndex
    document.getElementById("gos_dock").style.zIndex = maxZIndex + 2;
    var gos_dock_menus = document.getElementsByClassName("gos_dock_menuDiv")
    for (var i = 0; i < gos_dock_menus.length; i++) {
      gos_dock_menus[i].style.zIndex = maxZIndex + 1;
    }
  },
  taskBarMenuManager: function() {
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
  },
  updateTaskBarIconsState: function() {
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
  },
  litsenForMenu: function() {
    if (gos.var.litsenForMenu == true) {
      if (gos.var.isOnMenu == false) {
        
      }
      //if (gos.var.mouse.x >= gos.var.menu.minX && gos.var.mouse.x <= gos.var.menu.maxX && gos.var.mouse.y >= gos.var.menu.minY && gos.var.mouse.y <= gos.var.menu.maxY) {gos.var.isOnMenu=true;} else {gos.var.isOnMenu=false;}
    }



  },
  toggleTaskbarMenu: function(menuId) {
    if (menuId == 0) {
      gos.functions.updateStartMenu();
      var menu = document.getElementById("gos_dock_menu_0")
      if (menu.style.display == "block") {
        menu.style.display = "none";
      } else {
        menu.style.display = "block";
        gos.var.startMenuPage = 0;
      }
    } else if (menuId == 1) {
      var menu = document.getElementById("gos_dock_menu_1")
      if (menu.style.display == "block") {
        menu.style.display = "none";
      } else {
        menu.style.display = "block";
      }
    }
  },
  createMenu: function(positionX, positionY, elements, elementsActions) {
    var menuCoverDiv = document.createElement("div");
    menuCoverDiv.style.width = "100%";
    menuCoverDiv.style.height = "100%";
    menuCoverDiv.style.background = "transparent";
    menuCoverDiv.style.position = "absolute";
    menuCoverDiv.style.top, menuCoverDiv.style.left = "0";
    menuCoverDiv.style.zIndex = Windows.maxZIndex + 3
    menuCoverDiv.setAttribute("id", "gos_menuCover")
    menuCoverDiv.setAttribute("onmouseover", "gos.functions.updateIsOnMenu(false)")
    menuCoverDiv.setAttribute("onmouseout", "gos.functions.updateIsOnMenu(true)")
    var menuDiv = document.createElement("div");
    menuDiv.setAttribute("class", "gos_menu");
    menuDiv.setAttribute("id", "gos_menu");
    menuDiv.style.left = positionX - 5;
    menuDiv.style.top = positionY - 5;
    menuDiv.style.zIndex = Windows.maxZIndex + 4;
    for (var i = 0; i < elements.length; i++) {
      var menuItem = document.createElement("div");
      var menuItemText = document.createTextNode(elements[i]);

      if (elementsActions[i] != undefined) {
        menuItem.setAttribute("onclick", "gos.var.isOnMenu = false; gos.functions.updateMenuState(); " + elementsActions[i]);
      }

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
    gos.var.litsenForMenu = true;
  },
  toggleMinState: function(W1nd0w) {
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
  },
  logDebugOut: function (message) {
    if (gos.debug == true) {console.log(message)}
    if (message == false) {
      var outputs = document.getElementsByClassName("gos_debug_output");
      for (var i = 0; i < outputs.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "gos_windows_terminal_blankSpace")
        outputs[i].appendChild(div);
        console.log(outputs[i])
      }
    } else {
      var outputs = document.getElementsByClassName("gos_debug_output");
      for (var i = 0; i < outputs.length; i++) {
        var div = document.createElement("div");
        var divInner = document.createTextNode(message);
        div.appendChild(divInner);
        outputs[i].appendChild(div);
        console.log(outputs[i])
      }
    }
  },
  loadLoginScreen: function () {
    gos.var.isLoggedIn = false
    document.getElementById("gos_login").style.display = "block";
    var loginBackgroundInterval = setInterval(function(){
      document.getElementById("gos_login").style.backgroundImage = "url(" + document.getElementById("gos_desktop_wallpaper").toDataURL() + ")";
    }, 100)
    
    
  },
  loadBackground: function () {
    /* var backgroundService = setInterval(function(){
      var backgroundCanvas = document.getElementById("gos_desktop_wallpaper");
      var ctx = backgroundCanvas.getContext('2d');

      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fillRect(10, 10, 50, 50);

      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(30, 30, 50, 50);
    }, 100) */
    
  },
  updateCanvas: function () {
    if (gos.var.animateCanvas) {
      requestAnimationFrame(gos.functions.updateCanvas);
    }


    var canvas = document.getElementById("gos_desktop_wallpaper");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var c = canvas.getContext("2d");
    
    // Draw image on canvas
    /* var imageElement = document.createElement("img");
    imageElement.src = "./resources/background.jpg";
    imageElement.crossOrigin = "anonymous";
    imageElement.setAttribute("id", "gos_desktop_wallpaper_img");
    imageElement.style.display = "none";
    document.body.appendChild(imageElement); */
    

    var imageElement = new Image();
    imageElement.src = "./resources/background2.jpg"
    
    //imageElement.appendChild(document.body);

    c.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    /* var elements = document.getElementsByClassName("gos_desktop_wallpaper_mirror");
    var canvas = document.getElementById("gos_desktop_wallpaper");
    for (var i = 0; i < elements.length; i++) {
      elements[i].src = canvas.toDataURL();

    } */

    // Mirrors
    var canvasMirrors = document.getElementsByClassName("gos_desktop_wallpaper_mirror");
    for (var i = 0; i < canvasMirrors.length; i++) {
      canvasMirrors[i].width = canvas.width;
      canvasMirrors[i].height = canvas.height;

      var c = canvasMirrors[i].getContext("2d");

      c.filter = "blur(10px)";
      c.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
    }
     
  },
  createWindow: function (title, width, height, content, background) {
    var windowToCreate =  {
      title:title,
      content:content,
      height:height,
      width:width,
      background:background
  }
  windowVar = new Window({className: gos.var.windowTheme, blurClassName: gos.var.windowThemeBlur, title: windowToCreate.title, width:windowToCreate.width, height:windowToCreate.height, destroyOnClose: true, recenterAuto:true});
  
  var winTitle = windowVar.getTitle()
  var element = document.createElement("a");
  element.className = "gos_dock_icon";
  element.style.display = "inline-block";
  element.setAttribute("id", "taskbarWindow_" + windowVar.getId())
  element.win = windowVar;
  $('gos_dock_windows').appendChild(element);
  //Event.observe(element, "mouseup", gos.functions.toggleMinState(windowVar));
  windowVar.element.style.background = windowToCreate.background
  element.setAttribute("href", "javascript:gos.functions.toggleMinState(document.getElementById('taskbarWindow_" + windowVar.getId() + "').win);")
  $(element).update(winTitle);
  
  windowVar.getContent().update(windowToCreate.content);
  windowVar.showCenter();

  gos.functions.logDebugOut("Window " + windowToCreate.title + " created.")
  },
  updateStartMenu: function () {

    // App List
  if (gos.debug) {
    // Application list
    var appLists = document.getElementsByClassName("gos_list_appList");
    console.log("asdfasdfadsf")
    for (var i = 0; i < appLists.length; i++) {
      // Get apps and add them to list
      console.log("afd");
      appLists[i].innerHTML = "";

      for (var ii = 0; ii < gos.app.appList.length; ii++) {

        
        console.log("afd2")
        /*var mainButton = document.createElement("button");
        var mainButton_H2 = document.createElement("h2");
        var mainButton_p = document.createElement("p");

        var appName = gos.app.appList[ii].name;
        var appDescription = gos.app.appList[ii].description;

        mainButton_H2.innerText = appName;
        mainButton_p.innerText = appDescription;
        mainButton.setAttribute("onclick", "gos.functions.toggleTaskbarMenu(0); gos.app.functions.launchApp(gos.app.appList[" + ii + "]);" )

        mainButton.appendChild(mainButton_H2);
        mainButton.appendChild(mainButton_p);
        appLists[i].appendChild(mainButton);*/
        
        if (gos.app.appList[ii].requireDebug == false) {
          var mainButton = document.createElement("button");
          var mainButton_DIV = document.createElement("div");
          var mainButton_DIV_DIV = document.createElement("div");
          var mainButton_DIV_H2 = document.createElement("h2");
          var mainButton_DIV_p = document.createElement("p");
          var mainButton_DIV_BUTTON = document.createElement("button");
          var mainButton_DIV_BUTTON_IMG = document.createElement("img")

          var appName = gos.app.appList[ii].name;
          var appDescription = gos.app.appList[ii].description;

          mainButton_DIV_H2.innerText = appName;
          mainButton_DIV_p.innerText = appDescription;
          mainButton.setAttribute("onclick", "if (gos.var.addAppToFav != true) {gos.functions.toggleTaskbarMenu(0); gos.app.functions.launchApp(gos.app.appList[" + ii + "]);} if (gos.var.addAppToFav) {gos.app.addAppToFav = false}");
          if (gos.functions.checkAppOnFavList(gos.app.appList[ii])) {
            mainButton_DIV_BUTTON.setAttribute("onmousedown", "gos.var.addAppToFav = true; gos.functions.removeAppFromFavList(gos.app.appList[" + ii + "]);");
            mainButton_DIV_BUTTON_IMG.src = "./icons/icons8-heart-full-32.png";
          } else {
            mainButton_DIV_BUTTON.setAttribute("onmousedown", "gos.var.addAppToFav = true; gos.functions.addAppToFavList(gos.app.appList[" + ii + "]);");
            mainButton_DIV_BUTTON_IMG.src = "./icons/icons8-heart-32.png";
          }

          mainButton_DIV_BUTTON.appendChild(mainButton_DIV_BUTTON_IMG);
          mainButton_DIV.appendChild(mainButton_DIV_H2);
          mainButton_DIV.appendChild(mainButton_DIV_DIV);
          mainButton_DIV.appendChild(mainButton_DIV_p);
          mainButton_DIV.appendChild(mainButton_DIV_BUTTON);
          mainButton.appendChild(mainButton_DIV);
          appLists[i].appendChild(mainButton);
        } else {
          var mainButton = document.createElement("button");
          var mainButton_H2 = document.createElement("h2");
          var mainButton_p = document.createElement("p");

          var appName = gos.app.appList[ii].name;
          var appDescription = gos.app.appList[ii].description;

          mainButton_H2.innerText = appName;
          mainButton_p.innerText = appDescription;
          mainButton.setAttribute("onclick", "gos.functions.toggleTaskbarMenu(0); gos.app.functions.launchApp(gos.app.appList[" + ii + "]);")

          mainButton.appendChild(mainButton_H2);
          mainButton.appendChild(mainButton_p);
          appLists[i].appendChild(mainButton);
        }

      }
    }
  } else {
    // Application list
    var appLists = document.getElementsByClassName("gos_list_appList");
    console.log("asdfasdfadsf")

    // Format applist
    const appsFormated = new Array();
    const appsNum = new Array();
    for (var i = 0; i < gos.app.appList.length; i++) {
      if (gos.app.appList[i].requireDebug == false) {
        appsFormated.push(gos.app.appList[i]);
        appsNum.push(i);
      }
    }

    for (var i = 0; i < appLists.length; i++) {
      // Get apps and add them to list
      console.log("afd");
      appLists[i].innerHTML = "";
      console.log(appsFormated);
      for (var ii = 0; ii < appsFormated.length; ii++) {

        console.log("afd2")
        /*var mainButton = document.createElement("button");
        var mainButton_H2 = document.createElement("h2");
        var mainButton_p = document.createElement("p");

        var appName = appsFormated[ii].name;
        var appDescription = appsFormated[ii].description;

        mainButton_H2.innerText = appName;
        mainButton_p.innerText = appDescription;
        mainButton.setAttribute("onclick", "gos.functions.toggleTaskbarMenu(0); gos.app.functions.launchApp(gos.app.appList[" + appsNum[ii] + "]);")

        mainButton.appendChild(mainButton_H2);
        mainButton.appendChild(mainButton_p);
        appLists[i].appendChild(mainButton);*/

        var mainButton = document.createElement("button");
        var mainButton_DIV = document.createElement("div"); 
        var mainButton_DIV_DIV = document.createElement("div");
        var mainButton_DIV_H2 = document.createElement("h2");
        var mainButton_DIV_p = document.createElement("p");
        var mainButton_DIV_BUTTON = document.createElement("button");
        var mainButton_DIV_BUTTON_IMG = document.createElement("img")

        var appName = appsFormated[ii].name;
        var appDescription = appsFormated[ii].description;

        mainButton_DIV_H2.innerText = appName;
        mainButton_DIV_p.innerText = appDescription;
        mainButton.setAttribute("onclick", "if (gos.var.addAppToFav != true) {gos.functions.toggleTaskbarMenu(0); gos.app.functions.launchApp(gos.app.appList[" + appsNum[ii] + "]);} if (gos.var.addAppToFav) {gos.app.addAppToFav = false}");
        // mainButton.setAttribute("onclick", "if (gos.var.addAppToFav != true) {gos.functions.toggleTaskbarMenu(0); gos.app.functions.launchApp(gos.app.appList[" + appsNum[ii] + "]);} ");
        /*mainButton_DIV_BUTTON.setAttribute("onmousedown", "gos.var.addAppToFav = true; gos.functions.addAppToFavList(gos.app.appList[" + appsNum[ii] + "])");
        mainButton_DIV_BUTTON_IMG.src = "./icons/icons8-heart-32.png";*/
        if (gos.functions.checkAppOnFavList(gos.app.appList[appsNum[ii]])) {
          mainButton_DIV_BUTTON.setAttribute("onmousedown", "gos.var.addAppToFav = true; gos.functions.removeAppFromFavList(gos.app.appList[" + appsNum[ii] + "]);");
          mainButton_DIV_BUTTON_IMG.src = "./icons/icons8-heart-full-32.png";
        } else {
          mainButton_DIV_BUTTON.setAttribute("onmousedown", "gos.var.addAppToFav = true; gos.functions.addAppToFavList(gos.app.appList[" + appsNum[ii] + "]);");
          mainButton_DIV_BUTTON_IMG.src = "./icons/icons8-heart-32.png";
        }

        mainButton_DIV_BUTTON.appendChild(mainButton_DIV_BUTTON_IMG);
        mainButton_DIV.appendChild(mainButton_DIV_H2);
        mainButton_DIV.appendChild(mainButton_DIV_DIV);
        mainButton_DIV.appendChild(mainButton_DIV_p);
        mainButton_DIV.appendChild(mainButton_DIV_BUTTON);
        mainButton.appendChild(mainButton_DIV);
        appLists[i].appendChild(mainButton);
      }
    }
  }

    // Page0 mainList updater
    var appLists = document.getElementsByClassName("gos_dock_menuStartDiv_page0_mainList_appList");

    for (var i = 0; i < appLists.length; i++) {
      appLists[i].innerHTML = "";

      var mainButton = document.createElement("div");
      var mainButton_H2 = document.createElement("h2");
      var mainButton_IMG = document.createElement("img");
      var mainButton_DIV = document.createElement("div");
      var mainButton_LIST = document.createElement("div");

      mainButton_H2.innerText = "Recently used applications";
      mainButton_IMG.src = "./icons/icons8-reloj-32.png"
      mainButton_LIST.setAttribute("class", "gos_list_recentAppList")

      mainButton_DIV.appendChild(mainButton_IMG);
      mainButton_DIV.appendChild(mainButton_H2);
      mainButton.appendChild(mainButton_DIV);
      mainButton.appendChild(mainButton_LIST);
      appLists[i].appendChild(mainButton);

      for (var ii = 0; ii < gos.var.favouriteApps.length; ii++) {
        if (gos.var.favouriteApps[ii] !== undefined) {
          var mainButton = document.createElement("button");
          var mainButton_H2 = document.createElement("h2");
          var appName = gos.var.favouriteApps[ii].name;

          mainButton_H2.innerText = appName;
          mainButton.setAttribute("onclick", "gos.functions.toggleTaskbarMenu(0); gos.app.functions.launchApp(gos.var.favouriteApps[" + ii + "]  );")

          mainButton.appendChild(mainButton_H2);
          appLists[i].appendChild(mainButton);
        }
      }
    }


  // Recent App List

    var appLists = document.getElementsByClassName("gos_list_recentAppList");

    for (var i = 0; i < appLists.length; i++) {
      // Get apps and add them to list
      console.log("xafd");
      appLists[i].innerHTML = "";

      //const appsFormatted = new Array();
      //appsFormatted = gos.var.recentApps;
      
      for (var ii = 0; ii < gos.var.recentApps.length; ii++) {


        console.log("xafd2")
        var mainButton = document.createElement("button");
        var mainButton_H2 = document.createElement("h2");
        //var mainButton_p = document.createElement("p");

        var appName = gos.var.recentApps[ii].name;
        //var appDescription = gos.var.recentApps[ii].description;

        mainButton_H2.innerText = appName;
        //mainButton_p.innerText = appDescription;
        mainButton.setAttribute("onclick", "gos.functions.toggleTaskbarMenu(0); gos.app.functions.launchApp(gos.var.recentApps[" + ii + "]  );")

        mainButton.appendChild(mainButton_H2);
        //mainButton.appendChild(mainButton_p);
        appLists[i].appendChild(mainButton);
      }
    }

  

  },
  toggleStartMenuPage: function () {
    if (gos.var.startMenuPage == 0) {
      gos.var.startMenuPage = 1;
      
      /*var elements = document.getElementsByClassName("gos_dock_menuStartDiv_pageControls_pageToggleButton");
      for (var i = 0; i < elements.length; i++) {
        elements[i].innerText = "< Back";
      }*/
    } else {
      gos.var.startMenuPage = 0

      /*var elements = document.getElementsByClassName("gos_dock_menuStartDiv_pageControls_pageToggleButton");
      for (var i = 0; i < elements.length; i++) {
        elements[i].innerText = "All apps";
      }*/
    }
  },
  postNotif: function (title, description, onclick) {
    // Crateate a Notification and add it to the list
    var notifWrapper = document.createElement("button");
    var notifWrapper_h2 = document.createElement("h2");
    var notifWrapper_p = document.createElement("p");
    notifWrapper_h2.innerText = title;
    notifWrapper_p.innerText = description;
    if (onclick !== undefined) {
      notifWrapper.onclick = "gos.functions.toggleTaskbarMenu(1); " + onclick;
    }
    notifWrapper.appendChild(notifWrapper_h2);
    notifWrapper.appendChild(notifWrapper_p);
    
    var elements = document.getElementsByClassName("gos_list_notifList");
    for (var i = 0; i < elements.length; i++) {
      elements[i].appendChild(notifWrapper);
    }

  },
  clearNotif: function () {
    var elements = document.getElementsByClassName("gos_list_notifList");
    for (var i = 0; i < elements.length; i++) {
      elements[i].innerHTML = "";
    }
  },
  addAppToFavList: function (appCode) {
    gos.var.favouriteApps.push(appCode);
    /*if (gos.var.addAppToFav) {
      gos.var.addAppToFav = false;
    }*/
    // gos.functions.toggleStartMenuPage();
    gos.functions.updateStartMenu();

    var resetVar = setTimeout(function () { 
      if (gos.var.addAppToFav) { 
        gos.var.addAppToFav = false; 
      }
    }, 250)
  },
  checkAppOnFavList: function (appCode) {
     var output = false;
     for (var i = 0; i < gos.var.favouriteApps.length; i++) {
       if (appCode === gos.var.favouriteApps[i]) {
         output = true;
       }
     }
     return output;
  },
  removeAppFromFavList: function (appCode) {
    for (var i = 0; i < gos.var.favouriteApps.length; i++) {
      if (appCode == gos.var.favouriteApps[i]) {
        gos.var.favouriteApps[i] = undefined;
      }
    }
    // gos.functions.toggleStartMenuPage();
    gos.functions.updateStartMenu();

    var resetVar = setTimeout(function () {
      if (gos.var.addAppToFav) {
        gos.var.addAppToFav = false;
      }
    }, 250)
  },
  updateIsOnMenu: function (code) {gos.var.isOnMenu = code},
  updateMenuState: function () {
    if (gos.var.litsenForMenu == true && gos.var.isOnMenu == false) {
      gos.var.litsenForMenu = false;
        gos.var.isOnMenu = false;
        //document.getElementById("gos_menu").removeEventListener("mouseenter", function() {gos_isOnMenu=true;});
        //document.getElementById("gos_menu").removeEventListener("mouseout", function() {gos_isOnMenu=false;});
        document.getElementById("gos_menuCover").parentElement.removeChild(document.getElementById("gos_menuCover"));
        document.getElementById("gos_menu").parentElement.removeChild(document.getElementById("gos_menu"));
        
    }
    if (gos.var.litsenForMenu == true) {if (document.getElementById("gos_menu").style.display == "none") {gos.var.isOnMenu = false} else {gos.var.isOnMenu = true}}
  }
}, runtime: function () {
  // Runtime Script

  gos.functions.updateTaskBarIconsState();
  gos.functions.updateZIndex();
  gos.functions.litsenForMenu();
  gos.functions.taskBarMenuManager();

  // Time
  gos.var.clock = new Date();

  // Time Fix
  var minutes = gos.var.clock.getMinutes()

  if (minutes == 0) { gos.var.clockFix.minutes = "00" } 
  else if (minutes == 1) { gos.var.clockFix.minutes = "01" } 
  else if (minutes == 2) { gos.var.clockFix.minutes = "02" }
  else if (minutes == 3) { gos.var.clockFix.minutes = "03" }
  else if (minutes == 4) { gos.var.clockFix.minutes = "04" }
  else if (minutes == 5) { gos.var.clockFix.minutes = "05" }
  else if (minutes == 6) { gos.var.clockFix.minutes = "06" }
  else if (minutes == 7) { gos.var.clockFix.minutes = "07" }
  else if (minutes == 8) { gos.var.clockFix.minutes = "08" }
  else if (minutes == 9) { gos.var.clockFix.minutes = "09" }
  else { gos.var.clockFix.minutes = gos.var.clock.getMinutes().toString() };

  var hours = gos.var.clock.getHours()

  if (hours == 0) { gos.var.clockFix.hours = "00" }
  else if (hours == 1) { gos.var.clockFix.hours = "01" }
  else if (hours == 2) { gos.var.clockFix.hours = "02" }
  else if (hours == 3) { gos.var.clockFix.hours = "03" }
  else if (hours == 4) { gos.var.clockFix.hours = "04" }
  else if (hours == 5) { gos.var.clockFix.hours = "05" }
  else if (hours == 6) { gos.var.clockFix.hours = "06" }
  else if (hours == 7) { gos.var.clockFix.hours = "07" }
  else if (hours == 8) { gos.var.clockFix.hours = "08" }
  else if (hours == 9) { gos.var.clockFix.hours = "09" }
  else { gos.var.clockFix.hours = gos.var.clock.getHours().toString() };

  var seconds = gos.var.clock.getSeconds()

  if (seconds == 0) { gos.var.clockFix.seconds = "00" }
  else if (seconds == 1) { gos.var.clockFix.seconds = "01" }
  else if (seconds == 2) { gos.var.clockFix.seconds = "02" }
  else if (seconds == 3) { gos.var.clockFix.seconds = "03" }
  else if (seconds == 4) { gos.var.clockFix.seconds = "04" }
  else if (seconds == 5) { gos.var.clockFix.seconds = "05" }
  else if (seconds == 6) { gos.var.clockFix.seconds = "06" }
  else if (seconds == 7) { gos.var.clockFix.seconds = "07" }
  else if (seconds == 8) { gos.var.clockFix.seconds = "08" }
  else if (seconds == 9) { gos.var.clockFix.seconds = "09" }
  else { gos.var.clockFix.seconds = gos.var.clock.getSeconds().toString() };

  // Update UI
  var elements = document.getElementsByClassName("gos_windows_clock_time")
  for (var i = 0; i < elements.length; i++) {
    elements[i].innerHTML = gos.var.clock.getHours() + ":" + gos.var.clockFix.minutes
  }

  var elements = document.getElementsByClassName("gos_windows_clock_date")
  for (var i = 0; i < elements.length; i++) {
    elements[i].innerHTML = gos.var.clock.getDay() + " / " + gos.var.clock.getMonth() + " / " + gos.var.clock.getFullYear();
  }

  //console.log("Workeng")

  // Menu effect
  if (gos.var.litsenForMenu == true) {
    if (gos.var.isOnMenu == false) {
      document.getElementById("gos_menu").style.opacity = "0.8";
      document.getElementById("gos_menuCover").style.background = "rgba(0,0,0,0.1)";
    } else {
      document.getElementById("gos_menu").style.opacity = "1";
      document.getElementById("gos_menuCover").style.background = "transparent";
    }
  }

  // Start Menu Updater
  if (gos.var.startMenuPage == 1) {
    var elements = document.getElementsByClassName("gos_dock_menuStartDiv_page0");
    var elements2 = document.getElementsByClassName("gos_dock_menuStartDiv_page1");

    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }

    for (var i = 0; i < elements2.length; i++) {
      elements2[i].style.display = "block";
    }

    var elements = document.getElementsByClassName("gos_dock_menuStartDiv_pageControls_pageToggleButton");
    for (var i = 0; i < elements.length; i++) {
      elements[i].innerText = "< Back";
    }
  } else {
    var elements2 = document.getElementsByClassName("gos_dock_menuStartDiv_page0");
    var elements = document.getElementsByClassName("gos_dock_menuStartDiv_page1");

    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }

    for (var i = 0; i < elements2.length; i++) {
      elements2[i].style.display = "block";
    }

    var elements = document.getElementsByClassName("gos_dock_menuStartDiv_pageControls_pageToggleButton");
    for (var i = 0; i < elements.length; i++) {
      elements[i].innerText = "All apps";
    }
  }
  
  // Debug Thing...

  //document.getElementById("gos_debug").innerHTML = mouseX + ", " + mouseY + ", " + menuMinX + ", " + menuMaxX  + ", " + menuMinY + ", " + menuMaxY + ", " + gos_isOnMenu
  //document.getElementById("gos_debug").innerHTML = "Debugger Code!"

  //console.log(gos.var.isOnMenu + ", " + gos.var.litsenForMenu)
}, init: function () {
  // Boot Screen
  var bootScreenOpacity = 100;
  var otherVariable = 0;
  var multiplyer = 5;
  for (var ii = 0; ii < 100; ii++) {
    var timeout = setTimeout(function(){
      bootScreenOpacity--;
      var bootScreenOpacityFinal = bootScreenOpacity / 100
      var x = document.getElementsByClassName("gos_boot");
      for (var i = 0; i < x.length; i++) {
        x[i].style.opacity = bootScreenOpacityFinal.toString()
      }  
    }, otherVariable)
    otherVariable = otherVariable + multiplyer;
    console.log(otherVariable);
    //if (otherVariable == multiplyer * 100) {
    //  var x = document.getElementsByClassName("gos_boot");
    //  for (var i = 0; i < x.length; i++) {
    //    x[i].style.display = "none"
    //  } 
    //}
    if (ii == 99) {
      var timeout = setInterval(function(){
        var x = document.getElementsByClassName("gos_boot");
        for (var i = 0; i < x.length; i++) {
          x[i].style.display = "none"
        }  
      }, multiplyer * 100)
    }
  }

  // Login screen config

  gos.var.updaterLogin = setInterval(function(){
    /* var elements = document.getElementsByClassName("gos_desktop_wallpaper_mirror");
    var canvas = document.getElementById("gos_desktop_wallpaper");
    for (var i = 0; i < elements.length; i++) {
      elements[i].src = canvas.toDataURL();
      
    } */
    /* var ctx = canvas.getContext('2d');

    ctx.fillRect(25,25,100,100);
    ctx.clearRect(45,45,60,60);
    ctx.strokeRect(50,50,50,50); */
    
  }, 100)

  document.getElementById("gos_login_userName").innerHTML = gos.getVar("username");

  


  // Start canvas process
  gos.var.animateCanvas = true;

  gos.functions.updateCanvas();

  if (gos.var.autoLogin) {
    //alert("Autologin running!")
    var element = document.getElementById("gos_login_userNameInput");
    element.value = gos.getVar("password")
    this.onLogin();
  }

  
}, getVar: function (input) {
  if (input == "username") {
    return "Administrator"
  }
  if (input == "password") {
    return "admin"
  }
}, onLogin: function () {
  var element = document.getElementById("gos_login_userNameInput");
  if (element.value == gos.getVar("password")) {
    var elements = document.getElementsByClassName("gos_login_passwordText");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.color = "inherit";
      elements[i].style.fontWeight = "inherit";
    }
    //document.getElementById("gos_login").style.display = "none";
    clearInterval(gos.var.updaterLogin); 
    //gos.init()
    gos.onDesktopLoad()

    var initalOpacity = 100;
    var initalScale = 1000;
    //var initalTopPos = 0;
    for (var i = 0; i < 100; i++) {
      var timeout = setTimeout(function () {
        initalOpacity--;
        var opacityFinal = initalOpacity / 100;
        document.getElementById("gos_login").style.opacity = opacityFinal.toString();

        initalScale++;
        var scaleFinal = initalScale / 1000
        document.getElementById("gos_login").style.transform = "scale(" + scaleFinal.toString() + ")"

        /* initalTopPos++;
        var topPosFinal = Math.floor(initalTopPos);
        document.getElementById("gos_login").style.top = "-" + topPosFinal.toString() */
      }, i * 2)

      var finalTimeout = setTimeout(function () {
        document.getElementById("gos_login").style.display = "none";
      }, 200)
    }
  } else {
    var elements = document.getElementsByClassName("gos_login_passwordText");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.color = "#e41e61";
      elements[i].style.fontWeight = "bold";
    }
    element.value = "";
  }
}, onDesktopLoad: function () {
  
  
  gos.functions.createWindow("Nuggers r gonna fuck up.", 200, 150, "<div class='gos_windows_terminal'><div>Some text ovah</div><div class='gos_windows_terminal_blankSpace'></div> </div>", "#000")
  gos.functions.createWindow("GeorgeSystems Debugger Software", 600, 200, "<div id='gos_debug' style='background:#000;color:#fff;font-family:monospace;padding:4px;'>SUP I AM THE GORGEOSDEBUGSHIT</div></br><div style='background: white; padding: 10px;'><button class='gos_white'>Button #1</button></div></br><div style='background: black; padding: 10px;'><button >Button #2</button></div></br><button class='unstyled'>Button #3</button><button>HOLA MI NOMBRE ES VINCE CON SLAPCHOP. </button>", "#607d8b")
  gos.var.runtime = setInterval(this.runtime, 100);
}, var:{
  litsenForMenu: undefined, isOnMenu: undefined, mouse: { x: undefined, y: undefined }, menu: { minX: undefined, maxX: undefined, minY: undefined, maxY: undefined }, runtime: undefined, clock: undefined, clockFix: { hours: undefined, minutes: undefined, seconds: undefined }, windowTheme: "mac_os_x", windowThemeBlur: "blur_os_x", isLoggedIn: undefined, updaterLogin: undefined, animateCanvas: false, canvasAnimation: 0, startMenuPage: 0, recentApps: [], favouriteApps: [], autoLogin:true, notifList:[], addAppToFav:false,
}}


// Startup code
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
    gos.functions.toggleMinState(Windows.getWindow(id))
    gos.functions.updateTaskBarIconsState();
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


function test(value) {
  if (value == 1) {
    console.log("Console logging something!");
  }
  if (value == 2) {
    alert("This is an alert!")
  }
}