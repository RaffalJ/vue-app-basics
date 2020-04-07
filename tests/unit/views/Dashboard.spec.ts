import { expect } from 'chai';
import { mount } from '@vue/test-utils';

import Dashboard from '@/views/Dashboard.vue';

describe('Dashboard', () => {
  const subject = mount(Dashboard);

  it('renders correctly', () => {
    expect(subject.isVueInstance()).to.be.true;
  });
});
