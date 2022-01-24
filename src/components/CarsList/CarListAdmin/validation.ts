
import * as yup from 'yup';

export const AddCarSchema = yup.object({
    name: yup.string().required('Поле не може бути пустим'),
    priority: yup.string().required('Поле не може бути пустим'),
    price: yup.string().required('Поле не може бути пустим'),
    
})