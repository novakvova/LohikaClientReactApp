
import * as yup from 'yup';

export const AddCategorySchema = yup.object({
    title: yup.string().required('Поле не може бути пустим'),
    priority: yup.string().required('Поле не може бути пустим'),
    urlSlug: yup.string().required('Поле не може бути пустим'),
    image: yup.mixed().required('Поле не може бути пустим'),
})