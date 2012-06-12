Person = Backbone.Model.extend({
    defaults: {
      name: "Jimbo",
      age: 0,
      children: [],
      sex: "male"
    }
    , validate: function( attributes ){
        if( attributes.age < 0 && attributes.name != "Dr Manhatten" ){
            return "You can't be negative years old";
        }
    }
    , initialize: function() {
      alert("Welcome to this world");
      this.bind("change:name", function() {
        var name = this.get("name");
        alert("Changed my name to " + name);
      });
    }
    , adopt: function( newChildsName) {
      var children_array = this.get("children");
      children_array.push( newChildsName );
      this.set({ children: children_array });
    }
});

var person = new Person({name: "Thomas", age: 67});
// person.set({name: "Thomas", age: 67});

var age = person.get("age");
var name = person.get("age");
console.log("age is " + age + ", name is " + age + ", and sex is " + person.get("sex"));
person.adopt('John Resig');
var children = person.get("children");
console.log("my children: " + children);
person.set({name : "Charlie"});
console.log(person.toJSON());
person.set({age: 45});
console.log("age is " + person.get("age"));
person.set({age: -1});
console.log("age is " + person.get("age"));