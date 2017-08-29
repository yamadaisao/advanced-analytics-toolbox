"use strict";define(["../chart/tree_chart","../../vendor/d3.min","../util/utils","ng!$q"],function(e,a,t,r){return{createCube:function(e,a){var r=a.layout,i=t.validateDimension(r.props.dimensions[0]),s=[{qDef:{qFieldDefs:[i]}}],n=r.props.measures.length,l=t.validateMeasure(r.props.measures[0])+" as mea0, "+t.validateMeasure(r.props.measures[1])+" as mea1",p="mea0 ~ mea1",d="SS";a.paramNames=["mea0","mea1"],a.measureLabels=[r.props.measures[0].label,r.props.measures[1].label];for(var o=2;o<n;o++){var m=t.validateMeasure(r.props.measures[o]);if(m.length>0){var q=","+m+" as mea"+o;l+=q,p+=" + mea"+o,d+="S",a.paramNames.push("mea"+o),a.measureLabels.push(r.props.measures[o].label)}}var c="training_data<-q;";if(r.props.splitDataset){for(var u="splitPercentage<-min(max(0.01, "+r.props.splitPercentageForDecisionTree+"), 0.99); data_end<-length(q$mea0); data_mid<-floor(data_end * splitPercentage); training_data<-list(mea0=q$mea0[1:data_mid]",f="test_data<-list(mea0=q$mea0[(data_mid + 1):data_end]",h=1;h<n;h++)u+=",mea"+h+"=q$mea"+h+"[1:data_mid]",f+=",mea"+h+"=q$mea"+h+"[(data_mid + 1):data_end]";u+=");",f+=");",c=u+f}var v=[{qDef:{qDef:"R.ScriptEvalExStr('"+d+"','library(rpart);library(partykit);library(d3r);library(jsonlite);\n                    q<-lapply(q, function(x){ ifelse(!is.na(as.numeric(x)), as.numeric(x), x) }); "+c+"\n                    res<-rpart("+p+', data=training_data, method="'+r.props.rpartMethod+'", control=list(minsplit='+r.props.minSplit+", minbucket="+r.props.minBucket+", cp="+r.props.cp+", maxdepth="+r.props.maxDepth+'));\n                    pa<-partykit::as.party(res); if(length(pa) > 0) {node<-d3_party(res);} else {node <- c("root");}\n                    json<-toJSON(list(levels(factor(training_data$mea0)),node)); json;\','+l+")"}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}},{qDef:{qLabel:"-",qDef:""}}];return a.backendApi.applyPatches([{qPath:"/qHyperCubeDef/qDimensions",qOp:"replace",qValue:JSON.stringify(s)},{qPath:"/qHyperCubeDef/qMeasures",qOp:"replace",qValue:JSON.stringify(v)}],!1),a.patchApplied=!0,null},drawChart:function(a,i){var s=r.defer(),n=a.layout,l=(t.validateDimension(n.props.dimensions[0]),[{qTop:0,qLeft:0,qWidth:6,qHeight:1}]);return a.backendApi.getData(l).then(function(r){if(console.log(r[0].qMatrix),0===r[0].qMatrix[0][1].qText.length||"-"==r[0].qMatrix[0][1].qText)t.displayConnectionError(a.extId);else{var n=JSON.parse(r[0].qMatrix[0][1].qText);if("root"==n[1][0])$(".advanced-analytics-toolsets-"+a.extId).html('<div id="aat-chart-'+a.extId+'" style="width:100%;height:100%;">\n              <p style="width:100%;text-align:center;position:relative;top:50%;transform:translateY(-50%);">Only root node is returned. Add predictor variables to grow the decision tree.\n              </div>');else{a.levelsList=n[0];var l=JSON.parse(n[1]);$(".advanced-analytics-toolsets-"+a.extId).html('<div id="aat-chart-'+a.extId+'" style="width:100%;height:100%;"></div>'),e.draw(a,i,l,"aat-chart-"+a.extId,null)}}return s.resolve()}),s.promise}}});
//# sourceMappingURL=../../maps/analysis/decision_tree.js.map