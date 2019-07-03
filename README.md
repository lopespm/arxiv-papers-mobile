# Arxiv Papers

ArXiv Papers is a mobile application to search, download and save arXiv papers. Developed using a react native / redux framework and is currently available for Android smartphone and tablet devices. More details available in the [blog article](https://lopespm.github.io/apps/2018/03/12/arxiv-papers).

[<img src="https://f-droid.org/badge/get-it-on.png"
      alt="Get it on F-Droid"
      height="80">](https://f-droid.org/packages/com.rockbyte.arxiv/)
[<img src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png"
      alt="Get it on Google Play"
      height="80">](https://play.google.com/store/apps/details?id=com.rockbyte.arxiv)

## Screnshots

![arXiv Papers Android App](https://lopespm.github.io/files/arxiv-papers/arxiv_layout_implementation.png)

## Install & Run

After cloning repository, install the app's dependencies by running the following command in the root directory:

    npm install

The application uses Firebase to collect error reports and analytics, so you will need a `google-services.json` to identify the target Firebase project. You can follow [this small guide to do so](https://firebase.google.com/docs/android/setup#manually_add_firebase). After downloading `google-services.json`, copy it into the `android/app/` folder.

Launch the bundler server and run the debug version on an Android device:

    npm run android


## Tests

### Unit and Integration Tests

    npm run test:unitIntegration

### End to End

The [Detox](https://github.com/wix/detox) automation library is used for this purpose.

First build the app and test apks:

    npm run test:e2e:build

You will need to have a bundler server instance running. In case you don't have one already:

    npm start

In a separate terminal window, run the tests:

    npm run test:e2e

Note: You can change the target device/emulator by modifying [`package.json`](package.json). At the moment, a virtual device Nexus 5X (API 27) is used.


## Next steps

 - iOS version: since most of the logic would be common, a good portion of the app could be reused. The layouts and design would have to be revised and it would also need the corresponding native modules, such as file download and management.
 - Justify the summary text on the article's details screen (available on [Android O+](https://developer.android.com/reference/android/widget/TextView.html#setJustificationMode(int)))
 - Add Flow type coverage to epics
 - Math notation rendering
