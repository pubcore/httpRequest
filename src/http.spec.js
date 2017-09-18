import {expect} from 'chai'
import http from './http'
import FakeXMLHTTPRequests from 'fakexmlhttprequest'

var requests = []
global.XMLHttpRequest = function() {
    var r =  new FakeXMLHTTPRequests(arguments)
    requests.push(r)
    return r
}

describe('httpRequest ' + new Date(), () => {
    var response = {status:'ok'}

    afterEach(() => {
        requests = []
    })

    it('is available', () => {
        expect(http).not.to.be.null
    })

    it('returns object', (done) => {
        http('https://localhost', {}).then(
            value => {
                expect(value).to.deep.equal(response)
                done()
            }
        ).catch(err => done(err))
        requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify(response)
        )
    })

    it('handle http errors', done => {
        http('', {}).then(
            value => {
                expect(true).to.be.false
                done()
            },
            (err) => {
                expect(err).to.be.a("Error")
				expect(err.status).to.be.a("Number")
				expect(err.status).to.be.equal(404)
				expect(err.body).to.be.a("String")
                done()
            }
        ).catch(err => done(err))

        requests[0].respond(
            404,
            { "Content-Type": "application/json" },
            ''
        )
    })
})
