#!/usr/bin/env node

const breaches = await fetchBreaches();
const dataClasses = getDataClassesByAddedDate(breaches, 5);

console.log(JSON.stringify(dataClasses, null, 2));

async function fetchBreaches() {
  const res = await fetch("https://haveibeenpwned.com/api/v3/breaches");
  return res.json();
}

function getDataClassesByAddedDate(breaches=[], limit=10) {
  const dataClassMap = new Map();
  for (const b of breaches) {
    for (const dc of b.DataClasses) {
      if (!dataClassMap.has(dc)) {
        dataClassMap.set(dc, b);
      }
    }
  }
  const entries = Object.fromEntries(dataClassMap);
  const dataClasses = Object.entries(entries)
    .map(([dataClass, breach]) => {
      return {
        dataClass,
        addedDate: new Date(breach.AddedDate),
        name: breach.Name
      };
    })
    .sort((a, b) => b.addedDate - a.addedDate);
  return dataClasses.slice(0, limit);
}
