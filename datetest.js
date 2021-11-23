let dateOfBirthArray = [];

let dateValue = '1988-10-29'
const regex = /(?<year>[\d]{4,})-(?<month>[\d]{2,})-(?<day>[\d]{2,})/;

let match = regex.exec(dateValue)
console.log(match)