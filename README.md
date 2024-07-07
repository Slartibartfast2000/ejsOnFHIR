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



## Dev-env Browser-sync config

Browser-sync is a useful debug tool for real time reload of web pages.

Install ...
```bash
npm install -g browser-sync
```

For Windows, browser-sync.ps1 should be used... note this will need local Administrator permissions if running powershell.
--files should be set to the root folder of the app
--proxy should be the port node is executing on

!!!note This will be need to be executed from the npm folder unless npm is in the PATH

```js
.\browser-sync.ps1 start --proxy "http://localhost:3000" --files "C:\inchware\repo\uni\ip\ejsOnFHIR"  --no-notify

```

## Get FHIR Server if required

Note this demo has no authentication configured

```js
docker pull hapiproject/hapi:latest
docker run -p 8080:8080 hapiproject/hapi:latest
```

## Create a self signed cert

```powershell
New-SelfSignedCertificate -DnsName "YourDomainName" -CertStoreLocation "cert:\LocalMachine\My"
```

On windows, use mmc -> certificates to export cert as .pfx include private key. Save file to the web-server\cert folder. 
update .env file with cert filename and USE_HTTPS=true.