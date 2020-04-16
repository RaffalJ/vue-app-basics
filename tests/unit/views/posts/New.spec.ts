import { shallowMount } from '@vue/test-utils';
import chai, { expect } from 'chai';
import sinonPackage from 'sinon';
import sinonChai from 'sinon-chai';

import PostsNew from '@/views/posts/New.vue';

// Functions to be mocked
import * as toBase64 from '@/utils/to-base64';
import axios from 'axios';

chai.should();
chai.use(sinonChai);

describe('PostsNew', () => {
  let subject: any;
  let sinon: any;

  beforeEach(function() {
    subject = shallowMount(PostsNew);
    sinon = sinonPackage.createSandbox({}); // clean way to reset mocks after each test
  });

  afterEach(function() {
    sinon.restore();
  });

  it('is correct vue instance', () => {
    expect(subject.isVueInstance()).to.be.true;
  });

  it('sets correct initial values', () => {
    expect(subject.vm.$data.formNewPost).to.deep.equal({
      content: '',
      image: null,
      tags: [],
      tag: ''
    });
    expect(subject.vm.$data.formErrors).to.deep.equal([]);
  });

  describe('handleSubmit', () => {
    before(() => {
      subject.vm.$data.formNewPost = {
        content: 'Post content',
        image: 'image',
        tags: [{ text: 'tag1' }, { text: 'tag2' }],
        tag: ''
      };
    });

    it('successfully handles input and sends data', async () => {
      const toBase64Mock = sinon
        .mock(toBase64)
        .expects('default')
        .returns('imageBase64');
      const axiosPostMock = sinon
        .mock(axios)
        .expects('post')
        .returns(true);

      await subject.vm.handleSubmit();
      expect(toBase64Mock).to.have.been.calledOnce;
      expect(axiosPostMock).to.have.been.calledOnce;
    });

    it('updates form error and returns when wrong file was uploaded', async () => {
      sinon.stub(toBase64).default.throws('Error');

      await subject.vm.handleSubmit();
      expect(subject.vm.$data.formErrors).to.deep.equal([
        'Unable to process an image, allowed file formats are: .png, .jpg'
      ]);
    });

    it('updates form error and returns when response was not successful', async () => {
      const errorResponse = {
        response: {
          data: {
            message: 'Wrong input',
            errors: [
              {
                source: 'Image',
                detail: "Can't be blank",
              },
            ]
          }
        }
      }
      sinon
        .mock(toBase64)
        .expects('default')
        .returns('imageBase64');
      sinon
        .mock(axios)
        .expects('post')
        .throws(errorResponse);

      await subject.vm.handleSubmit();
      expect(subject.vm.$data.formErrors).to.deep.equal([
        "Image can't be blank",
      ]);
    });
  });
});
