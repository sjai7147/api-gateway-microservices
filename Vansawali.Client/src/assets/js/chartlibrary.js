var Charts=(function(w,d){
    function inheritFrom(child,parent){
        var $cc=child.prototype;
        child.prototype=parent.prototype;
        child.prototype.constructor=$cc;       
        child.$f=$cc;
    }
    function chart(){
        this.nodeId;
        this.midPoint=0;
        this.config=new configuration();
        this.width=0;
        this.height=0;
        this.level;
       // this.nodeDim={x:10,y:10,width:this.config.width,height:this.config.height,position:'absolute'}
        this.nodeDim={x:10,y:10,width:this.config.width};
        svg.call(this);
        this.whw=function(){
            this.height=w.innerHeight;
            this.width=w.innerWidth;
            this.midPoint=this.width/2-this.config.width/2;
        }
        this.setChartMidPoint=function(pt){
            this.midPoint=pt;
        }
        this.initStartPoint=function(totalNodes,level){
            if(level!==this.level){
                this.level=level;
            this.nodeDim.y+=this.config.height+ this.config.VERTICLE_GAP;
            var w=totalNodes*(this.config.width+ this.config.HORIZONTAL_GAP);
            let x=this.midPoint-w/2;
            this.nodeDim.x=x<0?0:x+this.config.width>this.width?x-this.config.width:x;
            }
        }
        this.increaseStartPoint=function(){
            this.nodeDim.x +=this.config.width+ this.config.HORIZONTAL_GAP;
        }
    }
    function manageData(){
        this.topNode;
        this.nodeList=[];
        this.data;       
    }
    inheritFrom(chart,manageData);
    //expose to outside
    chart.prototype.plotGraph=function(){
        this.setSVGProp(this.svgElm,{height:this.height,width:this.width});        
      var outerCtrl= d.querySelector(this.outerElmId);  
      outerCtrl.appendChild(this.svgElm);
      this.nodeList[0]&&this.nodeList[0].elm.setStyle(this.svgElm,this.svgStyle);   
      this.plotNodeByNode(this.nodeList,outerCtrl,0);
    }
    chart.prototype.setDimention=function(destination,source){
        for(var i in source){
            if('x y width height'.indexOf(i)!==-1){
            destination[i=='x'?'left':i=='y'?'top':i]=source[i]+'px';
            if('x y'.indexOf(i)!==-1){
                destination[i]=source[i];
            }
            }
            else{
                destination[i]=source[i];
            }
        }
    }
    chart.prototype.createShapeConnetingPoints=function($node){
        
        if($node.$prnt){
            let $prnt=$node.$prnt;
            let $tmpPoint=[];
           
            let pPoint=this.setLinePoint($prnt.nodeMidPoint,$prnt.dim.y-this.config.verticleLineAdjustment-2);//-this.config.verticleLineAdjustment
            $tmpPoint.push(pPoint);
            let cPoint=this.setLinePoint($node.nodeMidPoint,$node.dim.y-this.config.height-this.config.verticleLineAdjustment);            
            if(this.config.VERTICLE_GAP+10>=cPoint.y-pPoint.y){
                let $gap=this.config.VERTICLE_GAP/2;
                let $secPt=this.setLinePoint(pPoint.x,pPoint.y+$gap);
                $tmpPoint.push($secPt);               
                $tmpPoint.push(this.setLinePoint(cPoint.x,$secPt.y));
             
              
            }else{
                // For this exceptional case we will handle latter.
                // if shape of one lavel is created in another lavel
                let $gap=this.config.VERTICLE_GAP/2;
                $tmpPoint.push(this.setLinePoint(pPoint.x,pPoint.y+$gap));
                $tmpPoint.push(this.setLinePoint(cPoint.x,pPoint.y+$gap));

            }
            $tmpPoint.push(cPoint);
            $node.$prnt.shapeConnectingLines.push($tmpPoint);
        }
       
    }
   
    chart.prototype.plotNodeByNode=function(data,outerCtrl,level){       
        data[0].$prnt&&(this.setChartMidPoint( data[0].$prnt.nodeMidPoint));
            this.initStartPoint(data.length||1,level);           
                for(var i=0;i<data.length;i++){
                    //var tmpPoint=[];
                    var nd=data[i];                   
                    this.setDimention(nd.dim,this.nodeDim);
                    nd.elm.createNodeHtml(nd);
                    nd.nodeMidPoint=parseInt(nd.dim.left)+parseInt(nd.dim.width)/2;
                    
                    outerCtrl.appendChild(nd.elm.htmlCtrl);                  
                    this.createShapeConnetingPoints(nd);
                    this.increaseStartPoint();
                }
                if(data[0].$prnt){
                    this.createPath(data[0].$prnt.shapeConnectingLines);                   
                }
                for(var i=0;i<data.length;i++){
                    if(data[i].children.length>0){
                        this.plotNodeByNode(data[i].children,outerCtrl,level+1)
                    }
                }
            
       
        if(data.children&&data.children.length>0){
            this.plotNodeByNode(data.children,outerCtrl,level+1)
        }
    }
    chart.prototype.setLinePoint=function(x,y){
        var pt=new point();
        pt.setPoint(x,y);
        return pt;
    }
       
    function element(){
        this.htmlCtrl;
        this.createElement=function(elm,prop){
            var helm=d.createElement(elm);
            this.setProperty(helm,prop);
            return helm;
        }       
    }
    element.prototype.createNodeHtml=function(obj){
        var nodeContainer=this.createElement('div',{'class':'node-container'});        
        this.htmlCtrl=nodeContainer;
        var img=this.createElement('img');
        this.setProperty(img,{'src':obj.src});
        nodeContainer.appendChild(img);
        var nodetextP=this.createElement('div',{'class':'node-text-parent'});
        nodeContainer.appendChild(nodetextP);
        for(var p in obj.text){
               var nodetext=this.createElement('span',{'class':'node-text'});
               nodetextP.appendChild(nodetext);
               nodetext.innerHTML=obj.text[p];
        }
        this.setStyle(nodeContainer,obj.dim);
    }
    element.prototype.setStyle=function(elm,styles){
        for(var style in styles){
            if(styles.hasOwnProperty(style))
            elm.style[style]=styles[style];
        }
    }
    element.prototype.setProperty=function(elm,props){
        for(var prop in props){
            if(props.hasOwnProperty(prop))
            elm.setAttribute(prop,props[prop]);
        }
    }
    function configuration(){
        this.VERTICLE_GAP=20;
        this.HORIZONTAL_GAP=20;
        this.width=130;
        this.height=60;      
        this.verticleLineAdjustment=10;
    }
    // inheritFrom(chart,element);
   
    //expose to outside
    manageData.prototype.createData=function(data,controlId){
        this.data=data;
        this.outerElmId= controlId;
        this.setTopNode();
    }
    manageData.prototype.setTopNode=function(){
        var ndata=JSON.stringify(this.data);
        ndata=JSON.parse(ndata);             
        for(var i=0;i<ndata.length;i++){
            this.topNode=ndata[i];
            for(var j=i+1;j<ndata.length;j++){
                var nextNode=ndata[j];
                if(this.topNode.parentId===nextNode.personId){
                    this.topNode;
                    break;
                }
            }
            if(this.topNode){
                break;
            }
        }
        this.createHierarchy();
    }
    manageData.prototype.createHierarchy=function(){
       var node=this.setNode(this.topNode);
       this.nodeList&&this.nodeList.push(node) || ((this.nodeList=[])&&this.nodeList.push(node));
       var ndata=JSON.stringify(this.data);
        this.findAllChildren(node,JSON.parse(ndata));
    }
    manageData.prototype.setNode=function(nodeData){
        var cnode=new node();
        cnode.setNode(nodeData);       
        return cnode;
    }
    
    manageData.prototype.findAllChildren=function(node,data){
        var i=0
        while(data[i]){
            if(node.personId==data[i].personId){
                data.splice(i,1); continue;
            }
            if(node.personId==data[i].parentId){
                var cnode=this.setNode(data[i]);
                node.setChildern(cnode);
                data.splice(i,1);i--;
                
                this.findAllChildren(cnode,data);
            }
            i++;
        }
    }
    function point(){
        this.x=0;
        this.y=0;
        this.setPoint=function(x,y){
            this.x=x;this.y=y;
        }
        this.getPoint=function(){
            return {x:this.x,y:this.y};
        }
    }
    function svg(){
        this.svgOptions={left:0,top:0};//viewBox:"0 0 100 100", 
        this.svgElm;          
        this.createSVGElement=function(svgelm){
            return d.createElementNS("http://www.w3.org/2000/svg",svgelm);
            
        }  
        this.svgStyle={overflow:'hidden',position:'relative'};
        this.setSVGProp=function(svgEle,svgOptions)     {
            for(var option in svgOptions){
                svgEle.setAttribute(option,svgOptions[option]);
            }
        }
        this.svgElm=this.createSVGElement("svg");     
        this.setSVGProp(this.svgElm,this.svgOptions);
        this.createPath=function(parentPoints){
       
            let d;    
            for(let pt=0;pt<parentPoints.length;pt++)   {
                let points=parentPoints[pt];            
                for(let i=0;i<points.length;i++){
                    if(i===0){
                        d=`M${points[i].x} ${points[i].y}`;
                    }else{
                        d +=` L${points[i].x} ${points[i].y}`;
                    }
                }
          
                let props={"stroke-width":1, stroke:"black",fill:"none",d:d};
                let path= this.createSVGElement('path')
                this.setSVGProp(path,props);
                path && this.svgElm.appendChild(path);
            }
        }
        this.createVerticleLine=function(vPoints,hPoints){
            for(let i=0;i<vPoints.length;i++){                
                   this.createPath(vPoints[i]);                
            }

        }
    }
  
      
    function node(){
        this.parentId;
        this.personId;
        this.text={};
        this.children=[];
        this.dim={
            x:0,
            y:0,
            width:0,
            //height:0,
            //position:'absolute'
        };
        this.nodeMidPoint=0;
        this.elm= new element();
        //this.hLIne=new Array();
        //this.connectingPoints=new Array();
        this.shapeConnectingLines=new Array();
        this.parentConnectingPoints=new Array();       
       
    }
    node.prototype.setNode=function(node){
        for(var i in node){
            if(i.toLocaleLowerCase()==='parentid'){
                this.parentId=node[i];
            }else if(i.toLocaleLowerCase()==='personid'){
                this.personId=node[i];
            }else if(i.toLocaleLowerCase()==='imagepath'){
                this.imagePath=node[i];
                this.src=node[i]||'assets/images/shiv-parvati.jpg';
            }else {
                this.text[i]=node[i];
            }
        }
    }
    node.prototype.setChildern=function(child){
        child.$prnt=this;
        this.children[this.children.length]=child;
    }
var chartCtrl=new chart();
w.onresize=chartCtrl.whw.bind(chartCtrl);
w.onload= chartCtrl.whw.bind(chartCtrl);
function createData(data,nodeId){chartCtrl.createData(data,nodeId);}
function plotGraph(){chartCtrl.plotGraph();}
    return{
        createData:createData,
        plotGraph:plotGraph
    }
})(window,document);