const fs = require("fs")
const inquirer = require("inquirer")
const licenses = require("./licenses")

inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of your application'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a brief descirption of your application'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Explain the steps to install your application'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter the steps to use your application'
    },
    {
        type: 'list',
        message: 'Select a license from the list',
        name: 'license',
        choices: ['MIT License', 'Apache License', 'Unlicensed']
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Define your contribution guidelines.'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter the tests for your application.'
    },
    {
        type: 'input',
        name: 'githubName',
        message: 'Enter your github username.'
    },
    {
        type: 'input',
        name: 'emailAddress',
        message: 'Enter your email address.'
    }
]).then((data) => {
    const fileName = 'README.md'
    const license = data.license
    const licenseData = getLicenseData(license)
    const licenseInfo = licenseData.info
    const licenseBadge = licenseData.badge
    const fileData = `# ${data.title} ${licenseBadge}
## Description
${data.description}
## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
## Installation
${data.installation}
## Usage
${data.usage}
## License
${licenseInfo}
## Contributing
${data.contributing}
## Tests
${data.tests}
## Questions
- Github Username: ${data.githubName}.
- Github Profile: https://github.com/${data.githubName}.
- Contact me: To contact me with any additional questions, please write to me by email; ${data.emailAddress}.
Thank you.
`
    

    fs.writeFile(`./output/${fileName}`, fileData, (err) => err ? console.log(err) : console.log('Success!'))
})

function getLicenseData(license) {
    if(license == "MIT License") {
        return {
            info: licenses.MIT,
            badge: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
        }
    } else if (license == "Apache License") {
        return {
            info: licenses.Apache,
            badge: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
        }
    } else {
        return {
            info: licenses.Unlicensed,
            badge: "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)"
        }
    }
}
