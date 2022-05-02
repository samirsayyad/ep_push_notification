import {describe, it} from 'mocha';
import {expect} from 'chai';

import {sendNotificationToUser} from '../../../../static/js/events/handleNotifications.js';

describe('handleNotifications.js', () => {
  describe('#sendNotificationToUser()', () => {
    it('without arguments', () => {
      expect(sendNotificationToUser()).to.equal(null);
    });
    const param = [
      'demo',
      'a.12',
      'Hi',
      'body',
    ];
    it('with argument', async () => {
      expect(
          await sendNotificationToUser(param)
      ).to.equal(8);
    });
  });
});
