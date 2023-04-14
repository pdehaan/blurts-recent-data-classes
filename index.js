#!/usr/bin/env node

import * as lib from "./lib.js";

const limit = parseInt(process.env.LIMIT, 10) || undefined;

const breaches = await lib.fetchBreaches();
const dataClasses = lib.getDataClassesByAddedDate(breaches, limit);

console.log(JSON.stringify(dataClasses, null, 2));
