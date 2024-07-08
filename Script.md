# Experiment Script

## Prerequisites
- **Permissions** on host OS to install the following software
- **Docker Desktop** (or other container runner) installed and running
- **Nodejs** installed and working







### 1. FHIR Server Container is running

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

### 2. Nodejs installed

https://nodejs.org/en/download/prebuilt-installer/current

### 3. Clone Repository

On the localhost, create a folder for the project

Either download zip or clone from the github repository:

https://github.com/Slartibartfast2000/ejsOnFHIR.git




### 4. web-server running




Start


node 