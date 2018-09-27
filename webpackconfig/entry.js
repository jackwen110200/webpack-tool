const common = require('../util/common');
const fs = require('fs');
const path = require('path');
const bwtConfig = require(common.bwtConfigFile);
let configEntry = bwtConfig && bwtConfig.entry ? bwtConfig.entry : {};
let configHtml = bwtConfig && bwtConfig.htmls ? bwtConfig.htmls : {};
let entry = {};

const pages = fs.readdirSync(common.viewPath).filter(function (page) {
    return page.indexOf('.') !== 0;
});

const htmls = {};
pages.forEach(function (page) {
    if(configEntry[page]) {
        entry[page] = configEntry[page];
    } else {
        let file = [common.viewPath, page, common.mainFile].join('/');
        if (page == 'common') {
            file = [common.viewPath, page, 'common.js'].join('/');
        }
        entry[page] = file;
    }
    if (page == 'common') {
        return;
    }
    if(configHtml[page]) {
        htmls[page] = configHtml[page];
    } else {
        let file = [common.viewPath, page, common.htmlFile].join('/');
        htmls[page] = file;
    }
});

// entry.vendor = ['react', 'react-dom', 'vue', 'vue-router'];
entry.vendor = ['vue', 'vue-router'];

module.exports = {
    entry: entry,//Object.values(entry),
    htmls: htmls
};