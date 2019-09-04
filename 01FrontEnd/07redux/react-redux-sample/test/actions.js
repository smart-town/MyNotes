"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHeader = setHeader;
exports.actions = void 0;
var actions = {
  TITLE: "TITLE",
  RENAME: "RENAME"
};
exports.actions = actions;

function setHeader(title) {
  return {
    type: actions.RENAME,
    title: title
  };
}