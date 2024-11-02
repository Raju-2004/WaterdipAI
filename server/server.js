'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const fs_1 = __importDefault(require('fs'))
const path_1 = __importDefault(require('path'))
const csv_parser_1 = __importDefault(require('csv-parser'))
const app = (0, express_1.default)()
fs_1.default
  .createReadStream(path_1.default.join(__dirname, 'hotel_bookings_1000.csv'))
  .pipe((0, csv_parser_1.default)())
  .on('data', (data) => console.log(data))
