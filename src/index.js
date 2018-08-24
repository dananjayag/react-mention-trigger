import React, { Component } from 'react';
import {debounce} from './utility'
import './styles.css';
export class SingleLineMention extends Component {
  constructor(props){
    super(props);
    this.state={
      suggestionList:[],
      currtIndex:0,
      left:0
    }
    this.onChange=this.onChange.bind(this);
    this.appendValue=this.appendValue.bind(this);
    this.keyUpHandle=this.keyUpHandle.bind(this);
    this.onBlur=this.onBlur.bind(this);
    this.call_parent=debounce(this.call_parent.bind(this),props.waitTime || 500)
  }

  componentDidMount(e){
    document.addEventListener('click',(e)=>{
        let container=document.getElementById("suggestion-input");
        if(e.target!==container)
        {
          this.setState({
            suggestionList:[]
          })
        }
    })  
  }
  call_parent(value){
    if(this.props.onChange && typeof(this.props.onChange)=="function"){
      this.props.onChange(value);
    }
  }
  onBlur(e){

  }
  appendValue(value){
    if(this.inputValue.value){
      let index=this.inputValue.value.lastIndexOf('@')
      let newValue=this.inputValue.value.substr(0,index+1)+value;
      if(newValue)
      {
      this.inputValue.value=newValue;
      }
       this.setState({
       suggestionList:[]
    })
    }
    this.inputValue.focus()
  }
  onChange(e){
    
    e.preventDefault();
    this.call_parent(e.target.value);
    let width=this.inputValue && this.inputValue.offsetWidth;
    if(e.target.value)
    {  
        let value=e.target.value;
        let left=(value.length*(this.props.fontSize) > width) ? width-60: value.length*(8-1) ;
        if(value.length>1)
        {
          let index=value.lastIndexOf('@')
          let key=value.substr(index+1)

          let filteredSuggestion=this.props.data.filter((item)=>{
             return item.indexOf(key)!==-1
          })
          this.setState({
              suggestionList:filteredSuggestion,
              currtIndex:0,
              left
          })
        }
        else{
          this.setState({
            suggestionList:[],
            currtIndex:0,
            left
          })
        }
        this.inputValue.focus()
  }
}
  keyUpHandle(e){
    e.preventDefault();
    
   let DOWN=40,UP=38;
    if((e.keyCode==13 || e.target.keyCode==13)){
        let index=this.inputValue.value.lastIndexOf(this.props.trigger || '@');
        let newValue=""
        this.setState({
          suggestionList:[]
         })
        if(this.inputValue.value.length>0 && this.state.suggestionList.length>0)
        {
          newValue= this.inputValue.value.substr(0,index+1)+this.state.suggestionList[this.state.currtIndex || 0];
        }

        if(!!newValue)
        {
         this.inputValue.value=newValue;
      
        }
       
      
     
    }
    else if(e.keyCode==DOWN)
    {
      let newIndex=this.state.currtIndex+1;
      if(newIndex==this.state.suggestionList.length){
        newIndex=this.state.suggestionList.length-1;
      }
      this.setState({
        currtIndex:newIndex
      })
     
    }
    else if(e.keyCode==UP)
    {
      let newIndex=this.state.currtIndex-1;
      if(newIndex<0){
        newIndex=0
      }
      this.setState({
        currtIndex:newIndex
      })
      
      if (typeof this.inputValue.selectionStart == "number") {
        this.inputValue.selectionStart = this.inputValue.selectionEnd = this.inputValue.value.length;
      } else if (typeof this.inputValue.createTextRange != "undefined") {
        this.inputValue.focus();
        let range = this.inputValue.createTextRange();
        range.collapse(false);
        range.select();
      }
    }
     
    
  }

  render() {
    let optionList="";
    let {left}=this.state;
    let parentStyle=(this.props.suggestionsHolder)?this.props.suggestionsHolder:'suggestionsHolder';
   if(this.state.suggestionList) 
   { 
      optionList=this.state.suggestionList.map((item,index)=>{
        return<p className={(index==this.state.currtIndex)?`${(this.props.activeClassname)? this.props.activeClassname:'active'} ${(this.props.suggestionClassName)?this.props.suggestionClassName :'suggestion'}`:`${this.props.suggestionClassName}`} key={index} onClick={()=>{console.log(item);this.appendValue(item)}}>{item}</p>
    })
  }
   
    return (
      <div id="suggestion-input"  style={{display:"inline-block",position:"relative",width:`${this.props.InputWidth || 50}`}}>

              <input class={this.props.inputClassName || ""} id="input" autoFocus={true} onKeyUp={this.keyUpHandle} onBlur={this.onBlur} style={{fontSize:this.props.fontSize || 8,width:(this.props.InputWidth||180)}}   ref={(inpt)=>{this.inputValue=inpt}} onChange={this.onChange} onBlur={this.onBlur} />
               <div id="suggestions" className={parentStyle}  style={{position:'absolute',left:`${left}px`}}>
                { optionList}
               </div>
     
           
      </div>
    );
  }
}
