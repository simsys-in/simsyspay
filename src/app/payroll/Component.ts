export class Component {
    private fieldArray: Array<any> = [];
    private newAttribute: any = {};
    addFieldValue() {
      this.fieldArray.push(this.newAttribute);
      this.newAttribute = {};
    }
    deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
    }
  }