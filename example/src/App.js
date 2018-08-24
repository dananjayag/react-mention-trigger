import React, { Component } from 'react'

import {SingleLineMention} from 'react-mention-trigger'

export default class App extends Component {
  constructor(){
        super()
       this.state={ 
           data:["an t b","asda","a","abbn"]
       }
    }
    onChange(value){
        console.log("parent on Change",value)
    }
    render(){
        return(
            <div style={{textAlign:"center",margin:30}}>
                <SingleLineMention 
                       inputClassName={"input-red"} 
                       suggestionClassName={"suggestion"} 
                       activeClassname={"active"}
                       suggestionsHolder={"suggestionsHolder"}
                       data={this.state.data}
                       fontSize={18} 
                       InputWidth={580}
                       onChange={this.onChange} 
                       waitTime={10000}/>
            </div>
        )
    }

  
  }

