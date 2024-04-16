# ejsOnFHIR Prototype

ejsOnFHIR is a blah blah.

FHIRR4
FHIR Schema File

## create EJS based on xml schema


```bash
node src/go.js -s FHIR/Patient.schema.xml -o myFile.ejs -t partial
```

## FHIR Server for testing

Docker Desktop installed and running

```bash
docker pull hapiproject/hapi:latest
docker run -p 8080:8080 hapiproject/hapi:latest
```

## Node

node dependencies

```bash
npm init -y
npm install express
npm install ejs
npm install jsonpath-plus
```

## Installation

npm installed - latest version -
TODO- how do you do this?

```bash

nvm
```

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

Gone camping! :tent: Be back soon.

That is so funny! :joy:

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

## Prototype Steps

Installed npm xml and dom

```bash
npm install @xmldom/xmldom
```

Added code to traverse the xml

```bash
src/xmlParser2.js
```

Created empty EJS Div template

```bash
src/views/base.ejs
```

## Test Harnesses

```bash
node web-server/webserver.js
```

Browse to

```url
http://localhost:3000/
```

h