(function () {
var testobj = new Test.TAP.Class();
testobj.plan(10)

testobj.testMultiMethod = function() {
    var t = this;
    t.diag("Sanity");
    t.ok(Joose,   "Joose is here");
    t.ok(JooseX.MultiMethod,   "We have the MultiMethod class");

    Class("MultiMethodTestClass", {
        methods: {
            test: function () { return "foo"  }
        }
    });
    
    var method = new JooseX.MultiMethod("multi", function () {}, {});
    var patterns = [
        {
            signature : [],
            fun       : function() {
                return "foo";
            }
        },
        {
            signature : [TYPE.Str, TYPE.Func],
            fun       : function() {
                return "fooStringFunc";
            }
        },
    ];
    method.setPatterns(patterns);
    MultiMethodTestClass.meta.addMethodObject(method);
    
    var o = new MultiMethodTestClass();
    
    t.ok(o.meta.can("multi"), "Method is there");
    t.ok(typeof o.multi === "function", "There is actually a function in the spot");
   
    var result;
    t.lives_ok(function () {
        result = o.multi();
    }, "calling with correct argument signature lives")
    
    t.is(result, "foo", "result from method call is correct")
   
    var result2;
    t.lives_ok(function () {
        result2 = o.multi("blah", function() {});
    }, "calling with a different correct argument signature lives")
   
    t.ok(result != result2, 
        "result from method calls with different signatures "
         + "produce different results")
    
    t.is(result2, "fooStringFunc", "result from second signature for method" 
        + "call is correct")
    
    // exceptions
    t.throws_ok(function () {
        o.multi(1,2,3)
    }, /multi-method type method call with no matching signature/, 
        "Calling with incorrect signature throws exception")
    
    // builder syntax
    //t.diag("Testing builder syntax for typed methods")
    
};

return testobj;
})()
