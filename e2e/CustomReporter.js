const fs = require('fs');
const stripAnsi = require('strip-ansi');

class CustomReporter {
  data = {};

  constructor({ detox }) {
    this.detox = detox;
  }

  writeOutput() {
    fs.writeFile('./detox_output.txt', this.data);
  }

  run_describe_start(event) {
    if (event.describeBlock.parent !== undefined) {
      // this.allure.startSuite(event.describeBlock.name);
      this.data[event.describeBlock.name] = {
        name: event.describeBlock.name,
        isDone: false,
      };
    }
  }

  run_describe_finish(event) {
    if (event.describeBlock.parent !== undefined) {
      // this.allure.endSuite();
      this.data[event.describeBlock.name] = {
        isDone: true,
      };
    }
  }

  test_start(event) {
    const { test } = event;
    this.data[event.describeBlock.name] = {
      test: test,
    };
    // this.allure.startCase(test.name)
  }

  async test_done(event) {
    if (event.test.errors.length > 0) {
      const { test } = event;

      const screenshotPath = await this.detox.device.takeScreenshot(
        `${test.startedAt}-failed`
      );
      const buffer = fs.readFileSync(`${screenshotPath}`);
      // this.allure.addAttachment('Screenshot test failue', Buffer.from(buffer, 'base64'), 'image/png');

      const err = test.errors[0][0];
      err.message = stripAnsi(err.message);
      err.stack = stripAnsi(err.stack);
      this.data[event.describeBlock.name] = {
        attachment: Buffer.from(buffer, 'base64'),
        error: err,
        passed: false,
      };
      // this.allure.endCase('failed', err);
    } else {
      this.data[event.describeBlock.name] = {
        passed: true,
      };
      // this.allure.endCase('passed')
    }
    this.writeOutput();
  }

  test_skip(event) {
    const { test } = event;
    this.data[test.name] = {
      skipped: true,
    };
    // this.allure.startCase(test.name);
    // this.allure.pendingCase(test.name);
  }
}

module.exports = CustomReporter;
