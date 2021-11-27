const fs = require("fs");

// TODO: 엄청난 클래스를 만들어보자

// sidebar.js 파일 구조 맞춰주는 함수
exports.getNavSidebar = function () {
  const beautyConfig = JSON.parse(
    fs.readFileSync("./beauty.saurus.config.json")
  );
  const navItems = beautyConfig.navbar.items;
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

// docusaurus.config.js nav.items 파일구조 맞춰주는 함수
exports.getNavItemsObj = function () {
  const beautyConfig = JSON.parse(
    fs.readFileSync("./beauty.saurus.config.json")
  );
  const navItems = beautyConfig.navbar.items;
  let navItemsRepo = [];
  navItems.forEach((item) => {
    const navObj = {
      type: item.type,
      docId: item.name + "/" + item.name,
      position: item.position,
      label: item.name,
    };
    navItemsRepo.push(navObj);
  });
  return navItemsRepo;
};

// key, selector 에 따른 데이터 가져오는 함수
exports.getConfigbyKey = function (key, selector) {
  const beautyConfig = JSON.parse(
    fs.readFileSync("./beauty.saurus.config.json")
  );
  return beautyConfig[key][selector];
};
