exports.config = {
  runner: 'local',
  port: 4723,
  specs: ['./test/specs/**/*.js'],
  exclude: [],
  maxInstances: 10,
  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '16',
    'appium:automationName': 'UiAutomator2',
    'appium:app': './app/sauce-labs.2.7.1.apk',
    'appium:appWaitActivity': 'com.swaglabsmobileapp.*',
    'appium:autoGrantPermissions': true,
    'appium:noReset': false,
    'appium:fullReset': true,
    'appium:newCommandTimeout': 30000
  }],
  logLevel: 'info',
  bail: 0,
}