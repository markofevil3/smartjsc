function Haml(){}String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};Haml.compile=function(){var b=arguments;var f=[];for(var d=0;d<b.length;d++){var a=b[d];var e=Haml.getIndentLevel(a);var c=Haml.compileLine(a);f.push([e,c])}return Haml.format(Haml.buildText(f))};var IndentLevel=0;var CompiledLine=1;Haml.buildText=function(b){var e=[];var h=b[b.length-1][IndentLevel];var g="";for(var d=b.length-1;d>=0;--d){var a=b[d];var f=a[IndentLevel];var c=a[CompiledLine];if(f<h){c.splice(2,0,g);g=c.join("");if(e[f]){g+=e[f];e[f]=null}}else{if(f==h){g=c.join("")+g}else{e[h]=g;g=c.join("")}}h=f}return g};Haml.getIndentLevel=function(a){for(var b=0;b<a.length;b++){if(a[b]!=" "){return b}}};Haml.compileLine=function(b){if(b.trim()[0]=="|"){return[b.trim().substr(1).trim()]}else{var e=b.split("(");if(e.length==1){e=b.trim().split(" ");var a=e.shift();var f=e.join(" ").trim();return["<"+a+">",f,"</"+a+">"]}else{var a=e[0].trim();b=e[1];e=b.split(")");var d=e[0];var c=d.split(",").join(" ");b=e[1];var f=b.trim();return["<"+a+" "+c+">",f,"</"+a+">"]}}};Haml.format=function(f){var e=f.split("#{");var c=[];c.push(e[0]);for(var d=1;d<e.length;d++){var b=e[d];var a=b.split("}");c.push(new Token(a[0].trim()));c.push(a[1])}return function(g){g=g||{};var k="";for(var h in c){if(c[h].constructor==Token){var j=g[c[h].name];if(j){k+=j}}else{k+=c[h]}}return k}};function Token(a){this.name=a};