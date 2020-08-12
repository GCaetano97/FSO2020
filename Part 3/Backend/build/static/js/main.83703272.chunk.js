(this["webpackJsonppart2ex2.15-2.18"]=this["webpackJsonppart2ex2.15-2.18"]||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=(t(19),t(2)),l=function(e){var n=e.filter,t=e.handleFilterChange;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t}))},i=function(e){var n=e.addPersons,t=e.newName,a=e.handleNameChange,o=e.newNumber,c=e.handleNumberChange;return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name :",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:o,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},m=function(e){var n=e.person,t=e.handleDelete;return r.a.createElement("div",null,n.name," ",n.number,r.a.createElement("button",{onClick:function(){return t(n.id,n.name)}},"Delete"))},d=function(e){var n=e.persons,t=e.newFilter,a=e.handleDelete,o=n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));return r.a.createElement("div",null,o.map((function(e){return r.a.createElement(m,{key:e.id,person:e,handleDelete:a})})))},s=t(3),f=t.n(s),h="/api/persons",b=function(){return f.a.get(h).then((function(e){return e.data}))},v=function(e){return f.a.post(h,e).then((function(e){return e.data}))},p=function(e,n){return f.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},g=function(e){return f.a.delete("".concat(h,"/").concat(e))},w=function(e){var n=e.message,t={color:n.color,background:"lightgrey",fontSize:20,bordeStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return null===n.content?null:r.a.createElement("div",{style:t},n.content)},E=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)("A new name"),m=Object(u.a)(c,2),s=m[0],f=m[1],h=Object(a.useState)("A new number"),E=Object(u.a)(h,2),C=E[0],O=E[1],j=Object(a.useState)(""),k=Object(u.a)(j,2),y=k[0],N=k[1],S=Object(a.useState)({content:null}),D=Object(u.a)(S,2),B=D[0],F=D[1];Object(a.useEffect)((function(){b().then((function(e){o(e)}))}),[]);var P=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#228B22";if(e instanceof Error){var t=void 0!==e.response.data.error?e.response.data.error:"Opps something went wrong";F({content:t,color:"red"}),setTimeout((function(){F({content:null})}),5e3)}else F({content:e,color:n}),setTimeout((function(){F({content:null})}),5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{message:B}),r.a.createElement(l,{filter:y,handleFilterChange:function(e){N(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(i,{addPersons:function(e){var n={name:s,number:C};e.preventDefault();var a=t.filter((function(e){return e.name===n.name}));a.length>0?window.confirm("".concat(n.name," is already added to phonebook. Would you like to update the number?"))&&(p(a[0].id,n).then((function(e){b().then((function(e){o(e),f(""),O(""),P("Updated ".concat(n.name,"'s number"))}))})).catch((function(e){P(e),o(t.filter((function(e){return e.id!==a[0].id})))})),b().then((function(e){return o(e)}))):v(n).then((function(e){o(t.concat(e)),f(""),O(""),P("Added ".concat(n.name,"'s number to the Phonebook"))})).catch((function(e){P(e)}))},newName:s,handleNameChange:function(e){f(e.target.value)},newNumber:C,handleNumberChange:function(e){O(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(d,{persons:t,newFilter:y,handleDelete:function(e,n){window.confirm("Do you want to delete ".concat(n," from your list?"))&&g(e).then((function(){o(t.filter((function(n){return n.id!==e})))}))}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.83703272.chunk.js.map