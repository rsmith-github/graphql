(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{53:function(e,t,n){e.exports=n(71)},61:function(e,t,n){},62:function(e,t,n){},71:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(43),c=n.n(l),i=(n(61),n(6)),o=(n(62),n(18)),s=n(15),u=n(20),m=(n(69),n(17)),p=function(e){var t=e.data,n=e.height,l=e.width,c=e.horizontalGuides,o=e.verticalGuides,s=e.precision,u=(e.amount,e.setAmount),p=(e.exercise,e.setExercise),d=l/50,E=Math.max.apply(Math,Object(m.a)(t.map(function(e){return e.x}))),h=Math.max.apply(Math,Object(m.a)(t.map(function(e){return e.y}))),f=parseFloat(h.toString()).toFixed(s).length+1,g=3*(d+f),y=l-2*g,k=n-2*g,v=t.map(function(e){var t=e.x/E*y+g,n=k-e.y/h*k+g;return"".concat(t,",").concat(n)}).join(" "),b=function(e){var t=e.points;return r.a.createElement("polyline",{fill:"none",stroke:"#ccc",strokeWidth:".5",points:t})},x=function(){return r.a.createElement(b,{points:"".concat(g,",").concat(n-g," ").concat(l-g,",").concat(n-g)})},w=function(){return r.a.createElement(b,{points:"".concat(g,",").concat(g," ").concat(g,",").concat(n-g)})},j=function(){var e=o||t.length-1,a=g,c=n-g;return new Array(e).fill(0).map(function(t,n){var i=g+(n+1)/e*(l-2*g);return r.a.createElement(r.a.Fragment,{key:n},r.a.createElement("polyline",{fill:"none",stroke:"#ccc",strokeWidth:".5",points:"".concat(i,",").concat(a," ").concat(i,",").concat(c)}))})},_=function(){var e=g,t=l-g;return new Array(c).fill(0).map(function(n,a){var l=k-k*((a+1)/c)+g;return r.a.createElement(r.a.Fragment,{key:a},r.a.createElement("polyline",{fill:"none",stroke:"#ccc",strokeWidth:".5",points:"".concat(e,",").concat(l," ").concat(t,",").concat(l)}))})},S=function(){var e=n-g+2*d;return t.map(function(t,n){var l=t.x/E*y+g-d/2,c=Object(a.useState)(),o=Object(i.a)(c,2),s=o[0],m=o[1];return r.a.createElement("svg",{x:l,y:e-15,style:{overflow:"visible",height:"5px",width:"5px"}},r.a.createElement("text",{onMouseEnter:function(){m(!0)},onClick:function(){u(t.y),p(t.label)},onMouseLeave:function(){return m(!1)},key:"text-"+n,className:"xtext",style:{fill:s?"#61dafb":"white",fontSize:s?d+1:d,fontFamily:"Helvetica",transform:"rotate(45deg)",cursor:"pointer"}},t.label))})},N=function(){var e=c;return new Array(e+1).fill(0).map(function(t,n){var a=d,l=k-k*(n/c)+g+d/2;return r.a.createElement("text",{key:n,x:a,y:l,style:{fill:"white",fontSize:d,fontFamily:"Helvetica"}},parseFloat(h*(n/e)).toFixed(s))})};return r.a.createElement("svg",{viewBox:"0 30 ".concat(l," ").concat(n)},r.a.createElement(x,null),r.a.createElement(S,null),r.a.createElement(w,null),r.a.createElement(N,null),o&&r.a.createElement(j,null),r.a.createElement(_,null),r.a.createElement("polyline",{fill:"none",stroke:"#61dafb",strokeWidth:1,points:v}))};p.defaultProps={height:200,width:500,horizontalGuides:4,verticalGuides:null,precision:2};var d=p,E=(n(44),function(e){var t=e.children,n=e.height,a=e.width;return r.a.createElement("svg",{viewBox:"0 -20 ".concat(a," ").concat(n+100),height:n,width:a,className:"graph2"},t)}),h=function(e){var t=e.fill,n=void 0===t?"white":t,l=e.x,c=e.y,o=e.height,s=e.width,u=e.name,m=e.color,p=e.skill_points,d=Object(a.useState)(!1),E=Object(i.a)(d,2),h=E[0],f=E[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("rect",{fill:n,x:l,y:c,height:o,width:s,style:{fill:h?m:"teal"}}),r.a.createElement("rect",{fill:"transparent",x:l,y:0,height:o+c,width:s,onMouseEnter:function(){return f(!0)},onMouseLeave:function(){return f(!1)},style:{cursor:"pointer"}}),r.a.createElement("text",{x:l,y:c,style:{fill:"white",display:h?"block":"none",fontSize:"25px"},onMouseEnter:function(){return f(!0)}},p),r.a.createElement("svg",{x:l+10,y:c+o+20,style:{overflow:"auto"}},r.a.createElement("rect",{x:0,y:3,width:s,height:5,fill:m,stroke:m,style:{transform:"rotate(45deg)"}}),r.a.createElement("text",{style:{fill:"white",transform:"rotate(45deg)",border:"solid 1px ".concat(m)}},"Game Development"===u?"Game Dev.":"Systems Administration"===u?"Sys. Admin":u)))},f=function(e){var t=e.data,n=50*t.length,a=t.map(function(e){return e.skill_points}).reduce(function(e,t){return t>e?t:e},-1/0);return r.a.createElement(E,{height:a,width:n},t.map(function(e,t){return r.a.createElement(h,{key:e.name,fill:"teal",x:50*t,y:a-e.skill_points,width:35,height:e.skill_points,name:e.name,color:e.color,skill_points:e.skill_points})}))},g=new s.QueryClient,y="https://learn.01founders.co/api/graphql-engine/v1/graphql";function k(){var e=Object(s.useQuery)("users",function(){return Object(o.request)(y,'\n  {\n        user(where: { id: { _eq: 1954 }}){\n          id\n          login\n        }\n        transaction(where: { userId: { _eq: 1954 }, path: {_like: "%real-time-forum"}, type: {_eq: "level"}}){\n          userId\n          type\n          amount\n        }\n  }\n  ')}),t=e.data,n=e.isLoading,a=e.error;return n?r.a.createElement("div",{className:"page top-left",id:"profile"},r.a.createElement("p",null,"Loading...")):a?r.a.createElement("pre",null,a.message):r.a.createElement("div",{className:"page top-left",id:"profile"},t.user.map(function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",{id:"profile-header"},"ID: ",r.a.createElement("span",{style:{color:"white"}},e.id)),r.a.createElement("h2",null,"Login: ",r.a.createElement("span",{style:{color:"white"}},e.login)))}),r.a.createElement("br",null),t.transaction.filter(function(e,t){return 19===e.amount}).map(function(e){return r.a.createElement("h2",{id:"level"},e.type,": ",r.a.createElement("span",{style:{color:"white"}},e.amount))}),r.a.createElement(j,null))}function v(){var e=Object(s.useQuery)("skills",function(){return Object(o.request)(y,'\n    {\n      transaction(where: { userId: { _eq: 1954 }, type: {_like: "%skill%"}}){\n        type\n        amount\n      }\n      \n    }\n  ')}),t=e.data,n=e.isLoading,a=e.error;if(n)return r.a.createElement("div",{className:"page top-center",id:"profile"},r.a.createElement("p",null,"Loading..."));if(a)return r.a.createElement("pre",null,a.message);var l=_(t);return r.a.createElement("div",{className:"page top-center",id:"ratio"},r.a.createElement("h2",null,"Skills"),r.a.createElement(u.c,{naturalSlideWidth:100,naturalSlideHeight:20,totalSlides:l.length,infinite:!0},r.a.createElement(u.e,null,l.map(function(e,t){return r.a.createElement(u.d,{index:t},r.a.createElement("p",{className:"skill-type",style:{color:"".concat(e.color),textAlign:"center",fontSize:"25px",marginBottom:"10px"}},e.name),r.a.createElement("div",{style:{display:"flex",justifyContent:"center",gap:"30px"}},r.a.createElement("p",null,r.a.createElement("span",null,"Total Skill Points: ")," ",r.a.createElement("span",{className:"number"},e.skill_points)),r.a.createElement("p",null,r.a.createElement("span",null,"Projects completed: ")," ",r.a.createElement("span",{className:"number"},e.projects_completed))))})),r.a.createElement("div",{className:"crslBtnContainer"},r.a.createElement(u.a,{className:"sliderBtn"},"\u2039"),r.a.createElement(u.b,{className:"sliderBtn"},"\u203a"))))}function b(){var e=Object(s.useQuery)("projects",function(){return Object(o.request)(y,'\n  {\n      transaction(where: { userId: { _eq: 1954 }, path: {_like: "%piscine-go/quest-%"}}){\n          type\n          amount\n          objectId\n          createdAt\n          object {\n          id\n            name\n          }\n      }\n  }\n  ')}),t=e.data,n=e.isLoading,a=e.error;return n?r.a.createElement("div",{className:"page top-right",id:"projects"},r.a.createElement("p",null,"Loading...")):a?r.a.createElement("pre",null,a.message):r.a.createElement("div",{className:"page top-right",id:"projects"},r.a.createElement("h2",null,"XP in Piscine-Go"),r.a.createElement("div",{style:{overflow:"auto",height:"185px"}},t.transaction.map(function(e){return r.a.createElement("div",null,r.a.createElement("p",{key:"project-"+e.id},r.a.createElement("span",null,"Challenge Name: "),e.object.name),r.a.createElement("p",null,r.a.createElement("span",null,"XP: "),e.amount," ",r.a.createElement("span",null,"kB")),r.a.createElement("br",null))})))}function x(){var e=Object(a.useState)(),t=Object(i.a)(e,2),n=t[0],l=t[1],c=Object(a.useState)(),u=Object(i.a)(c,2),m=u[0],p=u[1],E=Object(s.useQuery)("piscine-go",function(){return Object(o.request)(y,'\n  {\n      transaction(where: { userId: { _eq: 1954 }, path: {_like: "%piscine-go/quest-%"}}){\n          type\n          amount\n          objectId\n          createdAt\n          object {\n            id\n            name\n          }\n      }\n  }\n  ')}),h=E.data,f=E.isLoading,g=E.error;if(f)return r.a.createElement("div",{className:"page bottom-left",id:"Graph1"},r.a.createElement("p",null,"Loading..."));if(g)return r.a.createElement("pre",null,g.message);var k=[];return h.transaction.forEach(function(e,t){if(t<30){var n={label:e.object.name,x:t,y:e.amount};k.push(n)}}),r.a.createElement("div",{className:"page bottom-left",id:"Graph1"},r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"XP Gained - First 30 Exercises (Piscine-Go)"),r.a.createElement(d,{width:500,height:300,data:k,horizontalGuides:15,verticalGuides:15,precision:2,amount:n,setAmount:l,exercise:m,setExercise:p}),n&&r.a.createElement("p",null,m,": ",r.a.createElement("span",null,n)),!n&&r.a.createElement("p",null,"Exercise: ",r.a.createElement("span",null,"N/A")," ")))}function w(){var e=Object(s.useQuery)("skillsGraph2",function(){return Object(o.request)(y,'\n  {\n    transaction(where: { userId: { _eq: 1954 }, type: {_like: "%skill%"}}){\n      type\n      amount\n    }\n  }\n  ')}),t=e.data,n=e.isLoading,a=e.error;if(n)return r.a.createElement("div",{className:"page bottom-right",id:"Graph2"},r.a.createElement("p",null,"Loading..."));if(a)return r.a.createElement("pre",null,a.message);var l=_(t);return r.a.createElement("div",{className:"page bottom-right",id:"Graph2"},r.a.createElement("h2",null,"Skills Chart"),r.a.createElement(f,{data:l}))}function j(){var e=Object(s.useQuery)("schoolQuery",function(){return Object(o.request)(y,"\n  {\n    result{\n      path\n    }\n  }\n  ")}),t=e.data,n=e.isLoading,a=e.error;return n?r.a.createElement("p",null,"..."):a?r.a.createElement("pre",null,a.message):(console.log(t),r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{className:"campusText"},"Campus: \xa0"),r.a.createElement("p",{className:"schoolName"},t.result[0].path.split("/")[1])))}function _(e){e.transaction.forEach(function(e){switch(e.type){case"skill_algo":e.type="Algorithms",e.color="teal";break;case"skill_prog":e.type="Programming",e.color="#306998";break;case"skill_html":e.type="HTML",e.color="#e34c26";break;case"skill_css":e.type="CSS",e.color="#264de4";break;case"skill_js":e.type="JavaScript",e.color="#F0DB4F";break;case"skill_go":e.type="Golang",e.color="#29BEB0";break;case"skill_front-end":e.type="Frontend",e.color="#a4c639";break;case"skill_back-end":e.type="Backend",e.color="firebrick";break;case"skill_sql":e.type="SQL",e.color="#b100cd";break;case"skill_docker":e.type="Docker",e.color="#0db7ed";break;case"skill_sys-admin":e.type="Systems Administration",e.color="#DBE4EB";break;case"skill_game":e.type="Game Development",e.color="deeppink";break;case"skill_stats":e.type="Statistics",e.color="green"}});var t={};return e.transaction.forEach(function(e){t[e.type]?t[e.type]={name:e.type,skill_points:e.amount+t[e.type].skill_points,projects_completed:t[e.type].projects_completed+1,color:e.color}:t[e.type]={name:e.type,skill_points:e.amount,projects_completed:1,color:e.color}}),Object.values(t)}var S=function(){return r.a.createElement(s.QueryClientProvider,{client:g},r.a.createElement("div",{class:"patterns"},r.a.createElement("svg",{width:"100%",height:"30%"},r.a.createElement("text",{x:"50%",y:"80%","text-anchor":"middle"},"GraphQL"))),r.a.createElement("div",{className:"App"},r.a.createElement(k,null),r.a.createElement(v,null),r.a.createElement(b,null),r.a.createElement(x,null),r.a.createElement(w,null)))},N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,76)).then(function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,l=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),l(e),c(e)})};c.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(S,null))),N()}},[[53,1,2]]]);
//# sourceMappingURL=main.14ff3547.chunk.js.map