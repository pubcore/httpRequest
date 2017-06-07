# little XMLHttpRequest wrapper to perform http(s) requests in web browser apps

- only deals with application/json media
- to use in web browser context
- small/simple code base

## Example

    import http from 'pubcore-http'
    import {doSomething, feedback} from './yourCode'

    //POST some data, returns a Promise
    http('https://my.domain.com/chat?locale=en-US', {text:'Hi!'}).then(
        response => doSomething(response),
        error => feedback(error)
    )

    //GET some data, returns a Promise
    http('https://my.domain.com/chat/latest', null, 'GET').then(
        response => doSomething(response),
        error => feedback(error)
    )
