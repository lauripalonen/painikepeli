(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{17:function(e,t,n){e.exports=n(41)},40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(16),c=n.n(u),s=n(6),o=n(1),l=n.n(o),i=n(2),p=n(5),m=n(4),f=n.n(m),d={login:function(){var e=Object(i.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},h=function(){var e=Object(i.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.post("/api/users",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=Object(i.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get("".concat("/api/users","/").concat(t));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b={signup:h,updateUserPoints:function(){var e=Object(i.a)(l.a.mark((function e(t,n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.put("".concat("/api/users","/").concat(t),n);case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),getUser:v},w={increment:function(){var e=Object(i.a)(l.a.mark((function e(t,n){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.put("".concat("/api/button","/").concat(t),n);case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),getButton:function(){var e=Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get("/api/button");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),getPushCount:function(){var e=Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get("/api/button");case 2:return t=e.sent,e.abrupt("return",t.data.pushCount);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},g=function(e){var t=e.handleUsernameChange,n=e.handlePasswordChange,a=e.username,u=e.password,c=e.handleLogin,s=e.handleSignUp,o=e.notification;return r.a.createElement("div",{className:"account-block"},r.a.createElement("h2",null,"Player account"),r.a.createElement("form",{className:"user-form"},r.a.createElement("label",{htmlFor:"username"},"Username "),r.a.createElement("br",null),r.a.createElement("input",{className:"input-field",type:"text",value:a,name:"Username",onChange:t}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("label",{htmlFor:"password"},"Password "),r.a.createElement("br",null),r.a.createElement("input",{className:"input-field",type:"password",value:u,name:"Password",onChange:n})),r.a.createElement("div",null,r.a.createElement("button",{onClick:c,className:"normal-button"},"LOG IN")," or ",r.a.createElement("button",{onClick:s,className:"normal-button"},"SIGN UP")),r.a.createElement("p",{style:{textAlign:"center"}},o))},E=function(e){var t=e.handleButtonPush;return r.a.createElement("div",null,r.a.createElement("button",{onClick:t,id:"thebutton"},"PUSH"))},x=function(e){var t=e.handleButtonPush,n=e.userPoints,a=e.rewardCounter,u=e.notification,c=e.handleLogout;return r.a.createElement("div",{className:"game-display"},r.a.createElement("div",{className:"game-content"},r.a.createElement(E,{handleButtonPush:t})),r.a.createElement("div",{className:"game-data"},"Your points: ",n," ",r.a.createElement("br",null),"Next reward in: ",a," pushes"),r.a.createElement("div",{className:"notification-bar"},u),r.a.createElement("div",{className:"instruction-block"},r.a.createElement("h4",null,"Instructions: "),r.a.createElement("ul",null,r.a.createElement("li",null,"* Push the button and gain rewards"),r.a.createElement("li",null,"* Push cost: 1 point"),r.a.createElement("li",null,"* Lose all points: Game over!"),r.a.createElement("br",null),r.a.createElement("li",null,"(You can start again with 20 points)")),r.a.createElement("h4",null,"Rewards: "),r.a.createElement("ul",null,r.a.createElement("li",null,"* every 10th click: +5 points"),r.a.createElement("li",null,"* every 100th click: +40 points"),r.a.createElement("li",null,"* every 500th click: +250 points")),r.a.createElement("p",{className:"quote"},'"You win some, you lose some!"')),r.a.createElement("div",{style:{textAlign:"center"}},r.a.createElement("button",{onClick:c,className:"normal-button"},"LOG OUT")))},O=function(){var e=Object(a.useState)(null),t=Object(p.a)(e,2),n=t[0],u=t[1],c=Object(a.useState)(""),o=Object(p.a)(c,2),m=o[0],f=o[1],h=Object(a.useState)(""),v=Object(p.a)(h,2),E=v[0],O=v[1],k=Object(a.useState)(null),j=Object(p.a)(k,2),y=j[0],N=j[1],S=Object(a.useState)(""),P=Object(p.a)(S,2),C=P[0],U=P[1],B=Object(a.useState)(""),G=Object(p.a)(B,2),I=G[0],L=G[1];Object(a.useEffect)((function(){var e=window.localStorage.getItem("loggedButtonGameUser");if(e){var t=JSON.parse(e);u(t),N(t.points),L(""),q()}}),[]);var J=function(){var e=Object(i.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,d.login({username:m,password:E});case 4:n=e.sent,Y(n),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),a=e.t0.response.data.error,H(a);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),T=function(){var e=Object(i.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,b.signup({username:m,password:E});case 4:n=e.sent,Y(n),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),a=e.t0.response.data.error,H(a);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),Y=function(e){window.localStorage.setItem("loggedButtonGameUser",JSON.stringify(e)),u(e),N(e.points),q(),f(""),O(""),L("")},A=function(){var e=Object(i.a)(l.a.mark((function e(t){var n,a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.getButton();case 2:return n=e.sent,a=n.pushCount,y>0&&(a+=1),r=Object(s.a)({},n,{pushCount:a}),e.next=8,w.increment(n.id,r);case 8:return e.next=10,D();case 10:q();case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(){var e=Object(i.a)(l.a.mark((function e(){var t,a,r,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.parse(window.localStorage.getItem("loggedButtonGameUser")),a=Object(s.a)({},t,{points:t.points<1?0:t.points-1}),r=a.points,N(r),e.next=6,w.getPushCount();case 6:if((u=e.sent)%500===0?(r+=250,H("250 points rewarded!")):u%100===0?(r+=40,H("40 points rewarded!")):u%10===0&&(r+=5,H("5 points rewarded!")),!(r<1)){e.next=15;break}if(!window.confirm("No more points. Start again with 20 points?")){e.next=13;break}r=20,e.next=15;break;case 13:return F(),e.abrupt("return");case 15:return a.points=r,N(a.points),e.next=19,b.updateUserPoints(n.id,a);case 19:window.localStorage.setItem("loggedButtonGameUser",JSON.stringify(a));case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=function(){u(null),localStorage.clear(),H("Thanks for playing!")},q=function(){var e=Object(i.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.getPushCount();case 2:t=e.sent,U(10-t%10);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),H=function(e){L(e),setTimeout((function(){L("")}),5e3)};return r.a.createElement("div",{className:"main-content"},r.a.createElement("h1",null,"Button ",r.a.createElement("br",null),"the Game"),r.a.createElement("div",null,null===n?r.a.createElement(g,{handleSubmit:J,handleUsernameChange:function(e){var t=e.target;return f(t.value)},handlePasswordChange:function(e){var t=e.target;return O(t.value)},username:m,password:E,handleLogin:J,handleSignUp:T,notification:I}):r.a.createElement(x,{handleButtonPush:A,userPoints:y,rewardCounter:C,notification:I,handleLogout:F})))};n(40);c.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.a5e0d336.chunk.js.map