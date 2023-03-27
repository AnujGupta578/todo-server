var expect = require('chai').expect;
var request = require('request');

// eslint-disable-next-line no-undef
it('Get all tasks', function(done) {
    request('http://localhost:3000/tasks', function(error, response, body) {
        let parsed = JSON.parse(body);
        expect(parsed).to.be.an('object');
        expect(parsed).to.have.a.property('data');
        expect(parsed).to.have.property('data').to.be.an('array');
        done();
    });
});
// eslint-disable-next-line no-undef
it('Get all completed tasks', function(done) {
    request('http://localhost:3000/task/completed', function(error, response, body) {
        let parsed = JSON.parse(body);
        expect(parsed).to.be.an('object');
        expect(parsed).to.have.a.property('data');
        expect(parsed).to.have.property('data').to.be.an('array');
        if (parsed && parsed.data.length > 0) {
            let parsedData = parsed.data;
            expect(parsedData[0]).to.that.includes({ status: "Completed" });
        }
        done();
    });
});
// eslint-disable-next-line no-undef
it('Get all inprogress tasks', function(done) {
    request('http://localhost:3000/task/inprogress', function(error, response, body) {
        let parsed = JSON.parse(body);
        expect(parsed).to.be.an('object');
        expect(parsed).to.have.a.property('data');
        expect(parsed).to.have.property('data').to.be.an('array');
        if (parsed && parsed.data.length > 0) {
            let parsedData = parsed.data;
            expect(parsedData[0]).to.that.includes({ inProgress: true });
        }
        done();
    });
});


let newSaved = {};
// eslint-disable-next-line no-undef
it('Save task', function(done) {
    request.post({
        uri: 'http://localhost:3000/task/save',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "name": "new task 2",
            "description": "New 2 task description",
            "dueDate": "12-10-2020"
        })
    }, function(error, response, body) {
        let parsed = JSON.parse(body);
        newSaved = parsed.data;
        expect(parsed).to.be.an('object');
        expect(parsed).to.have.a.property('data');
        expect(parsed).to.have.property('data').to.be.an('object');
        // eslint-disable-next-line no-undef
        describe('Get task', function() {
            // eslint-disable-next-line no-undef
            it('Get single task: ' + newSaved._id, function(done) {
                request('http://localhost:3000/task/' + newSaved._id, function(error, response, body) {
                    let parsed = JSON.parse(body);
                    expect(parsed).to.be.an('object');
                    expect(parsed).to.have.a.property('data');
                    expect(parsed).to.have.property('data').to.be.an('object');
                    done();
                });
            });
        })
        done();
    });
});