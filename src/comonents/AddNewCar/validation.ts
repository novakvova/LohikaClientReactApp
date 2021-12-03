
import * as yup from 'yup';

export const AddCarSchema = yup.object({
    name: yup.string().required('Поле не може бути пустим'),
    priority: yup.number().required('Поле не може бути пустим'),
    price: yup.number().required('Поле не може бути пустим'),
    image: yup.string().required('Поле не може бути пустим'),
})