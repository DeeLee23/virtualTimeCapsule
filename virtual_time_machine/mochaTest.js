var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);
describe('Gets a list of capsules', function () {
	var response;

	before(function (done) {
		chai.request("http://localhost:8080")
			.get("/capsuleList")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Should return an array object with more than 1 object', function () {
		expect(response).to.have.status(200);
		expect(response.body).to.have.length.above(1);
		expect(response).to.have.headers;
	});

	it('The elements in the array should have the expected properties', function () {
        response.body.forEach(function (element) {
            const capsule = element.capsule;

            expect(capsule).to.have.property('name').that.is.a('string');
            expect(capsule).to.have.property('description').that.is.a('string');
            expect(capsule).to.have.property('capsuleID').that.is.a('string');
            expect(capsule).to.have.property('createdDate').that.is.a('string');
            expect(capsule).to.have.property('openDate').that.is.a('string');
            expect(capsule).to.have.property('completed').that.is.a('boolean');
            expect(capsule).to.have.property('owner').that.is.a('string');
            expect(element.files).to.be.an('array');
            
			element.files.forEach(function (file) {
                expect(file).to.have.property('filename').that.is.a('string');
                expect(file).to.have.property('fileId').that.is.a('string');
                expect(file).to.have.property('capsuleId').that.is.a('string');
            });
        });
    });

});


describe('Should return an object', function () {
	var requestResult;
	var response;

	before(function (done) {
		chai.request("http://localhost:8080")
			.get("/capsuleList/2020caa6dbdc500c6ddee41f")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Should return 1 object', function () {
		expect(response).to.have.status(200);
		expect(response).to.be.an('object');
		expect(response).to.have.headers;
	});

	it('The singular capsule and the list of files has the expected properties', function () {
		const capsule = response.body.capsule;
		expect(capsule).to.have.property('name').that.is.a('string');
		expect(capsule).to.have.property('description').that.is.a('string');
		expect(capsule).to.have.property('capsuleID').that.is.a('string');
		expect(capsule).to.have.property('createdDate').that.is.a('string');
		expect(capsule).to.have.property('openDate').that.is.a('string');
		expect(capsule).to.have.property('completed').that.is.a('boolean');
		expect(capsule).to.have.property('owner').that.is.a('string');
		expect(capsule).to.have.property('files').that.is.an('array');
		
		const files = response.body.files;
		expect(files).to.satisfy(function (body) {
			for (var i = 0; i < body.length; i++) {
				const file = body[i];
				expect(file).to.have.property('filename').that.is.a('string');
				expect(file).to.have.property('fileId').that.is.a('string');
				expect(file).to.have.property('capsuleId').that.is.a('string');
			}
			return true;
		});
	});

});