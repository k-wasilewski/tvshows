/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const ms = require("smtp-tester");

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  let lastEmail = {};
  let tempVariables = {};

  on("task", {
    setTempVariable: ({ name, value }) => {
      tempVariables[name] = value;
      return null;
    },

    getTempVariable: (name) => {
      return tempVariables[name] || null;
    },

    removeRemoveTempVriable: (name) => {
      delete tempVariables[name];
      return null;
    },

    clearTempVariables: () => {
      tempVariables = {};
      return null;
    },

    setFirstName: (firstName) => {
      if (firstName) {
        global.firstName = firstName;
      } else {
        delete global.firstName;
      }
      return null;
    },

    getFirstName: () => {
      return global.firstName;
    },
  });
};
