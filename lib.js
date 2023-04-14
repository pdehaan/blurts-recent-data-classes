export async function fetchBreaches() {
  const res = await fetch("https://haveibeenpwned.com/api/v3/breaches");
  return res.json();
}

export function getDataClassesByAddedDate(breaches=[], limit=5) {
  // Sort breaches by `AddedDate` (oldest to newest).
  const breachesByAddedDate = breaches.sort((a, b) => a.AddedDate - b.AddedDate);
  const dataClassMap = new Map();
  for (const b of breachesByAddedDate) {
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
        name: breach.Name,
        monitor: `https://monitor.firefox.com/breach-details/${breach.Name}`,
        hibp: `https://haveibeenpwned.com/api/v3/breach/${breach.Name}`,
      };
    })
    // Sort the data classes from newest to oldest.
    .sort((a, b) => b.addedDate - a.addedDate);
  return dataClasses.slice(0, limit);
}
