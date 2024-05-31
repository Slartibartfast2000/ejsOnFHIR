const Axios = require("axios");

const getPatientList = async (req, res) => {
    console.debug("PatientRoute.js get / with search parameters: ", req.query);

    // Example data, you can replace this with actual data retrieval logic
    const patients = [
        { id: 1, name: 'John Doe', age: 30 },
        { id: 2, name: 'Jane Smith', age: 25 },
    ];

    // Return success response with patient data
    res.status(200).json({
        success: true,
        message: 'Patient list retrieved successfully',
        data: patients
    });
};

module.exports = { getPatientList };


module.exports = {
    getPatientList

  
    //getCaseloadById,
    //deleteCaseloadPatient,
  };
  