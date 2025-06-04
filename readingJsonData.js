
let MasterSheetData

class ReadJson {

  readJsonDfata(jsonfilePath, key, cpName) {
    let masterValues = []
    let MKeysArray
    MasterSheetData = require('../../fixtures/creditReviewData/crValidationData.json')
    if (MasterSheetData != null) {
      let lengthOfMaster = MasterSheetData.rows.length
      if (lengthOfMaster) {
        for (let i = 0; i < lengthOfMaster; i++) {
          masterValues = Object.values(MasterSheetData.rows[i]);
          MKeysArray = Object.keys(MasterSheetData.rows[i])
          for (let j = 0; j < masterValues.length; j++) {
            cy.log(key)
            cy.pause()
            if (MKeysArray[j] == "Key" && masterValues[j] == key) {
              cy.log("key matched : inside if block:" + masterValues[i])
            }
          }
        }
      }
    }
  }
  readJsonData(key, sheetData) {
    let sheetValues;
    let SKeysArray;
    var rowData = new Map();
    let index;
    if (sheetData != null && sheetData != undefined) {
      let lengthOfSheetData = sheetData.rows.length;
      if (lengthOfSheetData) {
        for (let i = 0; i < lengthOfSheetData; i++) {
          sheetValues = Object.values(sheetData.rows[i]);
          SKeysArray = Object.keys(sheetData.rows[i])
          for (let j = 0; j < SKeysArray.length; j++) {
            if (SKeysArray[j] == "Key" && sheetValues[j] == key) {

              index = i;
              cy.log("Key Matched Started Reading row data " + key)
              for (let k = 0; k < SKeysArray.length; k++) {
                rowData.set(SKeysArray[k], sheetValues[k])
              }
              break;
            }
          }
        }
      }
    }
    return rowData;
  }

} export default ReadJson