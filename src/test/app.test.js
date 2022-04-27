const app = require('../public/js/app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("Get request to home", () => {
    it("successfully receives 200", () => {
        chai
            .request(app)
            .get("/")
            .then(res => {
                chai.expect(res.status).to.equal(200);
            })
            .catch(err => {
                console.error(err);
            });
    });
    it("wrong district filter entry return 404", () => {
        chai
            .request(app)
            .get("/?district=testing&cuisine=&submit=GO%21")
            .then(res => {
                chai.expect(res.status).to.equal(404);
                chai.expect(res.body).to.be.an("string");
            })
            .catch(err => {
                console.error(err);
            });
    });
    it("wrong cuisine filter entry return 404", () => {
        chai
            .request(app)
            .get("/?district=&cuisine=testing&submit=GO%21")
            .then(res => {
                chai.expect(res.status).to.equal(404);
                chai.expect(res.body).to.be.an("string");
            })
            .catch(err => {
                console.error(err);
            });
    });
});

describe("Get request to favorites", () => {
    it("successfully receives 200", () => {
        chai
            .request(app)
            .get("/list")
            .then(res => {
                chai.expect(res.status).to.equal(200);
            })
            .catch(err => {
                console.error(err);
            });
    });
});

describe("Post request to favorites", () => {
    it("submitting empty form", () => {
        chai
            .request(app)
            .post("/list")
            .then(res => {
                chai.expect(res.status).to.equal(404);
                // chai.expect(res.body).to.be.an("string");
            })
            .catch(err => {
                console.error(err);
            });
    });
    it("adding without name", () => {
        chai
            .request(app)
            .post("/list")
            .send({
                name: '',
                district: 'testing',
                cuisine: 'testing',
                submit: 'ADD',
            })
            .then(res => {
                chai.expect(res.status).to.equal(404);
                // chai.expect(res.body).to.be.an("string");
            })
            .catch(err => {
                console.error(err);
            });
    });
    it("adding without district", () => {
        chai
            .request(app)
            .post("/list")
            .send({
                name: 'testing',
                district: '',
                cuisine: 'testing',
                submit: 'ADD',
            })
            .then(res => {
                chai.expect(res.status).to.equal(404);
                // chai.expect(res.body).to.be.an("string");
            })
            .catch(err => {
                console.error(err);
            });
    });
    it("adding without cuisine", () => {
        chai
            .request(app)
            .post("/list")
            .send({
                name: 'testing',
                district: 'testing',
                cuisine: '',
                submit: 'ADD',
            })
            .then(res => {
                chai.expect(res.status).to.equal(404);
                // chai.expect(res.body).to.be.an("string");
            })
            .catch(err => {
                console.error(err);
            });
    });
    it("deleting nonexistent data", () => {
        chai
            .request(app)
            .post("/list")
            .send({
                delete: 'testing',
                submit: 'DELETE',
            })
            .then(res => {
                chai.expect(res.status).to.equal(404);
                // chai.expect(res.body).to.be.an("string");
            })
            .catch(err => {
                console.error(err);
            });
    });
});

