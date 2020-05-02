(this["webpackJsonptravel-history-parser"]=this["webpackJsonptravel-history-parser"]||[]).push([[0],{462:function(e,t,a){},499:function(e,t,a){e.exports=a(765)},589:function(e,t,a){},700:function(e,t,a){},765:function(e,t,a){"use strict";a.r(t);var n=a(111),r=a(112),l=a(64),o=a(115),i=a(114),c=a(0),s=a.n(c),u=a(17),d=a.n(u),m=a(32),h=a.n(m),p=a(131),f=a(768),E=a(772),g=a(801),b=a(804),w=a(805),v=a(790),y=a(55),C=a(469),S=a.n(C),k=a(265),O=a.n(k),D=a(264),j=a.n(D),W=(a(589),a(492)),R=a(316),x=a(22),I=a(793),T=a(794),P=a(244),M=a(791),A=a(340),N=a(806),F=a(792),U=a(315);function Y(e){var t=e.children,a=e.value,n=e.index,r=Object(W.a)(e,["children","value","index"]);return s.a.createElement(y.a,Object.assign({component:"div",role:"tabpanel",hidden:a!==n,id:"scrollable-force-tabpanel-".concat(n),"aria-labelledby":"scrollable-force-tab-".concat(n)},r),a===n&&s.a.createElement(U.a,{p:3},t))}function H(e){return{id:"scrollable-force-tab-".concat(e),"aria-controls":"scrollable-force-tabpanel-".concat(e)}}var z=function(e){Object(o.a)(a,e);var t=Object(i.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={tabValue:0},r.handleTabChange=r.handleTabChange.bind(Object(l.a)(r)),r.selectYear=r.selectYear.bind(Object(l.a)(r)),r}return Object(r.a)(a,[{key:"handleTabChange",value:function(e,t){this.setState({tabValue:t})}},{key:"selectYear",value:function(e){this.props.handleWindowStartChange(h()(new Date("01/01/"+e.getFullYear()))),this.props.handleWindowStopChange(h()(new Date("12/31/"+e.getFullYear())))}},{key:"render",value:function(){var e=this,t=this.props;return s.a.createElement(v.a,{item:!0,xs:12},s.a.createElement(x.a,{utils:P.default},s.a.createElement(M.a,{position:"static"},s.a.createElement(A.a,null,s.a.createElement(y.a,{variant:"h6",className:t.title},s.a.createElement("span",{role:"img","aria-label":"tooltip-calendar-title"},"\ud83d\udcc5")," Select counting period")),s.a.createElement(N.a,{value:this.state.tabValue,onChange:this.handleTabChange,"aria-label":"Counting period"},s.a.createElement(F.a,Object.assign({label:"Custom dates"},H(0))),s.a.createElement(F.a,Object.assign({label:"One Year"},H(1))),s.a.createElement(F.a,Object.assign({label:"Whole travel history"},H(2))))),s.a.createElement(I.a,{className:t.root},s.a.createElement(T.a,null,s.a.createElement(Y,{value:this.state.tabValue,index:0},s.a.createElement(y.a,{className:t.title,component:"h1"},"Count travel days on a specific period"),s.a.createElement(R.a,{variant:"dialog",id:"dateWindowStart",label:"From",format:"yyyy-MM-dd",value:this.props.dateWindowStart,onChange:function(t){return e.props.handleWindowStartChange(h()(t))}}),s.a.createElement(R.a,{variant:"dialog",id:"dateWindowStop",label:"To",format:"yyyy-MM-dd",value:this.props.dateWindowStop,onChange:function(t){return e.props.handleWindowStopChange(h()(t))}}),s.a.createElement(y.a,{component:"p",color:"textSecondary"},"The total of days will be counted between the given dates.")),s.a.createElement(Y,{value:this.state.tabValue,index:1},s.a.createElement(y.a,{className:t.title,component:"h1"},"Count travel days in a full year"),s.a.createElement(R.a,{views:["year"],label:"Year long period",value:this.props.dateWindowStart,onChange:this.selectYear}),s.a.createElement(y.a,{component:"p",color:"textSecondary"},"The total of days will be counted for the given year.")),s.a.createElement(Y,{value:this.state.tabValue,index:2},s.a.createElement(U.a,null,s.a.createElement(p.a,{onClick:this.props.fitDateWindow,variant:"contained",color:"primary",size:"medium"},"Select whole travel history")),s.a.createElement(y.a,{component:"p",color:"textSecondary"},"The total of days will be counted for the whole travel history list."))))))}}]),a}(s.a.Component),V=a(471),B=a.n(V),L=(a(700),a(778)),J=a(796),_=a(780),q=a(795),G=a(472),$=a.n(G),K=a(474),Q=a.n(K),X=a(473),Z=a.n(X),ee=a(262),te=a.n(ee),ae=a(466),ne=a(442),re=a(443),le=a(445),oe=a(797),ie=a(444),ce=a(129),se=a(352),ue=2,de=1;function me(e){var t=Array.from(e);return t.sort((function(e,t){return h()(e.date)-h()(t.date)})),t}function he(e){var t=e.filter((function(e){return e.group===de}));return t.length<1?0:t.map((function(e){return e.durationDateWindow})).reduce((function(e,t){return e+t}),0)}function pe(e){if(void 0!==e)return new h.a(e)}function fe(e){return h()(e).format("YYYY-MM-DD")}function Ee(e,t,a,n){var r=pe(e),l=pe(t),o=pe(a),i=pe(n);return void 0===a||void 0===n?Math.abs(l.diff(r,"days"))+1:r>=i||l<=o?0:h.a.min(i,l).diff(h.a.max(o,r),"days")+1}var ge=Object(se.a)((function(){return{chip:{margin:"0px 5px 0px 5px"},errorMessage:{fontSize:"0.8rem"}}}));function be(e,t){return s.a.createElement(ae.a,{icon:"DEP"===e.type?s.a.createElement(Z.a,null):s.a.createElement(te.a,null),className:t?t.chip:"",label:"".concat(fe(e.date)," : ").concat(e.location)})}function we(e,t){return s.a.createElement(L.a,{variant:"body2"},e.map((function(e,a){return function(e,t,a){var n=s.a.createElement(y.a,{className:a.errorMessage,color:"textPrimary",gutterBottom:!0},"and");return s.a.createElement(_.a,{key:t},s.a.createElement(q.a,null,s.a.createElement(Q.a,null)),s.a.createElement($.a,{separator:n},e.travelChecks.map((function(e){return be(e,a)}))),s.a.createElement(y.a,{className:a.errorMessage,color:"textPrimary",gutterBottom:!0},e.message))}(e,a,t)})),s.a.createElement(J.a,null))}function ve(e){var t=ge(e);return void 0===e.errors||e.errors.length<1?"":s.a.createElement(v.a,{item:!0,xs:12},s.a.createElement(U.a,null,s.a.createElement(M.a,{position:"static"},s.a.createElement(A.a,null,s.a.createElement(y.a,{variant:"h6",className:t.title},"Errors"))),s.a.createElement(I.a,{className:t.root},we(e.errors,t))))}function ye(e){var t=ge(e),a=s.a.createElement(T.a,null,s.a.createElement(oe.a,{component:ce.a},s.a.createElement(ne.a,{className:t.table,"aria-label":"simple table"},s.a.createElement(re.a,null,s.a.createElement(ie.a,{key:"inside-count"},s.a.createElement(le.a,{component:"th",scope:"row"},"Total days inside the US:"),s.a.createElement(le.a,null),s.a.createElement(le.a,{align:"right"},e.totalDaysInside)),s.a.createElement(ie.a,{key:"outside-count"},s.a.createElement(le.a,{component:"th",scope:"row"},"Total days outside the US:"),s.a.createElement(le.a,null),s.a.createElement(le.a,{align:"right"},e.totalDaysOutside)),s.a.createElement(ie.a,{key:"window-count"},s.a.createElement(le.a,{component:"th",scope:"row"},"Total days in window:"),s.a.createElement(le.a,null),s.a.createElement(le.a,{align:"right"},e.totalDaysWindow)),s.a.createElement(ie.a,{key:"window-period"},s.a.createElement(le.a,{component:"th",scope:"row"},"Selected period"),s.a.createElement(le.a,{align:"left"},"From ",fe(e.dateWindowStart)),s.a.createElement(le.a,{align:"left"},"To ",fe(e.dateWindowStop)))))));return e.totalErrors>0&&(a=s.a.createElement(T.a,null,s.a.createElement(y.a,{className:t.title,color:"textSecondary",gutterBottom:!0},"Unable to calculate a result, please fix the ",e.totalErrors," errors and try again."))),s.a.createElement(v.a,{item:!0,xs:12},s.a.createElement(U.a,null,s.a.createElement(M.a,{position:"static"},s.a.createElement(A.a,null,s.a.createElement(y.a,{variant:"h6",className:t.title},s.a.createElement("span",{role:"img","aria-label":"tooltip-calc-title"},"\ud83e\uddee")," Results"))),s.a.createElement(I.a,{className:t.root},a)))}var Ce=function(e){Object(o.a)(a,e);var t=Object(i.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).timelineRef=s.a.createRef(),r}return Object(r.a)(a,[{key:"componentDidUpdate",value:function(){this.timelineRef.current&&this.timelineRef.current.$el.fit()}},{key:"render",value:function(){var e=this,t=this.props,a={width:"100%",stack:!0,showMajorLabels:!0,showCurrentTime:!1,zoomMin:1e6,type:"background",format:{minorLabels:{minute:"h:mma",hour:"ha"}},template:function(e,t,a){return void 0===e.travelCheck?"background"===e.type?"Selected period":"From ".concat(fe(a.start)," to ").concat(fe(a.end)):d.a.createPortal(d.a.render(s.a.createElement("div",null,be(e.travelCheck)),t),t,(function(){window.timeline.redraw()}))}},n={id:this.props.travels.length+1,type:"background",start:this.props.dateWindowStart,end:this.props.dateWindowStop,content:""},r=this.props.travelChecks.map((function(t,a){return{id:e.props.travels.length+a+2,type:"point",title:"".concat(t.type," ").concat(t.location," : ").concat(t.date),content:"".concat(t.location," : ").concat(t.date),start:t.date,group:3,travelCheck:t}}));return s.a.createElement(v.a,{item:!0,xs:12},s.a.createElement(M.a,{position:"static"},s.a.createElement(A.a,null,s.a.createElement(y.a,{variant:"h6",className:t.title},s.a.createElement("span",{role:"img","aria-label":"tooltip-graph-title"},"\ud83d\udcca")," Timeline"))),s.a.createElement(B.a,{options:a,ref:this.timelineRef,groups:[{id:2,content:"Outside the US"},{id:1,content:"Inside the US"},{id:3,content:"Checks"}],items:this.props.travels.concat(r).concat(n)}))}}]),a}(s.a.PureComponent),Se=a(475),ke=a.n(Se),Oe=a(481),De=a.n(Oe),je=a(347),We=a.n(je),Re=a(346),xe=a.n(Re),Ie=a(476),Te=a.n(Ie),Pe=a(478),Me=a.n(Pe),Ae=a(479),Ne=a.n(Ae),Fe=a(480),Ue=a.n(Fe),Ye=a(483),He=a.n(Ye),ze=a(477),Ve=a.n(ze),Be=a(482),Le=a.n(Be),Je=a(484),_e=a.n(Je),qe={Add:Object(c.forwardRef)((function(e,t){return s.a.createElement(j.a,Object.assign({},e,{ref:t}))})),Check:Object(c.forwardRef)((function(e,t){return s.a.createElement(ke.a,Object.assign({},e,{ref:t}))})),Clear:Object(c.forwardRef)((function(e,t){return s.a.createElement(xe.a,Object.assign({},e,{ref:t}))})),Delete:Object(c.forwardRef)((function(e,t){return s.a.createElement(O.a,Object.assign({},e,{ref:t}))})),DetailPanel:Object(c.forwardRef)((function(e,t){return s.a.createElement(We.a,Object.assign({},e,{ref:t}))})),Edit:Object(c.forwardRef)((function(e,t){return s.a.createElement(Te.a,Object.assign({},e,{ref:t}))})),Export:Object(c.forwardRef)((function(e,t){return s.a.createElement(Ve.a,Object.assign({},e,{ref:t}))})),Filter:Object(c.forwardRef)((function(e,t){return s.a.createElement(Me.a,Object.assign({},e,{ref:t}))})),FirstPage:Object(c.forwardRef)((function(e,t){return s.a.createElement(Ne.a,Object.assign({},e,{ref:t}))})),LastPage:Object(c.forwardRef)((function(e,t){return s.a.createElement(Ue.a,Object.assign({},e,{ref:t}))})),NextPage:Object(c.forwardRef)((function(e,t){return s.a.createElement(We.a,Object.assign({},e,{ref:t}))})),PreviousPage:Object(c.forwardRef)((function(e,t){return s.a.createElement(De.a,Object.assign({},e,{ref:t}))})),ResetSearch:Object(c.forwardRef)((function(e,t){return s.a.createElement(xe.a,Object.assign({},e,{ref:t}))})),Search:Object(c.forwardRef)((function(e,t){return s.a.createElement(Le.a,Object.assign({},e,{ref:t}))})),SortArrow:Object(c.forwardRef)((function(e,t){return s.a.createElement(te.a,Object.assign({},e,{ref:t}))})),ThirdStateCheck:Object(c.forwardRef)((function(e,t){return s.a.createElement(He.a,Object.assign({},e,{ref:t}))})),ViewColumn:Object(c.forwardRef)((function(e,t){return s.a.createElement(_e.a,Object.assign({},e,{ref:t}))}))},Ge=a(485),$e=a.n(Ge),Ke=(a(462),Object(se.a)({blueBackground:{background:"linear-gradient(45deg, #3f51b5 30%, #3f51b5 90%)",border:0,borderRadius:0,boxShadow:"0 3px 5px 2px rgba(255, 105, 135, .3)",color:"white",height:48,padding:"0 30px",alignItems:"center"}}));function Qe(e){var t=Ke(e);return s.a.createElement(v.a,{item:!0,xs:12},s.a.createElement(I.a,null,s.a.createElement($e.a,{icons:qe,columns:[{title:"Date",field:"date",type:"date",filtering:!1,render:function(e){return fe(e.date)}},{title:"Location",field:"location",filtering:!1},{title:"Type",field:"type",lookup:{DEP:"Departure",ARR:"Arrival"}}],data:e.travelChecks,title:"\ud83d\udd8b\ufe0f Travel checks list",style:{classes:t},options:{search:!1,exportButton:!0,searchFieldStyle:{backgroundColor:"#01579b",color:"#FFF"},rowStyle:function(e){return{backgroundColor:e.tableData.id%2?"#EEE":"#FFF"}}},editable:{onRowAdd:function(t){return new Promise((function(a){setTimeout((function(){e.updateTravelChecks(e.travelChecks.concat(t)),a()}),1e3)}))},onRowUpdate:function(t,a){return new Promise((function(n){setTimeout((function(){var r=e.travelChecks.concat(),l=r.indexOf(a);r[l]=t,e.updateTravelChecks(r),n()}),1e3)}))},onRowDelete:function(t){return new Promise((function(a){setTimeout((function(){var n=e.travelChecks.concat(),r=n.indexOf(t);n.splice(r,1),e.updateTravelChecks(n),a()}),1e3)}))}}})))}var Xe=a(771),Ze=a(258),et=a(448),tt=a(345),at=function(e){Object(o.a)(a,e);var t=Object(i.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this;return s.a.createElement(f.a,{open:this.props.showModal,onClose:this.props.hideModalHandler,"aria-labelledby":"form-dialog-title"},s.a.createElement(g.a,{id:"form-dialog-title"},"Import raw data"),s.a.createElement(Xe.a,null,s.a.createElement(v.a,{container:!0},s.a.createElement(v.a,{item:!0,xs:12},s.a.createElement(y.a,{component:"p",color:"textSecondary"},"Copy and paste your travel data in the input field, select the corresponding import format and press Import.",s.a.createElement("br",null),"Nothing about you or any travel history is collected and sent anywhere: privacy is guaranteed.")),s.a.createElement(v.a,{item:!0,xs:8},s.a.createElement(Ze.a,{autoFocus:!0,margin:"dense",id:"standard-multiline-flexible",label:"Paste input data here:",multiline:!0,rows:10,fullWidth:!0,name:"rawInput",size:"small",value:this.props.newRawInput,onChange:this.props.handleNewRawInput})),s.a.createElement(v.a,{item:!0,container:!0,xs:4},s.a.createElement(v.a,{item:!0,xs:12},s.a.createElement(y.a,{id:"discrete-slider-small-steps",gutterBottom:!0},"Select the import format:"),s.a.createElement(tt.a,{value:this.props.processingFunction,onChange:this.props.handleProcessingFunctionChange},s.a.createElement(et.a,{value:"i94"},"I94 website format"),s.a.createElement(et.a,{value:"tabular"},"Tabular copy paste format"))),s.a.createElement(v.a,{item:!0},s.a.createElement(y.a,{component:"p"},this.props.processingFunctionInfo)),s.a.createElement(v.a,{item:!0},s.a.createElement(p.a,{onClick:function(t){e.props.hideModalHandler(),e.props.handleProcessNewRawInput(t)},variant:"contained",color:"primary",size:"large"},"Import"))))),s.a.createElement(E.a,null))}}]),a}(s.a.PureComponent),nt=a(350),rt=a(807),lt=a(803),ot=a(802),it=a(491),ct=a.n(it),st=a(800);function ut(e){var t=s.a.useState(!1),a=Object(nt.a)(t,2),n=a[0],r=a[1],l=s.a.useState("paper"),o=Object(nt.a)(l,2)[1],i=function(e){return function(){r(!0),o(e)}};return s.a.createElement(v.a,{item:!0,xs:12},s.a.createElement(rt.a,null,s.a.createElement(lt.a,{expandIcon:s.a.createElement(ct.a,null),"aria-controls":"panel1a-content",id:"panel1a-header"},s.a.createElement(y.a,{variant:"h6",color:"primary"},"How to use ?")),s.a.createElement(ot.a,null,s.a.createElement(y.a,{component:"p",color:"textPrimary"},s.a.createElement("span",{role:"img","aria-label":"tooltip-pen"},"\ud83d\udd8b\ufe0f")," Import some I94 travel history data, or manually create some entries below.",s.a.createElement("br",null),s.a.createElement("span",{role:"img","aria-label":"tooltip-calendar"},"\ud83d\udcc5")," Select a counting period",s.a.createElement("br",null),s.a.createElement("span",{role:"img","aria-label":"tooltip-graph"},"\ud83d\udcca")," Check your travel history using the timeline ",s.a.createElement("br",null),s.a.createElement("span",{role:"img","aria-label":"tooltip-calc"},"\ud83e\uddee")," Get the count of days from the results tab",s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement(p.a,{size:"small",color:"primary",variant:"contained",onClick:i("paper")},"More information")))),s.a.createElement(dt,{handleClickOpen:i,handleClose:function(){r(!1)},open:n}))}function dt(e){var t=s.a.useRef(null);return s.a.useEffect((function(){if(e.open){var a=t.current;null!==a&&a.focus()}}),[e.open]),s.a.createElement("div",null,s.a.createElement(f.a,{open:e.open,onClose:e.handleClose,scroll:e.scroll,"aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description"},s.a.createElement(g.a,{id:"scroll-dialog-title"},"Additional Information"),s.a.createElement(Xe.a,{dividers:"paper"===e.scroll},s.a.createElement(st.a,{id:"scroll-dialog-description",ref:t,tabIndex:-1},s.a.createElement(y.a,{variant:"h6",color:"textPrimary"},"What is this?"),s.a.createElement(y.a,{variant:"p"},"This tool has been created to help US Non Residents to fill their paperwork: the US administration sometimes require a calculation of the total amount of days spent on US soil. This can be long and difficult to do, especially if you travel a lot.",s.a.createElement("br",null),s.a.createElement("br",null),'With this tool, you can directly copy and paste your travel history in the "Import data" tool to get a visualization of your travel history, as well as the calculations needed for your paperwork on a selected time period.',s.a.createElement("br",null),s.a.createElement("br",null)),s.a.createElement(y.a,{variant:"h6",color:"textPrimary"},"What about my privacy?"),s.a.createElement(y.a,{variant:"p"},"Just like a calculator, this tool is a standalone app: it doesn't communicate any information you fill in.",s.a.createElement("br",null),s.a.createElement("br",null)),s.a.createElement(y.a,{variant:"h6",color:"textPrimary"},"How are days counted?"),s.a.createElement(y.a,{variant:"p"},"In most cases the US immigration counts the travel days as days ",s.a.createElement("b",null,"inside the US"),".",s.a.createElement("br",null),s.a.createElement("br",null),s.a.createElement("b",null,"Example:"),s.a.createElement("br",null),"Let's say you want to count your travel days in ",s.a.createElement("b",null,"2017"),". The only trip you had was in Mexico on April 1st 2017, and you came back April 5th 2017. ",s.a.createElement("br",null)," ",s.a.createElement("br",null),"This shows up in your I94 with the following travel checks: ",s.a.createElement("br",null)," ",be({date:h()("2017-04-01"),location:"MIA",type:"DEP"}),"(Departure) and ",be({date:h()("2017-04-05"),location:"MIA",type:"ARR"})," (Arrival)",s.a.createElement("br",null),s.a.createElement("br",null),"The total count of days outside the US in 2017 is 3 days: ",s.a.createElement("b",null,"you were traveling")," for 2 days ",s.a.createElement("b",null,"and outside")," the US for 3 days.",s.a.createElement("br",null),"The total count of days inside the US in 2017 is 362 days: ",s.a.createElement("b",null,"you were traveling")," for 2 days ",s.a.createElement("b",null,"and inside")," the US during 360 days.",s.a.createElement("br",null),"You may check your result with 3 + 362 = 365, there are 365 days in 2017.",s.a.createElement("br",null),s.a.createElement("br",null)),s.a.createElement(y.a,{variant:"h6",color:"textPrimary"},"Something does not work !"),s.a.createElement(y.a,{variant:"p"},"You are more than welcome to report any issue on the ",s.a.createElement("a",{href:"https://github.com/mxm-tr/travel_history_parser"},"github account of the app"),".",s.a.createElement("br",null)))),s.a.createElement(E.a,null,s.a.createElement(p.a,{onClick:e.handleClose,color:"primary"},"Close"))))}var mt={i94:s.a.createElement("span",null," Copy and paste data from the table on the",s.a.createElement("a",{href:"https://i94.cbp.dhs.gov/I94/#/history-search"}," official i94 website ")),tabular:s.a.createElement("span",null," Copy and paste data from a CSV table you have exported using this tool ")},ht=function(e){Object(o.a)(a,e);var t=Object(i.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).showModalHandler=function(){r.setState({showModal:!0})},r.hideModalHandler=function(){r.setState({showModal:!1})},r.state={showModal:!1,newTravelChecksCount:0,showImportingDataMessage:!1,showClearAllDialog:!1,showDataImportedMessage:!1,showNoDataImportedMessage:!1,travelChecks:[],newRawInput:"poop",processingFunction:"i94",dateWindowStart:new h.a,dateWindowStop:new h.a},r.handleNewRawInput=r.handleNewRawInput.bind(Object(l.a)(r)),r.handleProcessingFunctionChange=r.handleProcessingFunctionChange.bind(Object(l.a)(r)),r.handleProcessNewRawInput=r.handleProcessNewRawInput.bind(Object(l.a)(r)),r.updateTravelChecks=r.updateTravelChecks.bind(Object(l.a)(r)),r.handleWindowStartChange=r.handleWindowStartChange.bind(Object(l.a)(r)),r.handleWindowStopChange=r.handleWindowStopChange.bind(Object(l.a)(r)),r.fitDateWindow=r.fitDateWindow.bind(Object(l.a)(r)),r}return Object(r.a)(a,[{key:"handleProcessingFunctionChange",value:function(e){this.setState({processingFunction:e.target.value})}},{key:"handleNewRawInput",value:function(e){this.setState({newRawInput:e.target.value})}},{key:"handleProcessNewRawInput",value:function(e){this.setState({showImportingDataMessage:!0});var t=function(e,t){var a,n=[],r=[];switch(t){case"i94":(r=e.match(/((\S+){3})/g)).splice(r.indexOf("Date"),1),r.splice(r.indexOf("Type"),1),r.splice(r.indexOf("Location"),1);for(;r.length>0;)n.push({location:r.pop(),type:(a=r.pop(),"Departure"===a?"DEP":"Arrival"===a?"ARR":null),date:r.pop()});break;case"tabular":(r=e.match(/[\S ]+/g).map((function(e){return e.trim()})).filter((function(e){return e.length>0}))).splice(r.indexOf("Date"),1),r.splice(r.indexOf("Type"),1),r.splice(r.indexOf("Location"),1);for(var l=function(e){return"Departure"===e?"DEP":"Arrival"===e?"ARR":null};r.length>0;)n.push({type:l(r.pop()),location:r.pop(),date:r.pop()});break;default:console.error("No processing function found.")}return(n=n.filter((function(e){return("DEP"===e.type||"ARR"===e.type)&h()(e.date).isValid()}))).map((function(e){return{date:fe(h()(e.date)),location:e.location,type:e.type}}))}(this.state.newRawInput,this.state.processingFunction);t.length>0?this.setState({newTravelChecksCount:t.length,showDataImportedMessage:!0}):this.setState({showNoDataImportedMessage:!0}),this.updateTravelChecks(this.state.travelChecks.concat(t)),e.preventDefault()}},{key:"fitDateWindow",value:function(){this.setState({dateWindowStart:this.state.travelChecks[0].date,dateWindowStop:this.state.travelChecks[this.state.travelChecks.length-1].date})}},{key:"handleWindowStartChange",value:function(e){this.setState({dateWindowStart:null===e?this.state.travelChecks[0].date:e}),this.updateTravels()}},{key:"handleWindowStopChange",value:function(e){this.setState({dateWindowStop:null===e?this.state.travelChecks[this.state.travelChecks.length-1].date:e}),this.updateTravels()}},{key:"updateTravelChecks",value:function(e){if(!(e.length<1)){var t=me(e);this.setState({dateWindowStart:t[0].date,dateWindowStop:t[t.length-1].date,travelChecks:t}),this.updateTravels()}}},{key:"computeTravelsWithMessage",value:function(){return function(e,t,a){if(e.length<1)return{travels:[],message:"No travel checks yet"};var n=me(e).reverse(),r=[];new Date(a)>new Date(n[0].date)&&n.unshift({location:"DEP"===n[0].type?"USA":"Abroad",type:"DEP"===n[0].type?"ARR":"DEP",date:a,isAdditionalDateWindowStopCheck:!0}),new Date(t)<new Date(n[n.length-1].date)&&n.push({location:"DEP"===n[n.length-1].type?"USA":"Abroad",type:"DEP"===n[n.length-1].type?"ARR":"DEP",date:t,isAdditionalDateWindowStartCheck:!0});for(var l,o,i,c,s,u={},d=0,m=[];n.length>1;)l=n.pop(0),o=n[n.length-1],c=Ee(l.date,o.date,t,a),s=Ee(l.date,o.date),i="From ".concat(l.location," to ").concat(o.location,": ").concat(c," days"),s-c>0&&(i="".concat(i," (").concat(s-c," days outside selected period)")),u={id:d,type:"range",title:i,content:"From ".concat(l.location," to ").concat(o.location,": ").concat(c," days"),start:l.date,end:o.date,duration:s,durationDateWindow:c},"DEP"===l.type&&"ARR"===o.type?(d++,u.group=ue,r.push(u)):"ARR"===l.type&&"DEP"===o.type?(d++,u.group=de,r.push(u)):m.push({travelChecks:[l,o],message:"should be consecutive Arrivals and Departures"});return{travels:r,errors:m}}(this.state.travelChecks,this.state.dateWindowStart,this.state.dateWindowStop)}},{key:"computeTravels",value:function(){return this.computeTravelsWithMessage().travels}},{key:"updateTravels",value:function(){var e=this.computeTravelsWithMessage();this.setState({travels:e.travels,travelsParserErrors:e.errors})}},{key:"render",value:function(){var e=this;return s.a.createElement(S.a,null,s.a.createElement(v.a,{container:!0,justify:"center",alignItems:"center"},s.a.createElement(b.a,{open:this.state.showImportingDataMessage,onClose:function(){return e.setState({showImportingDataMessage:!1})},autoHideDuration:2e3},s.a.createElement(w.a,{color:"info"},"Importing Data")),s.a.createElement(b.a,{open:this.state.showDataImportedMessage,onClose:function(){return e.setState({showDataImportedMessage:!1})},autoHideDuration:2e3},s.a.createElement(w.a,{color:"success"},this.state.newTravelChecksCount," new lines imported !")),s.a.createElement(b.a,{open:this.state.showNoDataImportedMessage,onClose:function(){return e.setState({showNoDataImportedMessage:!1})},autoHideDuration:5e3},s.a.createElement(w.a,{color:"error"},"No data imported, check your input and make sure you selected the right processing function.")),s.a.createElement(f.a,{onClose:function(){return e.setState({showClearAllDialog:!1})},"aria-labelledby":"simple-dialog-title",open:this.state.showClearAllDialog},s.a.createElement(g.a,{id:"simple-dialog-title"},"Clear all data"),s.a.createElement(E.a,null,s.a.createElement(p.a,{onClick:function(){return e.setState({travelChecks:[],showClearAllDialog:!1})},color:"primary"},"Delete all"),s.a.createElement(p.a,{onClick:function(){return e.setState({showClearAllDialog:!1})},color:"primary",autoFocus:!0},"Cancel"))),s.a.createElement(at,{showModal:this.state.showModal,hideModalHandler:this.hideModalHandler,handleNewRawInput:this.handleNewRawInput,handleProcessNewRawInput:this.handleProcessNewRawInput,processingFunction:this.state.processingFunction,processingFunctionInfo:mt[this.state.processingFunction],handleProcessingFunctionChange:this.handleProcessingFunctionChange}),s.a.createElement(v.a,{container:!0,item:!0,xs:10,spacing:3,direction:"row",alignItems:"center",justify:"center"},s.a.createElement(v.a,{container:!0,item:!0,xs:12,ver:!0,spacing:0,direction:"row",alignItems:"center",justify:"space-between"},s.a.createElement(v.a,{item:!0,xs:6},s.a.createElement(y.a,{component:"h4",variant:"h5",color:"inherit",noWrap:!0},s.a.createElement("span",{role:"img","aria-label":"airplane"},"\u2708\ufe0f")," US Travel History Calculator")),s.a.createElement(v.a,{item:!0},s.a.createElement(p.a,{onClick:this.showModalHandler,variant:"contained",color:"primary",size:"large",startIcon:s.a.createElement(j.a,null)},"Import Data")),s.a.createElement(v.a,{item:!0},s.a.createElement(p.a,{onClick:function(){return e.setState({showClearAllDialog:!0})},variant:"contained",color:"secondary",size:"large",startIcon:s.a.createElement(O.a,null)},"Clear All Data"))),s.a.createElement(v.a,{container:!0,item:!0,spacing:3,justify:"center",alignItems:"flex-start"},s.a.createElement(v.a,{container:!0,item:!0,xs:7,direction:"column",spacing:2},s.a.createElement(ut,null),s.a.createElement(Qe,{travelChecks:this.state.travelChecks,updateTravelChecks:this.updateTravelChecks}),s.a.createElement(ve,{errors:this.state.travelsParserErrors}),s.a.createElement(Ce,{travels:this.computeTravels(),travelChecks:this.state.travelChecks,dateWindowStart:this.state.dateWindowStart,dateWindowStop:this.state.dateWindowStop}),"                "),s.a.createElement(v.a,{container:!0,item:!0,xs:5,direction:"column",spacing:2},s.a.createElement(z,{dateWindowStart:this.state.dateWindowStart,dateWindowStop:this.state.dateWindowStop,handleWindowStartChange:this.handleWindowStartChange,handleWindowStopChange:this.handleWindowStopChange,fitDateWindow:this.fitDateWindow}),s.a.createElement(ye,{dateWindowStart:this.state.dateWindowStart,dateWindowStop:this.state.dateWindowStop,totalDaysInside:he(this.computeTravels()),totalDaysOutside:Ee(this.state.dateWindowStart,this.state.dateWindowStop)-he(this.computeTravels()),totalDaysWindow:Ee(this.state.dateWindowStart,this.state.dateWindowStop),totalErrors:void 0===this.state.travelsParserErrors?0:this.state.travelsParserErrors.length}))))))}}]),a}(s.a.Component);d.a.render(s.a.createElement("div",null,s.a.createElement(ht,{name:"Travel checks list"})),document.getElementById("root"))}},[[499,1,2]]]);
//# sourceMappingURL=main.1b93b1ff.chunk.js.map