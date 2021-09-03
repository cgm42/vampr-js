class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let num = 0;
    let creator = this.creator;
    while (creator) {
      num++;
      creator = creator.creator;
    } 
    return num;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal ? false : true; 
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this.creator === null) {
      return this;
    }
    if( vampire.creator === null) {
      return null;
    }
    if (this === vampire) {
      return this;
    }
    if (this.creator === vampire.creator && this.creator.creator === null) {
      return this.creator;
    }
    //this more senior
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      let creator = this;
      let result;
      if (creator === vampire.creator) {
        return creator;
      }
      let vampCre = vampire.creator;
      while(creator) {
        if (creator.offspring.includes(vampCre)){
          return creator;
        }
        creator = creator.creator;
        vampCre = vampCre.creator;
      }
    //this more junior
    } else if (this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal) {
      let creator = vampire;
      let result;
      if (creator === this.creator) {
        return creator;
      }
      let vampCre = this.creator;
      while(creator) {
        if (creator.offspring.includes(vampCre)){
          return creator;
        }
        creator = creator.creator;
        vampCre = vampCre.creator;
      }
    } 
    return;
  }

}
module.exports = Vampire;

