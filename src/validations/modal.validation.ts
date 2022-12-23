import * as yup from 'yup'

export const modalSchema = yup.object({
  modalInput: yup.string().required('Please enter something'),
})
