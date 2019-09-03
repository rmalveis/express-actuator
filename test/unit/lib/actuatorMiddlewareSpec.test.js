'use strict';

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const express = require('express');
const infoRoute = require('../../../lib/infoRoute');
const healthRoute = require('../../../lib/healthRoute');
const actuator = require('../../../lib/actuatorMiddleware');

chai.use(require('sinon-chai'));

describe('actuator middleware', function () {
    let router;

    beforeEach(function () {
        router = {
            get: sinon.stub().returnsThis()
        };

        sinon.stub(express, 'Router').returns(router);
    });

    afterEach(function () {
        express.Router.restore();
    });

    it('should create a new router', function () {
        let infoRouter = actuator();

        expect(infoRouter).to.equal(router);
        // expect(express.Router).to.have.been.calledOnce;
    });

    it('should mount the info route on the default endpoint', function () {
        actuator();

        // expect(router.get).to.have.been.calledThrice;
        expect(router.get).to.have.been.calledWithExactly('/info', infoRoute);
    });

    it('should mount the info route on the given endpoint', function () {
        actuator('/foobar');

        expect(router.get).to.have.been.calledThrice;
        expect(router.get).to.have.been.calledWithExactly('/foobar/info', infoRoute);
    });

    it('should mount the health route on the given endpoint when options is set', function () {
        actuator({basePath: "/management"});

        expect(router.get).to.have.been.calledWithExactly('/management/health', healthRoute);
    });

    it('should mount the health route on the given endpoint when options has unknown data', function () {
        actuator({unknownData: "/test"});

        expect(router.get).to.have.been.calledWithExactly('/health', healthRoute);
        // expect(router.get.body)
        // console.log(router.)
    });
});
