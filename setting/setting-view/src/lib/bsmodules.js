const customConfig = require("../../beauty.saurus.config.json");

class NavItem {
  constructor(type, docId, position, label) {
    this.type = type;
    this.docId = docId;
    this.position = position;
    this.label = label;
  }

  getNavItem() {
    return {
      type: this.type,
      docId: this.docId,
      position: this.position,
      label: this.label,
    };
  }
}

// side.js 에서 side.js 를 생성해주는 method
exports.getNavSidebar = function () {
  // 이 부분 좀 리액트 전역에서 가져와야 할거같은 느낌적인 느낌
  const navItems = customConfig.navbar.items;
  const navSidebar = {};
  navItems.forEach((item) => {
    navSidebar[item.name] = [
      {
        type: "autogenerated",
        dirName: item.name,
      },
    ];
  });

  console.log("navSidebar", navSidebar);
  return navSidebar;
};

exports.getNavItemsObj = function () {
  const navItems = customConfig.navbar.items;
  let navItemsRepo = [];

  navItems.forEach((item) => {
    const navObj = new NavItem(
      item.type,
      item.name + "/" + item.name,
      item.position,
      item.name
    );
    navItemsRepo.push(navObj);
  });

  console.log("navItemsRepo", navItemsRepo);
  return navItemsRepo;
};

exports.applycustomCss = function () {
  window.onload = function () {
    const root = document.querySelector(":root");

    // console.log("customConfig", customConfig);

    //navbar configuration
    root.getElementsByClassName("navbar__logo")[0].style.margin =
      customConfig.navbar["title-margin"];
    root.style.setProperty(
      "--ifm-navbar-background-color",
      customConfig.navbar["background-color"]
    );
    root.style.setProperty(
      "--ifm-navbar-height",
      customConfig.navbar["height"]
    );

    //header configuration

    //feature configuration
    const { feature } = customConfig;

    //근데 세팅도큐에서는 이렇게 할게 아니라 스테이트를 읽어와야겠네.
    //초기값만 json에서 읽어와서 initialState에 넣어줘야될듯.
    root.getElementsByClassName("linkSection")[0].style.backgroundColor =
      feature["linkBackground-color"];
    root.getElementsByClassName(
      "linkSection"
    )[0].style.backgroundImage = `url(${feature["linkBackground-image"]})`;
    root.getElementsByClassName("linkSection")[0].style.height =
      feature["linkHeight"];
    root.getElementsByClassName("basicSection")[0].style.backgroundColor =
      feature["basicBackground-color"];
    root.getElementsByClassName(
      "basicSection"
    )[0].style.backgroundImage = `url(${feature["basicBackground-image"]})`;
    root.getElementsByClassName("basicSection")[0].style.height =
      feature["basicHeight"];
  };
};
