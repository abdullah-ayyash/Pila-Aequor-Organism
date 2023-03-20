// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}
// factory function
function pAequorFactory(num,arr){
  if(arr.length === 15){
    return {
      _specimenNum: num,
      _dna: arr,
      mutate(){
        console.log("This is the Initial Array:")
        console.log(this._dna)
        let randomNum = Math.floor(Math.random() * 15)
        let randomBase = this._dna[randomNum];
        let currentIndex = this._dna.indexOf(randomBase);
        let dnaBases = ['A', 'T', 'C', 'G']
        dnaBases = dnaBases.filter(word => word !== randomBase) 
        this._dna.splice(currentIndex, 1, dnaBases[Math.floor(Math.random() * 3)]);
        console.log('\nThis is the mutated array:')
        return this._dna;
      },
      compareDNA(pAequor){
        let count = 0;
        for(let i = 0; i < 15; i++){
          if(pAequor._dna[i] === this._dna[i]){
            count++;
          }
        }
        let common = (count/15)*100
        console.log(`specimen ${this._specimenNum} and specimen ${pAequor._specimenNum} have ${common.toFixed(2)}% DNA in common`)
      },
      willLikelySurvive(){
        let numOfC = 0;
        let numOfG = 0;
        for(let i = 0; i < 15; i++){
          if(this._dna[i] === 'C'){
            numOfC++;
          }
          if(this._dna[i] === 'G'){
            numOfG++;
          }
        }
        // 9/15 is 60%
        if(numOfC >= 9 || numOfG >= 9){
          // console.log(`The specimen has ${(numOfC/15*100).toFixed(2)}% C's and ${(numOfG/15*100).toFixed(2)}% G's`);
          return true;
        }
        else{
          // console.log(`The specimen has ${(numOfC/15*100).toFixed(2)}% C's and ${(numOfG/15*100).toFixed(2)}% G's`);
          return false;
        }
      }
    }
  }
  else{
    console.log('The array should have 15 DNA bases')
  }
  
}
// Second pAequor
let object2 = pAequorFactory(638,mockUpStrand());

// First pAequor
let object1 = pAequorFactory(528,mockUpStrand());
// print initial and mutated DNS's
console.log(object1.mutate());
// Comparing the two DNS's
object1.compareDNA(object2);
console.log('-------------------')
// Checking likelihood of survival for object1
console.log(object1.willLikelySurvive())
///////// getting one that can survive
function getSurviaval(instances){
  // I could make my counter start at 1000
  let myCount = 0;
  let validObj = 0;
  let arrayOfValid = [];
  let survive = pAequorFactory(myCount,mockUpStrand())
  while(validObj < instances){
    myCount++;
    survive = pAequorFactory(myCount,mockUpStrand())
    if(survive.willLikelySurvive()){
      arrayOfValid.push(survive);
      validObj++;
    }
  }
  return arrayOfValid;
}
console.log('-------------------')
console.log('We are creating 30 instances now.....')
console.log(getSurviaval(30));
