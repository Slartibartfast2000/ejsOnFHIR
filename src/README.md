# PartialGenerator

Generate id element

Command line parameters:

-s = Schema path - should always be fhir-single.xsd
-t = Resource type - Patient, Encounter etc
-o = Output filename
-i = Include html header and body tags y/n - default n
-f = html form name - if not included omit form name

```js
./partialgenerator -s ./FHIR/fhir-single.xsd -t Patient -o patient.ejs 
```
