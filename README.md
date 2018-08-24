# react-mention-trigger

> it triggers suggestions when user enters " @
" user can chose one of the suggestion and also it allow user to search space separated key
[![NPM](https://img.shields.io/npm/v/react-mention-trigger.svg)](https://www.npmjs.com/package/react-mention-trigger) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-mention-trigger
```

## Usage

```jsx
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


```

## License

MIT © [dananjayag](https://github.com/dananjayag)
