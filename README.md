# Open Data Policy Wizard

Our Open Data Policy Wizard is a Google Form that asks a user a few basic questions and then emails them a sample open-data policy. See the form for more details: https://docs.google.com/forms/d/e/1FAIpQLSe2BeXHF-vkjbfmYRK0dIxYtWyaXUCkgG0a6twAIqRdwJM8dg/viewform

Please note that this repository does _not_ contain live code that runs the form. Instead, this is only a copy of the code hosted by Google. As such, this repository may not be up to date with the latest version of the script running with the form.

`Text.html` contains the HTML template for the policy. The user inputs are used to fill in variable fields, with the resulting policy sent to the user via email and placed in a new Google Doc. (The email contains a link to the Google Doc.)

`Code.gs` contains the script that runs when a new form response is received. It's written in [Google Apps Script](https://developers.google.com/apps-script/), which is Google's version of JavaScript. The script has comments explaining what each part does.

When the form is submitted, the `runWizard(e)` function runs, using the form-submission event as input. This is set up on the Script Editor interface by going to _Resources > Current project's triggers_ and then adding this trigger: _runWizard From form On form submit_. (I also suggest clicking on _notifications_ and setting up immediate email notifications for script failures.)

Note that a small portion of the code requires making use of the [Google Drive API](https://developers.google.com/drive/) for JavaScript. In order for this to work, you must go to _Resources > Advanced Google services..._ and enable _Drive API v2_. Using the link provided, you'll also need to enable it in the Google API Console.
