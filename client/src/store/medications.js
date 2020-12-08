import Cookies from 'js-cookie'
import {addMedicaiton} from './current_patient'

const CREATE_MEDICATION = '/medications/CREATE_MEDICATION'


export const createMedication = (medication) => async (dispatch) => {
    const csrfToken = Cookies.get("XSRF-TOKEN")
    const jsonMed = JSON.stringify(medication)
    const res = await fetch('/api/medications/create',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
        },
        body: jsonMed
    })
    const data = await res.json()
    console.log(data)
    dispatch(makeMedication(data.medication))
    dispatch(addMedication(data.medication))
}

export const makeMedicaiton = (medication) => {
    return {
        type: CREATE_MEDICATION,
        medication
    }
}
