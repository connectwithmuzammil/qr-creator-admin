import * as yup from 'yup';

const youtubeSchema = yup.object().shape({
  qr_name: yup.string(),
  youtube_url: yup
    .string()
    .matches(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/, "Enter a valid YouTube URL")
    .required("YouTube URL is required"),
});

const UrlSchema = yup.object({
  field_url: yup.string()
    .url('Please enter Valida URL format')
    .required('URL is required'),
});

const WifiSchema = yup.object({
  network_name: yup.string()
    .required('Network name is required'),
  network_password: yup.string()
    .required('Network password is required'),
  network_security_type: yup.string()
    .required('Network security type is required'),
});

// const PdfSchema = yup.object({
//   pdf_file: yup.mixed()
//     .required('PDF file is required') // Ensures that the file is required
//     // .test('fileType', 'Only PDF files are allowed', value => {
//     //   return value && value[0] && value[0].type === 'application/pdf'; // Validate PDF type
//     // })
//     .test('fileSize', 'File size should be less than 20MB', value => {
//       return value && value[0] && value[0].size <= 20971520; // Validate file size (20MB)
//     }),
// });
// const PdfSchema = yup.object({
//   pdf_file: yup.mixed()
//     .required('PDF file is required'), // Ensures that the file is required
// });

// const PdfSchema = yup.object().shape({
//   file: yup.mixed()
//     .required('A PDF file is required')
//     .test('fileType', 'Unsupported File Format', value => {
//       return value && value.type === 'application/pdf';
//     })
//     .test('fileSize', 'File Size is too large', value => {
//       return value && value.size <= 20 * 1024 * 1024; // 20MB
//     }),
// });

const videoSchema = yup.object().shape({
  video: yup
    .mixed()
    .required('Video is required')
    .test('fileSize', 'The video is too large, maximum size is 2MB', (value) => {
      return !value || (value.size <= 2048 * 1024); // Validate size only if file exists
    }),
});



export { youtubeSchema, UrlSchema, WifiSchema, videoSchema };