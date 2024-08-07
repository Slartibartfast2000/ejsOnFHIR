# EJSOnFHIR Prototype

This repository contains 2 projects that combines Embedded JavaScript (EJS), and FHIR data model to create HTML Forms:

**partialGenerator** - a nodejs command line application that creates EJS partials based on FHIR R4 standard

**web-server** - is a simple test harness to demonstrate the use of the generated partial

## EJS Partial Generator

The **partialGenerator** is a simple node script that takes the FHIR xml schema and outputs HTML Forms that can be used in web applications.

Example execution from a terminal:

```bash
cd partialGenerator
npm install
node ./partialGenerator -s ./FHIR/fhir-single.xsd -t AllergyIntolerance -o ../web-server/views/dynamicPartials/AllergyIntolerance.ejs
```

parameters:
s = location of the fhir schema - this will probably be static
t = the name of the FHIR resource that will be used as the basis for the partial
o = the output file. the location provided above will mean the partial is generated in the test harness web-server

## Web-server

The web-server is a simple nodejs express application. To start the web-server simply (see docker and fhir server below before proceeding, also reference Script.md):

```bash
cd web-server
npm install
npm run debug
```

!!! Note
    The web-server application will expect a FHIR server to be configured and available. See docker container below.

### FHIR Server Container set up

1.1 Open a command prompt or terminal

1.2 Get the hapi FHIR server release container

```bash
    docker pull hapiproject/hapi:latest
```

1.3 Run the container

```bash
    docker run -p 8080:8080 hapiproject/hapi:latest
```

1.4 Test the fhir endpoint

Simply browse to the default FHIR url http://127.0.0.1:8080 



# Troubleshooting

## Docker toubleshooting commands

List running containers
```bash
docker ps
```
Stop a container

```bash
docker stop <container id>
```




## Dev notes only:
### Dev-env Browser-sync config

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